import { AlignObject } from "../types";

export type ILayoutTarget = AlignObject;
export type ArrayAlignCallback = <T extends ILayoutTarget>(objects: T[], ...args: number[]) => T[]
