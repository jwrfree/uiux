export const CHANNEL = "ORCHIDS_HOVER_v1" as const;
export const VISUAL_EDIT_MODE_KEY = "orchids_visual_edit_mode" as const;
export const FOCUSED_ELEMENT_KEY = "orchids_focused_element" as const;
export const BOX_PADDING = 4; // Pixels to expand the box on each side
export const MOBILE_BREAKPOINT = 768;

export type ParentToChild =
  | { type: typeof CHANNEL; msg: "POINTER"; x: number; y: number }
  | { type: typeof CHANNEL; msg: "VISUAL_EDIT_MODE"; active: boolean }
  | { type: typeof CHANNEL; msg: "SCROLL"; dx: number; dy: number }
  | { type: typeof CHANNEL; msg: "CLEAR_INLINE_STYLES"; elementId: string }
  | {
      type: typeof CHANNEL;
      msg: "PREVIEW_FONT";
      elementId: string;
      fontFamily: string;
    }
  | {
      type: typeof CHANNEL;
      msg: "RESIZE_ELEMENT";
      elementId: string;
      width: number;
      height: number;
    }
  | {
      type: typeof CHANNEL;
      msg: "SHOW_ELEMENT_HOVER";
      elementId: string | null;
    };

export type ChildToParent =
  | {
      type: typeof CHANNEL;
      msg: "HIT";
      id: string | null;
      tag: string | null;
      rect: { top: number; left: number; width: number; height: number } | null;
    }
  | {
      type: typeof CHANNEL;
      msg: "ELEMENT_CLICKED";
      id: string | null;
      tag: string | null;
      rect: { top: number; left: number; width: number; height: number };
      clickPosition: { x: number; y: number };
      isEditable?: boolean;
      currentStyles?: {
        fontSize?: string;
        color?: string;
        fontWeight?: string;
        fontStyle?: string;
        textDecoration?: string;
        textAlign?: string;
        lineHeight?: string;
        letterSpacing?: string;
        paddingLeft?: string;
        paddingRight?: string;
        paddingTop?: string;
        paddingBottom?: string;
        marginLeft?: string;
        marginRight?: string;
        marginTop?: string;
        marginBottom?: string;
        backgroundColor?: string;
        backgroundImage?: string;
        borderRadius?: string;
        fontFamily?: string;
        opacity?: string;
        display?: string;
        flexDirection?: string;
        alignItems?: string;
        justifyContent?: string;
        gap?: string;
      };
      className?: string;
      src?: string;
    }
  | { type: typeof CHANNEL; msg: "SCROLL_STARTED" }
  | { type: typeof CHANNEL; msg: "SCROLL_STOPPED" }
  | {
      type: typeof CHANNEL;
      msg: "TEXT_CHANGED";
      id: string;
      oldText: string;
      newText: string;
      filePath: string;
      line: number;
      column: number;
    }
  | {
      type: typeof CHANNEL;
      msg: "STYLE_CHANGED";
      id: string;
      styles: Record<string, string>;
      filePath: string;
      line: number;
      column: number;
    }
  | {
      type: typeof CHANNEL;
      msg: "STYLE_BLUR";
      id: string;
      styles: Record<string, string>;
      filePath: string;
      line: number;
      column: number;
      className: string;
    }
  | {
      type: typeof CHANNEL;
      msg: "IMAGE_BLUR";
      id: string;
      oldSrc: string;
      newSrc: string;
      filePath: string;
      line: number;
      column: number;
    }
  | {
      type: typeof CHANNEL;
      msg: "FOCUS_MOVED";
      id: string;
      rect: { top: number; left: number; width: number; height: number };
    }
  | { type: typeof CHANNEL; msg: "VISUAL_EDIT_MODE_ACK"; active: boolean }
  | { type: typeof CHANNEL; msg: "VISUAL_EDIT_MODE_RESTORED"; active: boolean };

export type Box = null | { top: number; left: number; width: number; height: number };