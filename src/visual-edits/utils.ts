import { CHANNEL } from './types';

// Deduplicate helper for high-frequency traffic (HIT / FOCUS_MOVED / SCROLL)
let _orchidsLastMsg = "";
export const postMessageDedup = (data: any) => {
  try {
    const key = JSON.stringify(data);
    if (key === _orchidsLastMsg) return; // identical – drop
    _orchidsLastMsg = key;
  } catch {
    // if stringify fails, fall through
  }
  window.parent.postMessage(data, "*");
};

// Helper to check if element can be made contentEditable
export const isTextEditable = (element: HTMLElement): boolean => {
  const tagName = element.tagName.toLowerCase();
  // Elements that typically contain text and can be made contentEditable
  const editableTags = [
    "p",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "span",
    "div",
    "li",
    "td",
    "th",
    "label",
    "a",
    "button",
  ];

  // Check if it's already contentEditable or an input/textarea
  if (
    element.contentEditable === "true" ||
    tagName === "input" ||
    tagName === "textarea"
  ) {
    return true;
  }

  // Allow editing if element contains text and is an editable tag
  // Only allow editing if element has at most 1 child OR has direct text content
  if (editableTags.includes(tagName) && element.textContent?.trim()) {
    // Check if element has direct text nodes (not just text from children)
    const hasDirectText = Array.from(element.childNodes).some(
      (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
    );

    // Allow editing if:
    // 1. Element has no children (pure text element)
    // 2. Element has 1 or fewer children AND has direct text content
    if (
      element.childElementCount === 0 ||
      (element.childElementCount <= 1 && hasDirectText)
    ) {
      return true;
    }
  }

  return false;
};

// Helper to extract only text nodes from an element (excluding child element text)
export const extractDirectTextContent = (element: HTMLElement): string => {
  let text = "";
  for (const node of element.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent || "";
    }
  }
  return text;
};

// Helper to parse data-orchids-id to extract file path, line, and column
export const parseOrchidsId = (
  orchidsId: string
): { filePath: string; line: number; column: number } | null => {
  // Format: "filepath:line:column"
  const parts = orchidsId.split(":");
  if (parts.length < 3) return null;

  // The file path might contain colons, so we need to handle that
  const column = parseInt(parts.pop() || "0");
  const line = parseInt(parts.pop() || "0");
  const filePath = parts.join(":"); // Rejoin the remaining parts as the file path

  if (isNaN(line) || isNaN(column)) return null;

  return { filePath, line, column };
};

// Helper to wrap multiline text only when it contains line breaks
export const wrapMultiline = (text: string): string => {
  if (text.includes("\n")) {
    const escaped = text.replace(/\n/g, "\\n");
    // Wrap in {` ... `} so JSX will interpret it as a template literal
    return `{\`${escaped}\`}`;
  }
  return text;
};

// Normalize image src for comparison (handles Next.js optimization wrappers)
export const normalizeImageSrc = (input: string): string => {
  if (!input) return "";
  try {
    const url = new URL(input, window.location.origin);
    // Handle Next.js <Image> optimization wrapper
    if (url.pathname === "/_next/image") {
      const real = url.searchParams.get("url");
      if (real) return decodeURIComponent(real);
    }
    return url.href; // absolute form
  } catch {
    return input;
  }
};

// Helper to expand box dimensions
export const expandBox = (rect: DOMRect): { top: number; left: number; width: number; height: number } => ({
  top: rect.top - 4, // BOX_PADDING
  left: rect.left - 4,
  width: rect.width + 8,
  height: rect.height + 8,
});