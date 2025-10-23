export function getCanvasSize(scene: Phaser.Scene): {
  width: number;
  height: number;
} {
  return {
    width: scene.game.canvas.width,
    height: scene.game.canvas.height
  }
}

export interface IViewPort {
  left: number;
  top: number;
  right: number;
  bottom: number;
}
