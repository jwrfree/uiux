import { useEffect, useRef } from 'react';
import { CHANNEL, ParentToChild, ChildToParent } from './types';
import { postMessageDedup, normalizeImageSrc } from './utils';

export function useVisualEditMode(isVisualEditMode: boolean, setIsVisualEditMode: (value: boolean) => void) {
  const isVisualEditModeRef = useRef(false);

  // Keep ref in sync with state and persist to localStorage
  useEffect(() => {
    isVisualEditModeRef.current = isVisualEditMode;
    // Persist to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("orchids_visual_edit_mode", String(isVisualEditMode));
    }
  }, [isVisualEditMode]);

  // On mount, notify parent if visual edit mode was restored from localStorage
  useEffect(() => {
    if (isVisualEditMode) {
      // Send acknowledgement to parent that visual edit mode is active
      // This will sync the parent's state with our restored state
      window.parent.postMessage(
        { type: CHANNEL, msg: "VISUAL_EDIT_MODE_ACK", active: true },
        "*"
      );

      // Also send a special message to indicate this was restored from localStorage
      window.parent.postMessage(
        { type: CHANNEL, msg: "VISUAL_EDIT_MODE_RESTORED", active: true },
        "*"
      );
    }
  }, []); // Run only on mount

  return { isVisualEditModeRef };
}

export function useMessageHandlers(
  isVisualEditMode: boolean,
  isVisualEditModeRef: React.RefObject<boolean>,
  setIsVisualEditMode: (value: boolean) => void,
  focusedElementRef: React.RefObject<HTMLElement | null>,
  focusedElementId: string | null,
  setFocusedElementId: (id: string | null) => void,
  setFocusBox: (box: any) => void,
  setHoverBox: (box: any) => void,
  setHoverBoxes: (boxes: any[]) => void,
  setHoverTag: (tag: string | null) => void,
  setFocusTag: (tag: string | null) => void,
  editingElementRef: React.RefObject<HTMLElement | null>,
  cleanupEditingElement: () => void,
  handleStyleBlur: (element: HTMLElement) => void,
  flushImageSrcChange: () => void,
  updateFocusBox: () => void
) {
  // Listen for style and image updates from parent
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "ORCHIDS_STYLE_UPDATE") {
        const { elementId, styles } = e.data;

        // Find ALL elements with the same orchids ID
        const allMatchingElements = document.querySelectorAll(
          `[data-orchids-id="${elementId}"]`
        ) as NodeListOf<HTMLElement>;

        if (allMatchingElements.length > 0) {
          // If fontFamily is present ensure stylesheet loaded first
          const fam = styles.fontFamily || styles["fontFamily"];
          if (fam) {
            const familyKey = fam.replace(/['\s]+/g, "+");
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = `https://fonts.googleapis.com/css2?family=${familyKey}:wght@400&display=swap`;
            document.head.appendChild(link);
          }

          // Apply styles to ALL matching elements
          allMatchingElements.forEach((element) => {
            // Only update handleStyleChange for the focused element to track changes
            if (focusedElementRef.current === element) {
              // This would be passed as a prop
              // handleStyleChange(element, styles);
            } else {
              // For other elements, apply styles directly
              Object.entries(styles).forEach(([property, value]) => {
                const cssProp = property
                  .replace(/([A-Z])/g, "-$1")
                  .toLowerCase();
                element.style.setProperty(cssProp, String(value), "important");
              });
            }
          });
        }
      } else if (e.data?.type === "ORCHIDS_IMAGE_UPDATE") {
        const { elementId, src, oldSrc } = e.data;
        let element: HTMLImageElement | null = null;
        const candidates = document.querySelectorAll(
          `[data-orchids-id="${elementId}"]`
        );
        candidates.forEach((el) => {
          if (el.tagName.toLowerCase() === "img") {
            const img = el as HTMLImageElement;
            const norm = normalizeImageSrc(img.src);
            if (!element) element = img;
            if (oldSrc && normalizeImageSrc(oldSrc) === norm) {
              element = img;
            }
          }
        });

        if (!element) return;

        if ((element as HTMLElement).tagName.toLowerCase() === "img") {
          const imgEl = element as HTMLImageElement;

          // Clear any existing responsive sources so the newly uploaded image
          // always displays.  Some frameworks (e.g. Next.js) add a `srcset`
          // attribute which can override `src` in certain viewport/device
          // scenarios, so we strip it out before setting the new source.
          imgEl.removeAttribute("srcset");
          imgEl.srcset = "";

          imgEl.src = src;

          // Update baseline src so flush doesn't treat this as pending change
          // originalSrcRef.current = normalizeImageSrc(src);
          // focusedImageElementRef.current = imgEl;

          imgEl.onload = () => updateFocusBox();
        }
      } else if (e.data?.type === "RESIZE_ELEMENT") {
        const { elementId, width, height } = e.data;
        const element = document.querySelector(
          `[data-orchids-id="${elementId}"]`
        ) as HTMLElement;

        if (element && focusedElementRef.current === element) {
          // Apply temporary resize styles
          element.style.setProperty("width", `${width}px`, "important");
          element.style.setProperty("height", `${height}px`, "important");

          // Update focus box
          updateFocusBox();
        }
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [
    focusedElementRef,
    focusedElementId,
    updateFocusBox,
    // handleStyleChange would need to be added
  ]);

  // Handle visual edit mode state changes from parent
  useEffect(() => {
    function onMsg(e: MessageEvent<ParentToChild>) {
      if (e.data?.type !== CHANNEL) return;

      // Handle visual edit mode state changes
      if (e.data.msg === "VISUAL_EDIT_MODE" && "active" in e.data) {
        const newMode = e.data.active;
        setIsVisualEditMode(newMode);

        // Clear localStorage if visual edit mode is being turned off
        if (!newMode && typeof window !== "undefined") {
          localStorage.removeItem("orchids_visual_edit_mode");
          localStorage.removeItem("orchids_focused_element");
        }

        // Send acknowledgement back to parent so it knows we received the mode change
        window.parent.postMessage(
          { type: CHANNEL, msg: "VISUAL_EDIT_MODE_ACK", active: newMode },
          "*"
        );

        if (!newMode) {
          // Flush image src change for current focus
          flushImageSrcChange();

          // Clean up any editing element
          cleanupEditingElement();

          // Clear everything when exiting visual edit mode
          setHoverBox(null);
          setHoverBoxes([]);
          setFocusBox(null);
          setFocusedElementId(null);
          setHoverTag(null);
          setFocusTag(null);

          // Notify parent that we've cleared the selection
          const msg: ChildToParent = {
            type: CHANNEL,
            msg: "HIT",
            id: null,
            tag: null,
            rect: null,
          };
          postMessageDedup(msg);
        }
      }
    }

    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [
    setIsVisualEditMode,
    cleanupEditingElement,
    flushImageSrcChange,
    setHoverBox,
    setHoverBoxes,
    setFocusBox,
    setFocusedElementId,
    setHoverTag,
    setFocusTag,
    postMessageDedup
  ]);
}