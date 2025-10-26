import { ILayoutTarget, makeChain } from "./makeChain";
import { AlignMethod } from "../Align/types";

export const arrayAlign = {
  chain: makeChain,
  row: <T extends ILayoutTarget>(objects: T[], gap = 0) => makeChain(objects, { align: AlignMethod.RIGHT_TO, gap }),
  rowReverse: <T extends ILayoutTarget>(objects: T[], gap = 0) => makeChain(objects, {
    align: AlignMethod.LEFT_TO,
    gap
  }),
  column: <T extends ILayoutTarget>(objects: T[], gap = 0) => makeChain(objects, {
    align: AlignMethod.BOTTOM_TO,
    gap
  }),
  columnReverse: <T extends ILayoutTarget>(objects: T[], gap = 0) => makeChain(objects, {
    align: AlignMethod.TOP_TO,
    gap
  })
};
