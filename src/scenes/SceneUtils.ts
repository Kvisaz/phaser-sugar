type Callback = () => void;
type UpdateFunc = (time: number, dT: number) => void;


export const SceneUtils = {
  onUpdate(scene: Phaser.Scene, fn: UpdateFunc) {
    scene.events.on(Phaser.Scenes.Events.UPDATE, fn);
    return () => scene.events.off(Phaser.Scenes.Events.UPDATE, fn);
  },

  onBlur(scene: Phaser.Scene, fn: Callback) {
    scene.game.events.on(Phaser.Core.Events.BLUR, fn);
  },
  onFocus(scene: Phaser.Scene, fn: Callback) {
    scene.game.events.on(Phaser.Core.Events.FOCUS, fn);
  },
  onPause(scene: Phaser.Scene, fn: Callback) {
    scene.game.events.on(Phaser.Core.Events.PAUSE, fn);
  },
  onResume(scene: Phaser.Scene, fn: Callback) {
    scene.game.events.on(Phaser.Core.Events.RESUME, fn);
  }
};
