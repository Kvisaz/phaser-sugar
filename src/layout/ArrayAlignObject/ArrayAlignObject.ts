import { getArrayBounds } from "../../gameObjects";
import { AlignObject } from "../types";


/**
 * Вычисляет размеры объектов на данный момент времени
 * если они изменятся вызывай новый или updateBounds
 * */
export class ArrayAlignObject implements AlignObject {
  type = "ArrayAlignObject";

  constructor(private objects: AlignObject[]) {
  }

  all(): AlignObject[] {
    return this.objects;
  }

  moveAll(dX: number, dY: number): this {
    this.objects.forEach(o => o.setPosition(o.x + dX, o.y + dY));
    if (this._bounds) {
      Phaser.Geom.Rectangle.Offset(this._bounds, dX, dY);
    }
    return this;
  }

  /** Сдвигает все объекты так, чтобы левый верхний объект получил x, y **/
  setPosition(x: number, y: number): this {
    const bounds = this.getBounds();
    return this.moveAll(x - bounds.x, y - bounds.y);
  }

  private _bounds: Phaser.Geom.Rectangle | undefined;

  getBounds(): Phaser.Geom.Rectangle {
    if (this._bounds) return this._bounds;
    return this.updateBounds();
  }

  updateBounds(): Phaser.Geom.Rectangle {
    this._bounds = getArrayBounds(this.objects);
    return this._bounds;
  }

  set x(value: number) {
    const b = this.getBounds();
    this.moveAll(value - b.x, 0);
  }

  get x(): number {
    return this.getBounds().x;
  }

  set y(value: number) {
    const b = this.getBounds();
    this.moveAll(0, value - b.y);
  }

  get y(): number {
    return this.getBounds().y;
  }
}

export function isArrayAlignObject(t: unknown): t is ArrayAlignObject {
  return (t as ArrayAlignObject).type === "ArrayAlignObject";
}

export function proofArrayAlignObject(t: unknown): ArrayAlignObject | undefined {
  if (isArrayAlignObject(t)) return t;
  return undefined;
}
