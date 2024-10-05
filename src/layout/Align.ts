export type AlignObject =
  | Phaser.GameObjects.Container
  | Phaser.GameObjects.Image
  | Phaser.GameObjects.Text
  | Phaser.GameObjects.RenderTexture
  | Phaser.GameObjects.Shape
  | Phaser.GameObjects.TileSprite;

/** Align objects relative to the anchor with any origin **/
export class Align {
  private anchorItem: ISizeable | undefined;
  private static errorSetAnchorMessage = 'set anchor in Align first';

  constructor(anchorItem?: ISizeable) {
    if (anchorItem) this.anchorItem = anchorItem;
  }

  /**
   * set anchor for aligning
   */
  anchor(item: ISizeable): this {
    this.anchorItem = item;
    return this;
  }

  /**
   * screen align - dont work with camera moving
   */
  anchorScreen(width: number, height: number): this {
    return this.anchor({
      getBounds: () => new Phaser.Geom.Rectangle(0, 0, width, height),
    });
  }

  /**
   * screen align - dont work with camera moving
   */
  anchorSceneScreen(scene: Phaser.Scene): this {
    const { width, height } = scene.cameras.main;
    return this.anchorScreen(width, height);
  }

  center(item: AlignObject, oX = 0, oY = 0): this {
    return this.applyFormula(item, oX, oY, ({ aB, iB }) => ({
      x: aB.x + (aB.width - iB.width) / 2,
      y: aB.y + (aB.height - iB.height) / 2,
    }));
  }

  centerX(item: AlignObject, oX = 0): this {
    return this.applyFormula(item, oX, 0, ({ aB, iB }) => ({
      x: aB.x + (aB.width - iB.width) / 2,
      y: iB.y,
    }));
  }

  centerY(item: AlignObject, oY = 0): this {
    return this.applyFormula(item, 0, oY, ({ aB, iB }) => ({
      x: iB.x,
      y: aB.y + (aB.height - iB.height) / 2,
    }));
  }

  bottomIn(item: AlignObject, oY = 0): this {
    return this.applyFormula(item, 0, oY, ({ aB, iB }) => ({
      x: iB.x,
      y: aB.y + (aB.height - iB.height),
    }));
  }

  bottomTo(item: AlignObject, oY = 0): this {
    return this.applyFormula(item, 0, oY, ({ aB, iB }) => ({
      x: iB.x,
      y: aB.y + aB.height,
    }));
  }

  topIn(item: AlignObject, oY = 0): this {
    return this.applyFormula(item, 0, oY, ({ aB, iB }) => ({
      x: iB.x,
      y: aB.y,
    }));
  }

  topTo(item: AlignObject, oY = 0): this {
    return this.applyFormula(item, 0, oY, ({ aB, iB }) => ({
      x: iB.x,
      y: aB.y - iB.height,
    }));
  }

  rightIn(item: AlignObject, oX = 0): this {
    return this.applyFormula(item, oX, 0, ({ aB, iB }) => ({
      x: aB.x + (aB.width - iB.width),
      y: iB.y,
    }));
  }

  rightTo(item: AlignObject, oX = 0): this {
    return this.applyFormula(item, oX, 0, ({ aB, iB }) => ({
      x: aB.x + aB.width,
      y: iB.y,
    }));
  }

  leftIn(item: AlignObject, oX = 0): this {
    return this.applyFormula(item, oX, 0, ({ aB, iB }) => ({
      x: aB.x,
      y: iB.y,
    }));
  }

  leftTo(item: AlignObject, oX = 0): this {
    return this.applyFormula(item, oX, 0, ({ aB, iB }) => ({
      x: aB.x - iB.width,
      y: iB.y,
    }));
  }

  /**
   * setPosition - like setLeftTop
   */
  setPosition(item: AlignObject, left: number, top: number): this {
    Align.setLeftTop(item, left, top);
    return this;
  }

  /**
   * setLeftTop - place object with any origin
   */
  static setLeftTop(item: AlignObject, left: number, top: number) {
    const iB = item.getBounds();
    const dX = left - iB.left;
    const dY = top - iB.top;
    const x = item.x + dX;
    const y = item.y + dY;
    item.setPosition(x, y);
  }

  /** make row align **/
  row(items: AlignObject[], dX: number): this {
    this.anchor(items[0]);
    for (let i = 1; i < items.length; i++) {
      const next = items[i];
      this.rightTo(next, dX);
      this.anchor(next);
    }
    return this;
  }

  /** make column align **/
  column(items: AlignObject[], dY: number): this {
    this.anchor(items[0]);
    for (let i = 1; i < items.length; i++) {
      const next = items[i];
      this.bottomTo(next, dY);
      this.anchor(next);
    }
    return this;
  }

  private applyFormula(item: AlignObject, oX: number, oY: number, formula: IAlignFormula): this {
    const { anchorItem } = this;
    if (anchorItem == null) {
      console.warn(Align.errorSetAnchorMessage);
      return this;
    }
    if (item == null) {
      console.warn(Align.errorSetAnchorMessage);
      return this;
    }

    const { x, y } = formula(this.getBounds(item, anchorItem));
    this.setPosition(item, x + oX, y + oY);

    return this;
  }

  private getBounds(item: ISizeable, anchor: ISizeable): IBoundsPair {
    return {
      aB: anchor?.getBounds(),
      iB: item?.getBounds(),
    };
  }
}

interface ISizeable {
  getBounds(): Phaser.Geom.Rectangle;
}

interface IBoundsPair {
  aB: Phaser.Geom.Rectangle;
  iB: Phaser.Geom.Rectangle;
}

interface IPosition {
  x: number;
  y: number;
}

interface IAlignFormula {
  (bounds: IBoundsPair): IPosition;
}
