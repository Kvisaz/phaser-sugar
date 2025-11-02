export interface AlignObject extends ISizeable, IPosition {
  setPosition(x: number, y: number): this;
}

export interface ISizeable {
  getBounds(): Phaser.Geom.Rectangle;
}


export type IBoundable = ISizeable;

export interface IPosition {
  x: number;
  y: number;
}
