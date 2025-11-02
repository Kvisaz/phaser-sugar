import { Align } from "../Align/Align";
import { IBoundable } from "../types";
import { AlignMethod } from "../Align/types";
import { ILayoutTarget } from "./types";

interface IRowConfig {
  gap: number;
  align: AlignMethod;
  anchor?: IBoundable;
}

const defaultRowConfig: IRowConfig = {
  gap: 0,
  align: AlignMethod.RIGHT_TO
};

let rowAlign = new Align();
export const makeChain = <T extends ILayoutTarget>(objects: T[], options?: Partial<IRowConfig>): T[] => {
  /** нечего выравнивать **/
  if (objects.length === 0) return objects;

  const config: IRowConfig = { ...defaultRowConfig, ...options };
  let currentAnchor: IBoundable = config.anchor ?? objects[0];

  /** нет анкора (или нечего выранивать) **/
  if (currentAnchor == null) return objects;

  rowAlign.anchor(currentAnchor);
  const { gap, align } = config;

  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i];
    rowAlign.applyMethod(align, obj, gap);
    rowAlign.anchor(obj);
  }

  return objects;
};

