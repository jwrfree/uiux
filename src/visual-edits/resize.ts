import { useEffect } from 'react';
import { postMessageDedup, parseOrchidsId } from './utils';
import { CHANNEL } from './types';

export function useResizeHandlers(
  isResizing: boolean,
  setIsResizing: (value: boolean) => void,
  resizeHandle: string | null,
  resizeStart: { x: number; y: number; width: number; height: number } | null,
  setResizeStart: (start: { x: number; y: number; width: number; height: number } | null) => void,
  setResizeHandle: (handle: string | null) => void,
  focusedElementRef: React.RefObject<HTMLElement | null>,
  focusedElementId: string | null,
  updateFocusBox: () => void,
  setHoverBox: (box: any) => void,
  setHoverBoxes: (boxes: any[]) => void,
  lastHitElementRef: React.RefObject<HTMLElement | null>
) {
  // Handle resize start
  const handleResizeStart = (e: React.MouseEvent, handle: string) => {
    if (!focusedElementRef.current) return;

    e.preventDefault();
    e.stopPropagation();

    const rect = focusedElementRef.current.getBoundingClientRect();

    // Clear any hover overlay when starting resize
    setHoverBox(null);
    lastHitElementRef.current = null;

    // Disable pointer events on body to prevent hover detection
    document.body.style.pointerEvents = "none";
    // Keep resize handles interactive
    const resizeHandles = document.querySelectorAll(".resize-handle");
    resizeHandles.forEach((handle) => {
      (handle as HTMLElement).style.pointerEvents = "auto";
    });

    setIsResizing(true);
    setResizeHandle(handle);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: rect.width,
      height: rect.height,
    });
  };

  // Handle resize move
  useEffect(() => {
    if (
      !isResizing ||
      !resizeStart ||
      !resizeHandle ||
      !focusedElementRef.current
    )
      return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - resizeStart.x;
      const dy = e.clientY - resizeStart.y;

      let newWidth = resizeStart.width;
      let newHeight = resizeStart.height;

      // Calculate new dimensions based on handle
      if (resizeHandle.includes("e")) newWidth = resizeStart.width + dx;
      if (resizeHandle.includes("w")) newWidth = resizeStart.width - dx;
      if (resizeHandle.includes("s")) newHeight = resizeStart.height + dy;
      if (resizeHandle.includes("n")) newHeight = resizeStart.height - dy;

      // Get parent container for constraints
      const parent = focusedElementRef.current?.parentElement;
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const parentStyles = window.getComputedStyle(parent);
        const parentPaddingLeft = parseFloat(parentStyles.paddingLeft) || 0;
        const parentPaddingRight = parseFloat(parentStyles.paddingRight) || 0;
        const parentPaddingTop = parseFloat(parentStyles.paddingTop) || 0;
        const parentPaddingBottom = parseFloat(parentStyles.paddingBottom) || 0;

        const maxWidth =
          parentRect.width - parentPaddingLeft - parentPaddingRight;
        const maxHeight =
          parentRect.height - parentPaddingTop - parentPaddingBottom;

        /*
         * Soft-clamp strategy: we respect the parent's max size until the
         * user's cursor actually travels beyond that limit.  As soon as the
         * drag distance would produce a dimension larger than the container
         * can accommodate we stop clamping and let the element follow the
         * cursor, effectively allowing it to "spill" out of its parent.
         */
        const exceedsWidth = newWidth > maxWidth;
        const exceedsHeight = newHeight > maxHeight;

        newWidth = Math.max(
          20,
          exceedsWidth ? newWidth : Math.min(newWidth, maxWidth)
        );

        newHeight = Math.max(
          20,
          exceedsHeight ? newHeight : Math.min(newHeight, maxHeight)
        );
      } else {
        // Fallback to minimum dimensions if no parent
        newWidth = Math.max(20, newWidth);
        newHeight = Math.max(20, newHeight);
      }

      // Ensure hover box stays hidden during resize
      if (hoverBox) {
        setHoverBox(null);
      }

      // Send resize message to parent
      if (focusedElementId) {
        window.parent.postMessage(
          {
            type: CHANNEL,
            msg: "RESIZE_ELEMENT",
            elementId: focusedElementId,
            width: Math.round(newWidth),
            height: Math.round(newHeight),
          },
          "*"
        );
      }
    };

    const handleMouseUp = () => {
      if (focusedElementRef.current && focusedElementId) {
        const element = focusedElementRef.current;
        const computedStyle = window.getComputedStyle(element);
        const width = parseFloat(computedStyle.width) || element.offsetWidth;
        const height = parseFloat(computedStyle.height) || element.offsetHeight;

        // Check if element has max-width/max-height constraints
        const maxWidth = computedStyle.maxWidth;
        const maxHeight = computedStyle.maxHeight;
        const hasMaxWidth =
          maxWidth && maxWidth !== "none" && maxWidth !== "initial";
        const hasMaxHeight =
          maxHeight && maxHeight !== "none" && maxHeight !== "initial";

        // Try to use relative units when possible
        const parent = element.parentElement;
        let widthValue = `${Math.round(width)}px`;
        let heightValue = `${Math.round(height)}px`;

        if (parent) {
          const parentRect = parent.getBoundingClientRect();
          const parentStyles = window.getComputedStyle(parent);
          const parentPaddingLeft = parseFloat(parentStyles.paddingLeft) || 0;
          const parentPaddingRight = parseFloat(parentStyles.paddingRight) || 0;
          const parentPaddingTop = parseFloat(parentStyles.paddingTop) || 0;
          const parentPaddingBottom =
            parseFloat(parentStyles.paddingBottom) || 0;

          const parentInnerWidth =
            parentRect.width - parentPaddingLeft - parentPaddingRight;
          const parentInnerHeight =
            parentRect.height - parentPaddingTop - parentPaddingBottom;

          // If the element takes up a significant portion of parent, use percentage
          const widthPercent = (width / parentInnerWidth) * 100;
          const heightPercent = (height / parentInnerHeight) * 100;

          // Use percentage if it's a round number or close to common values
          if (
            Math.abs(widthPercent - Math.round(widthPercent)) < 0.1 ||
            [25, 33.333, 50, 66.667, 75, 100].some(
              (v) => Math.abs(widthPercent - v) < 0.5
            )
          ) {
            widthValue = `${Math.round(widthPercent * 10) / 10}%`;
          }

          // For height, be more conservative with percentages (often px is preferred)
          if (
            Math.abs(heightPercent - Math.round(heightPercent)) < 0.1 &&
            [25, 50, 75, 100].includes(Math.round(heightPercent))
          ) {
            heightValue = `${Math.round(heightPercent)}%`;
          }
        }

        // Build styles object
        const styles: Record<string, string> = {};

        // Always set a fixed width and height to break out of responsive classes.
        styles.width = widthValue;
        styles.height = heightValue;

        // If the element had a max-width constraint (e.g. from `max-w-full`),
        // we update it to the new width to ensure the resize is not capped.
        if (hasMaxWidth) {
          styles.maxWidth = widthValue;
        }

        // Same for height.
        if (hasMaxHeight) {
          styles.maxHeight = heightValue;
        }

        // Send final dimensions as style change
        const msg = {
          type: CHANNEL,
          msg: "STYLE_BLUR",
          id: focusedElementId,
          styles,
          filePath: "",
          line: 0,
          column: 0,
          className: element.getAttribute("class") || "",
        };

        // Extract file info from data-orchids-id
        const orchidsId = element.getAttribute("data-orchids-id");
        if (orchidsId) {
          const parsed = parseOrchidsId(orchidsId);
          if (parsed) {
            msg.filePath = parsed.filePath;
            msg.line = parsed.line;
            msg.column = parsed.column;
          }
        }

        window.parent.postMessage(msg, "*");
      }

      setIsResizing(false);
      isResizingRef.current = false;
      setResizeHandle(null);
      setResizeStart(null);

      // Re-enable pointer events
      document.body.style.pointerEvents = "";

      // Clear the last hit element to force re-detection after resize
      lastHitElementRef.current = null;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, resizeStart, resizeHandle, focusedElementId]);

  return { handleResizeStart };
}