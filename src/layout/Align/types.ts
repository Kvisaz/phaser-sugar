export enum AlignMethod {
  CENTER = "center",
  CENTER_X = "centerX",
  CENTER_Y = "centerY",
  BOTTOM_IN = "bottomIn",
  BOTTOM_TO = "bottomTo",
  TOP_IN = "topIn",
  TOP_TO = "topTo",
  RIGHT_IN = "rightIn",
  RIGHT_TO = "rightTo",
  LEFT_IN = "leftIn",
  LEFT_TO = "leftTo"
}

export const isLayoutMethodOffsetX = (method: AlignMethod) => method.startsWith("right") || method.startsWith("left");
export const isLayoutMethodOffsetY = (method: AlignMethod) => method.startsWith("bottom") || method.startsWith("top");
export const isLayoutMethodOffsetBothXY = (method: AlignMethod) => method.startsWith("center");
