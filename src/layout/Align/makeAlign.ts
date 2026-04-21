import { Align } from "./Align";

const align = new Align();

/** Использовать один инстанс Align, убрать ссылку после завершения работы **/
export function makeAlign(alignFn: (align: Align) => void) {
  try {
    alignFn(align);
  } catch (e) {
    console.warn(e);
  } finally {
    align.clearAnchor();
  }
}
