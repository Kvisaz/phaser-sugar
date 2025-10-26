import { AlignObject } from "../Align/Align";
import { IBoundable } from "../types";

export type ILayoutTarget = AlignObject & IBoundable;
export type ArrayAlignCallback = <T extends ILayoutTarget>(objects: T[], ...args: number[]) => T[]
