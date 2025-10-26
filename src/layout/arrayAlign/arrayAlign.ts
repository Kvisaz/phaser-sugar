import { makeChain } from "./makeChain";
import { AlignMethod } from "../Align/types";
import { ArrayAlignCallback } from "./types";

const row: ArrayAlignCallback = (objects, gap = 0) => makeChain(objects, { align: AlignMethod.RIGHT_TO, gap });
const column: ArrayAlignCallback = (objects, gap = 0) => makeChain(objects, { align: AlignMethod.BOTTOM_TO, gap });
const rowReverse: ArrayAlignCallback = (objects, gap = 0) => makeChain(objects, { align: AlignMethod.LEFT_TO, gap });
const columnReverse: ArrayAlignCallback = (objects, gap = 0) => makeChain(objects, { align: AlignMethod.TOP_TO, gap });


export const arrayAlign = {
  chain: makeChain,
  row,
  rowReverse,
  column,
  columnReverse
};
