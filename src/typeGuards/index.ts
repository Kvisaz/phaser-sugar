import { LayoutArea } from "../layout/LayoutArea/types";

/** Type guards для разных типов LayoutArea; **/
export const isScene = (layoutArea: LayoutArea): layoutArea is Phaser.Scene => {
  return layoutArea instanceof Phaser.Scene;
};

export const isRectangle = (layoutArea: LayoutArea): layoutArea is Phaser.Geom.Rectangle => {
  return layoutArea instanceof Phaser.Geom.Rectangle;
};

export const hasGetBounds = (layoutArea: LayoutArea): layoutArea is { getBounds: () => Phaser.Geom.Rectangle } => {
  return typeof layoutArea === "object" &&
    layoutArea !== null &&
    "getBounds" in layoutArea &&
    typeof (layoutArea as any).getBounds === "function";
};

export const hasWidthHeight = (layoutArea: LayoutArea): layoutArea is { width: number; height: number } => {
  return typeof layoutArea === "object" &&
    layoutArea !== null &&
    "width" in layoutArea &&
    "height" in layoutArea &&
    typeof (layoutArea as any).width === "number" &&
    typeof (layoutArea as any).height === "number";
};

