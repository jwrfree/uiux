"use client";

import { useEffect, useState, useRef } from "react";
import { 
  CHANNEL, 
  VISUAL_EDIT_MODE_KEY, 
  FOCUSED_ELEMENT_KEY, 
  Box 
} from './types';
import { 
  postMessageDedup, 
  isTextEditable, 
  extractDirectTextContent, 
  parseOrchidsId, 
  wrapMultiline, 
  normalizeImageSrc, 
  expandBox 
} from './utils';
import { getCurrentStyles } from './styles';
import { useVisualEditMode } from './hooks';
import { useResizeHandlers } from './resize';

export default function HoverReceiver() {
  const [hoverBox, setHoverBox] = useState<Box>(null);
  const [hoverBoxes, setHoverBoxes] = useState<Box[]>([]);
  const [focusBox, setFocusBox] = useState<Box>(null);
  const [focusedElementId, setFocusedElementId] = useState<string | null>(null);
  const [isVisualEditMode, setIsVisualEditMode] = useState(() => {
    // Initialize from localStorage if available
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(VISUAL_EDIT_MODE_KEY);
      return stored === "true";
    }
    return false;
  });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [resizeStart, setResizeStart] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Tag labels for hover and focus overlays
  const [hoverTag, setHoverTag] = useState<string | null>(null);
  const [focusTag, setFocusTag] = useState<string | null>(null);
  
  // Refs
  const isResizingRef = useRef(false);
  const lastHitElementRef = useRef<HTMLElement | null>(null);
  const lastHitIdRef = useRef<string | null>(null);
  const focusedElementRef = useRef<HTMLElement | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  const originalContentRef = useRef<string>("");
  const originalSrcRef = useRef<string>(""); // track original img src
  const focusedImageElementRef = useRef<HTMLImageElement | null>(null); // track the actual img element
  const editingElementRef = useRef<HTMLElement | null>(null);
  const wasEditableRef = useRef<boolean>(false);
  const styleElementRef = useRef<HTMLStyleElement | null>(null);
  const originalStylesRef = useRef<Record<string, string>>({});
  const appliedStylesRef = useRef<Map<string, Record<string, string>>>(
    new Map()
  );
  const hasStyleChangesRef = useRef<boolean>(false);
  const lastClickTimeRef = useRef<number>(0);
  const pendingCleanupRef = useRef<NodeJS.Timeout | null>(null);

  // Cache of loaded fonts
  const loadedFontFamilies = useRef<Set<string>>(new Set());
  // Map of elementId that already has a persistent font set
  const persistentFontMap = useRef<Map<string, string>>(new Map());
  // Timeout refs for clearing persistent font map
  const persistentFontTimeouts = useRef<Map<string, number>>(new Map());

  // Helper to update focus box position
  const updateFocusBox = () => {
    if (focusedElementRef.current) {
      const r = focusedElementRef.current.getBoundingClientRect();
      setFocusBox(expandBox(r));
    }
  };

  // Use the custom hooks
  const { isVisualEditModeRef } = useVisualEditMode(isVisualEditMode, setIsVisualEditMode);

  // Use resize handlers
  const { handleResizeStart } = useResizeHandlers(
    isResizing,
    setIsResizing,
    resizeHandle,
    resizeStart,
    setResizeStart,
    setResizeHandle,
    focusedElementRef,
    focusedElementId,
    updateFocusBox,
    setHoverBox,
    setHoverBoxes,
    lastHitElementRef
  );

  // Add global styles for contentEditable elements
  useEffect(() => {
    if (isVisualEditMode && !styleElementRef.current) {
      const style = document.createElement("style");
      style.textContent = `
        [contenteditable="true"]:focus {
          outline: none !important;
          box-shadow: none !important;
          border-color: inherit !important;
        }
        [contenteditable="true"] {
          cursor: text !important;
        }
        /* Prevent the default blue highlight on contenteditable */
        [contenteditable="true"]::selection {
          background-color: rgba(59, 130, 246, 0.3);
        }
        [contenteditable="true"]::-moz-selection {
          background-color: rgba(59, 130, 246, 0.3);
        }
        /* Prevent child elements from being editable */
        [contenteditable="true"] [contenteditable="false"] {
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          opacity: 0.7 !important;
          cursor: default !important;
        }
        /* Ensure protected elements can't be selected */
        [data-orchids-protected="true"] {
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
        }
      `;
      document.head.appendChild(style);
      styleElementRef.current = style;
    } else if (!isVisualEditMode && styleElementRef.current) {
      styleElementRef.current.remove();
      styleElementRef.current = null;
    }

    return () => {
      if (styleElementRef.current) {
        styleElementRef.current.remove();
        styleElementRef.current = null;
      }
    };
  }, [isVisualEditMode]);

  // Helper to make only text nodes editable and protect child elements
  const protectChildElements = (element: HTMLElement) => {
    // Make all child elements non-editable
    const childElements = element.querySelectorAll("*");
    childElements.forEach((child) => {
      const childEl = child as HTMLElement;
      childEl.contentEditable = "false";
      // Add a data attribute to mark protected elements
      childEl.setAttribute("data-orchids-protected", "true");
      // Only prevent text selection within the child elements when parent is being edited
      // But still allow pointer events for hovering and clicking
      childEl.style.userSelect = "none";
      childEl.style.webkitUserSelect = "none";
      // Don't set pointerEvents to none - we want to allow hover and click
    });
  };

  // Helper to restore child elements after editing
  const restoreChildElements = (element: HTMLElement) => {
    const protectedElements = element.querySelectorAll(
      '[data-orchids-protected="true"]'
    );
    protectedElements.forEach((child) => {
      const childEl = child as HTMLElement;
      childEl.removeAttribute("contenteditable");
      childEl.removeAttribute("data-orchids-protected");
      // Restore original styles
      childEl.style.userSelect = "";
      childEl.style.webkitUserSelect = "";
    });
  };

  // Handle text changes and send to parent
  const handleTextChange = (element: HTMLElement) => {
    // Double-check this is still the editing element to avoid stale closures
    if (element !== editingElementRef.current) {
      console.warn("Attempting to handle text change for non-editing element");
      return;
    }

    // Get the orchids ID from the element to ensure we're working with the right one
    const orchidsId = element.getAttribute("data-orchids-id");
    if (!orchidsId) return;

    // For elements with children, only extract direct text content
    let newText: string;
    let oldText: string;

    if (element.childElementCount > 0) {
      // Element has children - only track direct text nodes
      newText = extractDirectTextContent(element);
      // We need to compare against the original direct text content
      // Since originalContentRef stores the full text, we need to handle this differently
      oldText = originalContentRef.current;
    } else {
      // No children - use innerText to preserve line breaks
      newText = element.innerText || element.textContent || "";
      oldText = originalContentRef.current;
    }

    if (newText !== oldText) {
      const parsed = parseOrchidsId(orchidsId);
      if (!parsed) return;

      // Send text change message to parent
      const msg = {
        type: CHANNEL,
        msg: "TEXT_CHANGED",
        id: orchidsId,
        oldText: wrapMultiline(oldText),
        newText: wrapMultiline(newText),
        filePath: parsed.filePath,
        line: parsed.line,
        column: parsed.column,
      };

      postMessageDedup(msg);

      // Update the original content reference
      originalContentRef.current = newText;
    }
  };

  // Handle style changes and send to parent
  const handleStyleChange = (
    element: HTMLElement,
    styles: Record<string, string>
  ) => {
    const orchidsId = element.getAttribute("data-orchids-id");
    if (!orchidsId) return;

    const parsed = parseOrchidsId(orchidsId);
    if (!parsed) return;

    // Find ALL elements with the same orchids ID
    const allMatchingElements = document.querySelectorAll(
      `[data-orchids-id="${orchidsId}"]`
    ) as NodeListOf<HTMLElement>;

    // Apply styles to ALL matching elements for visual feedback
    allMatchingElements.forEach((el) => {
      Object.entries(styles).forEach(([property, value]) => {
        // Convert camelCase to kebab-case for CSS property names
        const cssProp = property.replace(/([A-Z])/g, "-$1").toLowerCase();

        // Handle special cases for default values
        let finalValue = value;

        // If backgroundColor is being set to transparent, use transparent keyword
        if (
          property === "backgroundColor" &&
          (value === "transparent" ||
            value === "rgba(0, 0, 0, 0)" ||
            value === "rgb(0, 0, 0, 0)")
        ) {
          finalValue = "transparent";
        }

        // If removing styles (setting to default), remove the property
        if (
          (property === "backgroundColor" && finalValue === "transparent") ||
          (property === "backgroundImage" && value === "none") ||
          (property === "textDecoration" && value === "none") ||
          (property === "fontStyle" && value === "normal") ||
          (property === "opacity" && value === "1") ||
          ((property.includes("padding") || property.includes("margin")) &&
            value === "0") ||
          (property === "borderRadius" && value === "0") ||
          (property === "letterSpacing" && value === "normal") ||
          (property === "gap" && value === "normal")
        ) {
          // Remove the property to let the stylesheet value show through
          el.style.removeProperty(cssProp);
        } else {
          // Apply with !important so it overrides existing rules
          el.style.setProperty(cssProp, finalValue, "important");
        }
      });
    });

    // Store the applied styles
    const existingStyles = appliedStylesRef.current.get(orchidsId) || {};
    appliedStylesRef.current.set(orchidsId, { ...existingStyles, ...styles });
    hasStyleChangesRef.current = true;

    // Update the focus box after style change
    requestAnimationFrame(() => {
      updateFocusBox();
    });

    // Don't send to parent yet - wait for blur
  };

  // Send style changes on blur
  const handleStyleBlur = (element: HTMLElement) => {
    if (!hasStyleChangesRef.current) return;

    const orchidsId = element.getAttribute("data-orchids-id");
    if (!orchidsId) return;

    const parsed = parseOrchidsId(orchidsId);
    if (!parsed) return;

    const appliedStyles = appliedStylesRef.current.get(orchidsId);
    if (!appliedStyles || Object.keys(appliedStyles).length === 0) return;

    // Get className for breakpoint detection
    const className = element.getAttribute("class") || "";

    // Send style blur message to parent for Tailwind conversion
    const msg = {
      type: CHANNEL,
      msg: "STYLE_BLUR",
      id: orchidsId,
      styles: appliedStyles,
      className,
      filePath: parsed.filePath,
      line: parsed.line,
      column: parsed.column,
    };

    postMessageDedup(msg);

    // Reset style changes flag
    hasStyleChangesRef.current = false;
  };

  // Flush image src updates on blur/focus change
  const flushImageSrcChange = () => {
    // Use the stored image element reference if available
    const imgElement = focusedImageElementRef.current;
    if (!imgElement) return;

    const orchidsId = imgElement.getAttribute("data-orchids-id");
    if (!orchidsId) return;

    const parsed = parseOrchidsId(orchidsId);
    if (!parsed) return;

    const newSrc = normalizeImageSrc(imgElement.src);
    const oldSrc = normalizeImageSrc(originalSrcRef.current);

    if (!newSrc || newSrc === oldSrc) return; // nothing changed

    const msg = {
      type: CHANNEL,
      msg: "IMAGE_BLUR",
      id: orchidsId,
      oldSrc,
      newSrc,
      filePath: parsed.filePath,
      line: parsed.line,
      column: parsed.column,
    };

    postMessageDedup(msg);

    originalSrcRef.current = newSrc; // reset baseline
    focusedImageElementRef.current = null; // clear reference
  };

  // Cleanup function to restore element state
  const cleanupEditingElement = () => {
    if (editingElementRef.current) {
      const element = editingElementRef.current;

      // Immediately clear the ref to prevent any further operations
      editingElementRef.current = null;

      // Flush pending style edits first for the same reason described above
      handleStyleBlur(element);

      // Now process text changes
      handleTextChange(element);

      // Restore child elements if they were protected
      if (element.childElementCount > 0) {
        restoreChildElements(element);
      }

      // Only set contentEditable to false if we made it true
      if (!wasEditableRef.current) {
        element.contentEditable = "false";
      }

      // Don't restore original styles - keep the applied styles
      // Remove the outline suppression styles only
      const currentStyle = element.getAttribute("style") || "";
      const cleanedStyle = currentStyle
        .replace(/outline:\s*none\s*!important;?/gi, "")
        .replace(/box-shadow:\s*none\s*!important;?/gi, "")
        .trim()
        .replace(/;\s*;/g, ";")
        .replace(/^;|;$/g, "");

      if (cleanedStyle) {
        element.setAttribute("style", cleanedStyle);
      } else {
        element.removeAttribute("style");
      }

      element.blur();

      // Remove event handlers
      const handlers = (element as any)._editHandlers;
      if (handlers) {
        element.removeEventListener("focus", handlers.focus);
        element.removeEventListener("blur", handlers.blur);
        element.removeEventListener("input", handlers.input);
        delete (element as any)._editHandlers;
      }

      wasEditableRef.current = false;
      // Clear the original content reference
      originalContentRef.current = "";
    }
  };

  // Prevent all navigation in visual edit mode
  useEffect(() => {
    if (!isVisualEditMode) return;

    // Prevent link clicks
    const preventLinkClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (link && !link.isContentEditable) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Prevent form submissions
    const preventFormSubmit = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Add listeners in capture phase to catch events early
    document.addEventListener("click", preventLinkClick, true);
    document.addEventListener("submit", preventFormSubmit, true);

    return () => {
      document.removeEventListener("click", preventLinkClick, true);
      document.removeEventListener("submit", preventFormSubmit, true);
    };
  }, [isVisualEditMode]);

  // Clean up when exiting visual edit mode
  useEffect(() => {
    if (!isVisualEditMode) {
      cleanupEditingElement();
      // Clear applied styles tracking
      appliedStylesRef.current.clear();
      hasStyleChangesRef.current = false;

      // Clear image element reference
      focusedImageElementRef.current = null;
    }
  }, [isVisualEditMode]);

  // Update focus box position when scrolling or resizing
  useEffect(() => {
    if (focusedElementRef.current) {
      const handleUpdate = () => {
        updateFocusBox();

        if (focusedElementRef.current && focusedElementId) {
          const fr = focusedElementRef.current.getBoundingClientRect();
          const fBox = expandBox(fr);
          if (fBox) {
            const focMsg = {
              type: CHANNEL,
              msg: "FOCUS_MOVED",
              id: focusedElementId,
              rect: {
                top: fBox.top,
                left: fBox.left,
                width: fBox.width,
                height: fBox.height,
              },
            };
            postMessageDedup(focMsg);
          }
        }
      };

      window.addEventListener("scroll", handleUpdate, true);
      window.addEventListener("resize", handleUpdate);

      // Also observe the focused element for size changes
      const resizeObserver = new ResizeObserver(handleUpdate);
      resizeObserver.observe(focusedElementRef.current);

      return () => {
        window.removeEventListener("scroll", handleUpdate, true);
        window.removeEventListener("resize", handleUpdate);
        resizeObserver.disconnect();
      };
    }
  }, [focusedElementId]);

  // Handle pointer movement directly in the iframe
  useEffect(() => {
    // Handle pointer movement directly in the iframe
    function onPointerMove(e: PointerEvent) {
      if (isResizingRef.current) {
        return;
      }
      // Only track pointer when visual edit mode is active
      if (!isVisualEditModeRef.current) return;

      // Don't show hover boxes while scrolling
      if (isScrolling) return;

      // Hit-testing at pointer position
      const hit =
        document
          .elementFromPoint(e.clientX, e.clientY)
          ?.closest<HTMLElement>("[data-orchids-id]") ?? null;

      if (hit !== lastHitElementRef.current) {
        lastHitElementRef.current = hit;

        if (!hit) {
          setHoverBox(null);
          setHoverBoxes([]);
          setHoverTag(null);
          lastHitIdRef.current = null;
          // If we were previously focused on an image, ensure its src is flushed
          flushImageSrcChange();

          const msg = {
            type: CHANNEL,
            msg: "HIT",
            id: null,
            tag: null,
            rect: null,
          };
          postMessageDedup(msg);
          return;
        }

        // Don't show hover box if this is the focused element
        const hitId = hit.getAttribute("data-orchids-id");

        // Check if we're already showing boxes for this ID
        if (hitId === lastHitIdRef.current) {
          return;
        }

        lastHitIdRef.current = hitId;

        const tagName =
          hit.getAttribute("data-orchids-name") || hit.tagName.toLowerCase();

        // Update hover boxes immediately for instant feedback
        // Find ALL elements with the same orchids ID
        const allMatchingElements = document.querySelectorAll(
          `[data-orchids-id="${hitId}"]`
        ) as NodeListOf<HTMLElement>;

        // Create hover boxes for all matching elements except the focused one
        const boxes: Box[] = [];
        allMatchingElements.forEach((element) => {
          // Skip if this element is the focused one
          const elementId = element.getAttribute("data-orchids-id");
          if (elementId === focusedElementId) {
            return;
          }

          const rect = element.getBoundingClientRect();
          boxes.push(expandBox(rect));
        });

        // Set multiple hover boxes
        setHoverBoxes(boxes);

        // Set single hover box for the primary element (for compatibility)
        // Only set if it's not the focused element
        if (hitId !== focusedElementId) {
          const r = hit.getBoundingClientRect();
          const expandedBox = expandBox(r);
          setHoverBox(expandedBox);
        } else {
          setHoverBox(null);
        }

        setHoverTag(tagName);

        const msg = {
          type: CHANNEL,
          msg: "HIT",
          id: hitId,
          tag: tagName,
          rect:
            hitId !== focusedElementId
              ? expandBox(hit.getBoundingClientRect())
              : null,
        };
        postMessageDedup(msg);
      }
    }

    // Handle pointer leaving the document
    function onPointerLeave() {
      if (!isVisualEditModeRef.current) return;

      if (isResizingRef.current) return;

      setHoverBox(null);
      setHoverBoxes([]);
      setHoverTag(null);

      // Flush image src change when cursor leaves iframe altogether
      flushImageSrcChange();

      lastHitElementRef.current = null;
      lastHitIdRef.current = null;
      const msg = {
        type: CHANNEL,
        msg: "HIT",
        id: null,
        tag: null,
        rect: null,
      };
      postMessageDedup(msg);
    }

    // Handle mousedown to prepare element for editing
    function onMouseDownCapture(e: MouseEvent) {
      if (isResizingRef.current) return;
      // Only handle if visual edit mode is active
      if (!isVisualEditModeRef.current) return;

      const hit = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-orchids-id]"
      );

      if (hit && isTextEditable(hit)) {
        // Store whether it was already editable
        wasEditableRef.current = hit.contentEditable === "true";

        // Make element editable BEFORE the click goes through
        if (!wasEditableRef.current) {
          // Apply inline styles to remove focus ring
          const currentStyle = hit.getAttribute("style") || "";
          hit.setAttribute(
            "style",
            `${currentStyle}; outline: none !important; box-shadow: none !important;`
          );

          hit.contentEditable = "true";

          // If the element has children, protect them from being edited
          if (hit.childElementCount > 0) {
            protectChildElements(hit);
          }
        }
      }
    }

    // Handle clicks to focus elements
    function onClickCapture(e: MouseEvent) {
      if (isResizingRef.current) return;
      // Only handle if visual edit mode is active
      if (!isVisualEditModeRef.current) return;

      // Debounce rapid clicks
      const now = Date.now();
      if (now - lastClickTimeRef.current < 100) {
        return; // Ignore clicks within 100ms of each other
      }
      lastClickTimeRef.current = now;

      const target = e.target as HTMLElement;
      const hit = target.closest<HTMLElement>("[data-orchids-id]");

      if (hit) {
        const tagName =
          hit.getAttribute("data-orchids-name") || hit.tagName.toLowerCase();

        const hitId = hit.getAttribute("data-orchids-id");
        const isEditable = isTextEditable(hit);

        // Always prevent default for non-text interactions
        const isLink = hit.tagName.toLowerCase() === "a" || !!hit.closest("a");
        const isButton =
          hit.tagName.toLowerCase() === "button" ||
          hit.getAttribute("role") === "button";

        // Prevent navigation and button actions
        if (isLink || isButton || !isEditable) {
          e.preventDefault();
          e.stopPropagation();
        }

        // Capture previously focused element before updating
        const prevFocused = focusedElementRef.current;

        // Update focused element
        focusedElementRef.current = hit;
        setFocusedElementId(hitId);
        setFocusTag(tagName);

        // Save focused element info to localStorage
        if (hitId && typeof window !== "undefined") {
          const focusedElementData = {
            id: hitId,
            tag: tagName,
          };
          localStorage.setItem(
            FOCUSED_ELEMENT_KEY,
            JSON.stringify(focusedElementData)
          );
        }

        // Find ALL other elements with the same orchids ID and show hover boxes
        const allMatchingElements = document.querySelectorAll(
          `[data-orchids-id="${hitId}"]`
        ) as NodeListOf<HTMLElement>;

        // Create hover boxes for all matching elements except the focused one
        const boxes: Box[] = [];
        allMatchingElements.forEach((element) => {
          // Skip the focused element itself
          if (element === hit) {
            return;
          }

          const rect = element.getBoundingClientRect();
          boxes.push(expandBox(rect));
        });

        // Set hover boxes for other matching elements
        setHoverBoxes(boxes);
        // Set the hover tag to show on other elements
        if (boxes.length > 0) {
          setHoverTag(tagName);
        }

        // Track image element specifically
        if (hit.tagName.toLowerCase() === "img") {
          focusedImageElementRef.current = hit as HTMLImageElement;
        } else {
          focusedImageElementRef.current = null;
        }

        // Store original styles for the focused element
        originalStylesRef.current = getCurrentStyles(hit);

        // If this is an editable element, set it up
        if (isEditable) {
          // Cancel any pending cleanup
          if (pendingCleanupRef.current) {
            clearTimeout(pendingCleanupRef.current);
            pendingCleanupRef.current = null;
          }

          // Clean up any previous editing element first
          if (editingElementRef.current && editingElementRef.current !== hit) {
            // Force blur on the previous element to trigger handlers
            editingElementRef.current.blur();
            cleanupEditingElement();
          }

          // Only set up if this is a new element
          if (hit !== editingElementRef.current) {
            editingElementRef.current = hit;
            // Store original content - for elements with children, only store direct text
            if (hit.childElementCount > 0) {
              originalContentRef.current = extractDirectTextContent(hit);
            } else {
              originalContentRef.current =
                hit.innerText || hit.textContent || "";
            }

            // Create handlers with current element reference
            const createHandlers = (element: HTMLElement) => {
              const handleFocus = () => {
                // Double-check this is still the editing element
                if (element !== editingElementRef.current) return;

                // If the user applied inline style edits **before** entering text
                // editing mode, make sure we commit them right away so that the
                // subsequent text edits operate on the updated source.
                handleStyleBlur(element);

                // Update original content - for elements with children, only store direct text
                if (element.childElementCount > 0) {
                  originalContentRef.current =
                    extractDirectTextContent(element);
                } else {
                  originalContentRef.current =
                    element.innerText || element.textContent || "";
                }

                // Style blur above resets the flag – keep it in sync.
                hasStyleChangesRef.current = false;
              };

              const handleBlur = () => {
                // Double-check this is still the editing element
                if (element !== editingElementRef.current) return;

                // Flush style changes *before* text changes so that the style
                // update is committed with the original line/column offsets.
                // A subsequent text update may shift the source code which would
                // otherwise cause the later style edit to fail.
                handleStyleBlur(element);
                handleTextChange(element);
              };

              const handleInput = () => {
                // Double-check this is still the editing element
                if (element !== editingElementRef.current) return;
                // Optionally handle real-time updates
                // handleTextChange(element);
              };

              return { handleFocus, handleBlur, handleInput };
            };

            const handlers = createHandlers(hit);
            hit.addEventListener("focus", handlers.handleFocus);
            hit.addEventListener("blur", handlers.handleBlur);
            hit.addEventListener("input", handlers.handleInput);

            // Store handlers for cleanup
            (hit as any)._editHandlers = {
              focus: handlers.handleFocus,
              blur: handlers.handleBlur,
              input: handlers.handleInput,
            };
          }
        }

        // Update focus box with expanded dimensions
        const r = hit.getBoundingClientRect();
        const expandedBox = expandBox(r);
        setFocusBox(expandedBox);

        // Clear hover box since we're focusing
        setHoverBox(null);

        // Get className for Tailwind extraction
        const className = hit.getAttribute("class") || "";

        // Get src for images & track original
        const srcRaw =
          hit.tagName.toLowerCase() === "img"
            ? (hit as HTMLImageElement).src
            : undefined;

        if (srcRaw) {
          originalSrcRef.current = normalizeImageSrc(srcRaw);
        }

        // Get current styles immediately
        const computedStyles = getCurrentStyles(hit);

        // Send click event to parent with coordinates and current styles
        const msg = {
          type: CHANNEL,
          msg: "ELEMENT_CLICKED",
          id: hitId,
          tag: tagName,
          rect: expandedBox
            ? {
                top: expandedBox.top,
                left: expandedBox.left,
                width: expandedBox.width,
                height: expandedBox.height,
              }
            : {
                top: 0,
                left: 0,
                width: 0,
                height: 0,
              },
          clickPosition: {
            x: e.clientX,
            y: e.clientY,
          },
          isEditable,
          currentStyles: computedStyles,
          className,
          src: srcRaw,
        };

        // Send message with all data at once
        postMessageDedup(msg);

        // Move cleanup operations to after message is sent
        setTimeout(() => {
          // Before changing focus, flush pending image src change
          flushImageSrcChange();

          // Flush style changes for the previously focused element (if any)
          if (prevFocused && prevFocused !== hit) {
            handleStyleBlur(prevFocused);
          }

          // Clean up any previous editing element (if it's different)
          if (editingElementRef.current && editingElementRef.current !== hit) {
            cleanupEditingElement();
          }
        }, 0);
      } else {
        // Clicked on empty space or element without data-orchids-id
        // Clear focus and hover boxes
        if (focusedElementRef.current) {
          // Flush any pending changes
          flushImageSrcChange();
          handleStyleBlur(focusedElementRef.current);
          cleanupEditingElement();

          // Clear all focus and hover states
          focusedElementRef.current = null;
          setFocusedElementId(null);
          setFocusTag(null);
          setFocusBox(null);
          setHoverBox(null);
          setHoverBoxes([]);
          setHoverTag(null);

          // Clear focused element from localStorage
          if (typeof window !== "undefined") {
            localStorage.removeItem("orchids_focused_element");
          }

          // Notify parent that focus was cleared
          const msg = {
            type: CHANNEL,
            msg: "ELEMENT_CLICKED",
            id: null,
            tag: null,
            rect: {
              top: 0,
              left: 0,
              width: 0,
              height: 0,
            },
            clickPosition: {
              x: e.clientX,
              y: e.clientY,
            },
            isEditable: false,
            currentStyles: {},
            className: "",
          };
          postMessageDedup(msg);
        }
      }
    }

    // Handle scroll events to update hover box position
    function onScroll() {
      if (isResizingRef.current) return;
      // Only update hover box if visual edit mode is active
      if (!isVisualEditModeRef.current) return;

      // Hide hover boxes while scrolling
      setIsScrolling(true);
      setHoverBox(null);
      setHoverBoxes([]);

      // Notify parent that scrolling has started
      const scrollMsg = {
        type: CHANNEL,
        msg: "SCROLL_STARTED",
      };
      postMessageDedup(scrollMsg);

      // Reset the notification flag after scrolling stops
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
        const scrollStopMsg = {
          type: CHANNEL,
          msg: "SCROLL_STOPPED",
        };
        postMessageDedup(scrollStopMsg);
      }, 16); // One frame (16ms) for instant restoration
    }

    // Add event listeners
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("mousedown", onMouseDownCapture, {
      capture: true,
    });
    document.addEventListener("click", onClickCapture, { capture: true });

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("mousedown", onMouseDownCapture, true);
      document.removeEventListener("click", onClickCapture, true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [focusedElementId, isScrolling]); // Added focusedElementId and isScrolling as dependencies

  return (
    <>
      {/* Hover box - shows on hover with blue overlay */}
      {isVisualEditMode && !isResizing && (
        <>
          {/* Render all hover boxes for elements with same ID */}
          {hoverBoxes
            .filter((box): box is NonNullable<Box> => box !== null)
            .map((box, index) => (
              <div key={index}>
                <div
                  className="fixed pointer-events-none border-[0.5px] border-[#38bdf8] bg-blue-200/20 border-dashed rounded-sm"
                  style={{
                    zIndex: 100000,
                    left: box.left,
                    top: box.top,
                    width: box.width,
                    height: box.height,
                  }}
                />
                {/* Tag label on each hover box */}
                {hoverTag && (
                  <div
                    className="fixed pointer-events-none text-[10px] text-white bg-[#38bdf8] px-1 py-0.5 rounded-sm"
                    style={{
                      zIndex: 100001,
                      left: box.left,
                      top: box.top - 20,
                    }}
                  >
                    {hoverTag}
                  </div>
                )}
              </div>
            ))}
        </>
      )}

      {/* Focus box - shows on click with just border, no overlay */}
      {isVisualEditMode && focusBox && (
        <>
          {focusTag && (
            <div
              className="fixed text-[10px] font-semibold text-white bg-[#3b82f6] px-1 rounded-sm pointer-events-none select-none"
              style={{
                zIndex: 100003,
                left: focusBox.left - 4,
                top: focusBox.top - 16,
              }}
            >
              {focusTag}
            </div>
          )}

          <div
            className="fixed pointer-events-none border-[1.5px] border-[#38bdf8] rounded-sm"
            style={{
              zIndex: 100001,
              left: focusBox.left,
              top: focusBox.top,
              width: focusBox.width,
              height: focusBox.height,
            }}
          />

          {/* Resize handles */}
          {!isResizing && (
            <>
              {/* Corner handles */}
              <div
                className="fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-nw-resize pointer-events-auto resize-handle"
                style={{
                  zIndex: 100002,
                  left: focusBox.left - 4,
                  top: focusBox.top - 4,
                }}
                onMouseDown={(e) => handleResizeStart(e, "nw")}
              />
              <div
                className="fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-ne-resize pointer-events-auto resize-handle"
                style={{
                  zIndex: 100002,
                  left: focusBox.left + focusBox.width - 4,
                  top: focusBox.top - 4,
                }}
                onMouseDown={(e) => handleResizeStart(e, "ne")}
              />
              <div
                className="fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-sw-resize pointer-events-auto resize-handle"
                style={{
                  zIndex: 100002,
                  left: focusBox.left - 4,
                  top: focusBox.top + focusBox.height - 4,
                }}
                onMouseDown={(e) => handleResizeStart(e, "sw")}
              />
              <div
                className="fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-se-resize pointer-events-auto resize-handle"
                style={{
                  zIndex: 100002,
                  left: focusBox.left + focusBox.width - 4,
                  top: focusBox.top + focusBox.height - 4,
                }}
                onMouseDown={(e) => handleResizeStart(e, "se")}
              />

              {/* Edge handles */}
              <div
                className="fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-n-resize pointer-events-auto resize-handle"
                style={{
                  zIndex: 100002,
                  left: focusBox.left + focusBox.width / 2 - 4,
                  top: focusBox.top - 4,
                }}
                onMouseDown={(e) => handleResizeStart(e, "n")}
              />
              <div
                className="fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-s-resize pointer-events-auto resize-handle"
                style={{
                  zIndex: 100002,
                  left: focusBox.left + focusBox.width / 2 - 4,
                  top: focusBox.top + focusBox.height - 4,
                }}
                onMouseDown={(e) => handleResizeStart(e, "s")}
              />
              <div
                className="fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-w-resize pointer-events-auto resize-handle"
                style={{
                  zIndex: 100002,
                  left: focusBox.left - 4,
                  top: focusBox.top + focusBox.height / 2 - 4,
                }}
                onMouseDown={(e) => handleResizeStart(e, "w")}
              />
              <div
                className="fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-e-resize pointer-events-auto resize-handle"
                style={{
                  zIndex: 100002,
                  left: focusBox.left + focusBox.width - 4,
                  top: focusBox.top + focusBox.height / 2 - 4,
                }}
                onMouseDown={(e) => handleResizeStart(e, "e")}
              />
            </>
          )}
        </>
      )}
    </>
  );
}