export type LayoutArea = Phaser.Scene | Phaser.Geom.Rectangle | { getBounds: () => Phaser.Geom.Rectangle } | {
  width: number,
  height: number
};
