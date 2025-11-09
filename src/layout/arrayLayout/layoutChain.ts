import { Align } from "../Align/Align";
import { AlignObject, IBoundable } from "../types";
import { AlignMethod, isLayoutMethodOffsetBothXY, isLayoutMethodOffsetX, isLayoutMethodOffsetY } from "../Align/types";
import { ArrayAlignObject, isArrayAlignObject } from "../ArrayAlignObject/ArrayAlignObject";
import { safeArray } from "../../collections";

export interface ILayoutConfig {
  /** objects for layout, ArrayAlignObject is a special wrapper for objects array **/
  children: AlignObject[] | ArrayAlignObject;
  /** anchor for layout, if not defined - children[0] **/
  anchor?: AlignObject;
  /** offset for next in children, chidlren all **/
  offsetX: number | ((i: number) => number);
  offsetY: number | ((i: number) => number);
  /** rules for next element layout **/
  rules: AlignMethod[];
}

const defaultRowConfig: ILayoutConfig = {
  children: [],
  offsetX: 0,
  offsetY: 0,
  rules: [AlignMethod.RIGHT_TO]
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
  let currentAnchor: IBoundable = config.anchor ?? firstObject;

  /** no anchor or anchor is single object **/
  if (currentAnchor == null || currentAnchor === firstObject) return arrayAlignObject;

  align.anchor(currentAnchor);
  const { rules } = config;

  for (let i = 0; i < layoutObjects.length; i++) {
    const obj = layoutObjects[i];
    rules.forEach(rule => {
      const nextOffsetX = typeof config.offsetX === "function" ? config.offsetX(i) : config.offsetX;
      const nextOffsetY = typeof config.offsetY === "function" ? config.offsetY(i) : config.offsetY;
      const offsetX = isLayoutMethodOffsetX(rule) || isLayoutMethodOffsetBothXY(rule) ? nextOffsetX : undefined;
      const offsetY = isLayoutMethodOffsetY(rule) || isLayoutMethodOffsetBothXY(rule) ? nextOffsetY : undefined;
      const offsets = safeArray([offsetX, offsetY]);
      align.applyMethod(rule, obj, ...offsets);
    });
  }

  return arrayAlignObject;
};

type ILayoutOptions = Partial<ILayoutConfig> & { children: AlignObject[] | ArrayAlignObject };

export function layoutRow(options: ILayoutOptions): ArrayAlignObject {
  return layoutChain({
    children: options.children,
    rules: [AlignMethod.RIGHT_TO, ...(options.rules ?? [])],
    offsetX: options.offsetX ?? 0,
    offsetY: options.offsetY ?? 0
  });
}

export function layoutColumn(options: ILayoutOptions): ArrayAlignObject {
  return layoutChain({
    children: options.children,
    rules: [AlignMethod.BOTTOM_TO, ...(options.rules ?? [])],
    offsetX: options.offsetX ?? 0,
    offsetY: options.offsetY ?? 0
  });
}
