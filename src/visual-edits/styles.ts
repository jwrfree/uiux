export const getCurrentStyles = (
  element: HTMLElement
): {
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
} => {
  const computed = window.getComputedStyle(element);

  // Helper to normalize values and provide defaults
  const normalizeValue = (value: string, property: string): string => {
    // Handle background color - if it's transparent or rgba(0,0,0,0), return "transparent"
    if (property === "backgroundColor") {
      if (
        value === "rgba(0, 0, 0, 0)" ||
        value === "rgb(0, 0, 0, 0)" ||
        value === "transparent" ||
        value === ""
      ) {
        return "transparent";
      }
    }

    // Handle background image - if none, return "none"
    if (property === "backgroundImage" && (value === "none" || value === "")) {
      return "none";
    }

    // Handle text decoration - if none, return "none"
    if (property === "textDecoration") {
      // Some browsers return complex values like "none solid rgb(0, 0, 0)"
      if (value.includes("none") || value === "") {
        return "none";
      }
    }

    // Handle font style - if normal, return "normal"
    if (property === "fontStyle" && (value === "normal" || value === "")) {
      return "normal";
    }

    // Handle font weight - normalize to standard values
    if (property === "fontWeight") {
      const weight = parseInt(value);
      if (!isNaN(weight)) {
        return String(weight);
      }
      return value || "400";
    }

    // Handle opacity - if 1, return "1"
    if (property === "opacity" && (value === "1" || value === "")) {
      return "1";
    }

    // Handle spacing values (padding/margin) - if 0px, return "0"
    if (
      (property.includes("padding") || property.includes("margin")) &&
      (value === "0px" || value === "0")
    ) {
      return "0";
    }

    // Handle border radius - if 0px, return "0"
    if (property === "borderRadius" && (value === "0px" || value === "0")) {
      return "0";
    }

    // Handle letter spacing - if normal, return "normal"
    if (
      property === "letterSpacing" &&
      (value === "normal" || value === "0px")
    ) {
      return "normal";
    }

    // Handle gap - if normal, return "normal"
    if (property === "gap" && (value === "normal" || value === "0px")) {
      return "normal";
    }

    return value;
  };

  return {
    fontSize: normalizeValue(computed.fontSize, "fontSize"),
    color: normalizeValue(computed.color, "color"),
    fontWeight: normalizeValue(computed.fontWeight, "fontWeight"),
    fontStyle: normalizeValue(computed.fontStyle, "fontStyle"),
    textDecoration: normalizeValue(computed.textDecoration, "textDecoration"),
    textAlign: normalizeValue(computed.textAlign, "textAlign"),
    lineHeight: normalizeValue(computed.lineHeight, "lineHeight"),
    letterSpacing: normalizeValue(computed.letterSpacing, "letterSpacing"),
    paddingLeft: normalizeValue(computed.paddingLeft, "paddingLeft"),
    paddingRight: normalizeValue(computed.paddingRight, "paddingRight"),
    paddingTop: normalizeValue(computed.paddingTop, "paddingTop"),
    paddingBottom: normalizeValue(computed.paddingBottom, "paddingBottom"),
    marginLeft: normalizeValue(computed.marginLeft, "marginLeft"),
    marginRight: normalizeValue(computed.marginRight, "marginRight"),
    marginTop: normalizeValue(computed.marginTop, "marginTop"),
    marginBottom: normalizeValue(computed.marginBottom, "marginBottom"),
    backgroundColor: normalizeValue(
      computed.backgroundColor,
      "backgroundColor"
    ),
    backgroundImage: normalizeValue(
      computed.backgroundImage,
      "backgroundImage"
    ),
    borderRadius: normalizeValue(computed.borderRadius, "borderRadius"),
    fontFamily: normalizeValue(computed.fontFamily, "fontFamily"),
    opacity: normalizeValue(computed.opacity, "opacity"),
    display: normalizeValue(computed.display, "display"),
    flexDirection: normalizeValue(computed.flexDirection, "flexDirection"),
    alignItems: normalizeValue(computed.alignItems, "alignItems"),
    justifyContent: normalizeValue(computed.justifyContent, "justifyContent"),
    gap: normalizeValue(computed.gap, "gap"),
  };
};