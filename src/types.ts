export interface ISizeable {
  getBounds(): Phaser.Geom.Rectangle;
}

export interface IPosition {
  x: number;
  y: number;
}

export interface IChild {
  parentContainer?: Phaser.GameObjects.Container & IChild ;
}
