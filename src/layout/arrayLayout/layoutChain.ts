import { Align } from "../Align/Align";
import { AlignObject, IBoundable } from "../types";
import { AlignMethod } from "../Align/types";
import { ArrayAlignObject, isArrayAlignObject } from "../ArrayAlignObject/ArrayAlignObject";

export interface ILayoutConfig {
  /** objects for layout, ArrayAlignObject is a special wrapper for objects array **/
  children: AlignObject[] | ArrayAlignObject;
  /** anchor for layout, if not defined - children[0] **/
  anchor?: AlignObject;

  /** apple to next, anchor is previous **/
  alignToNext: AlignMethod;
  nextOffsetX?: number | ((i: number) => number);
  nextOffsetY?: number | ((i: number) => number);

  /** apple to next, anchor is anchor or first child **/
  alignToAnchor: AlignMethod;
  anchorOffsetX?: number | ((i: number) => number);
  anchorOffsetY?: number | ((i: number) => number);
}

const defaultRowConfig: ILayoutConfig = {
  children: [],
  alignToNext: AlignMethod.RIGHT_TO,
  nextOffsetX: 0,
  nextOffsetY: 0,
  alignToAnchor: AlignMethod.CENTER_Y,
  anchorOffsetX: 0,
  anchorOffsetY: 0
};

let align = new Align();

/**
 * Layout array of objects or children of ArrayAlignObjects
 * always returns ArrayAlignObject
 **/
export const layoutChain = (options: ILayoutConfig): ArrayAlignObject => {
  const arrayAlignObject = isArrayAlignObject(options.children) ? options.children : new ArrayAlignObject(options.children);
  const layoutObjects = arrayAlignObject.all();

  /** nothing to layout **/
  if (layoutObjects.length === 0) return arrayAlignObject;

  const firstObject = layoutObjects[0];
  const config: ILayoutConfig = { ...defaultRowConfig, ...options };
  const anchor: IBoundable = config.anchor ?? firstObject;

  /** no anchor or anchor is single object **/
  if (anchor == null) return arrayAlignObject;

  if (layoutObjects.length === 1 && anchor === firstObject) return arrayAlignObject;


  for (let i = 0; i < layoutObjects.length; i++) {
    const next = layoutObjects[i];
    // align to anchor
    align.anchor(anchor).applyMethod(config.alignToAnchor, next);
    next.x += typeof config.anchorOffsetX === "function" ? config.anchorOffsetX?.(i) : config.anchorOffsetX ?? 0;
    next.y += typeof config.anchorOffsetY === "function" ? config.anchorOffsetY?.(i) : config.anchorOffsetY ?? 0;

    // align to previous
    if (i > 0) {
      /** Первый элемент уже выровнен по якорю, дополнительное смещение не нужно. **/
      const prev = layoutObjects[i - 1];
      align.anchor(prev).applyMethod(config.alignToNext, next);
      next.x += typeof config.nextOffsetX === "function" ? config.nextOffsetX?.(i) : config.nextOffsetX ?? 0;
      next.y += typeof config.nextOffsetY === "function" ? config.nextOffsetY?.(i) : config.nextOffsetY ?? 0;
    }
  }

  return arrayAlignObject;
};

type ILayoutOptions = Partial<ILayoutConfig> & { children: AlignObject[] | ArrayAlignObject };

export function layoutRow({ children, ...options}: ILayoutOptions): ArrayAlignObject {
  return layoutChain({
    children,
    alignToNext: AlignMethod.RIGHT_TO,
    alignToAnchor: AlignMethod.CENTER_Y,
    ...options
  });
}

export function layoutColumn({ children, ...options}: ILayoutOptions): ArrayAlignObject {
  return layoutChain({
    children,
    alignToNext: AlignMethod.BOTTOM_TO,
    alignToAnchor: AlignMethod.CENTER_X,
    ...options
  });
}
