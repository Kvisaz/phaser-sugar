interface IProps {
  parentScene: Phaser.Scene;
  key: string;
  childScene: Phaser.Scene;
  data?: object;
}

export function launchScene({ parentScene, key, childScene, data }: IProps): () => void {
  const sceneManager = parentScene.scene;
  sceneManager.add(key, childScene, true, data);

  return () => {
    parentScene.scene.stop(key);
    parentScene.game.scene.remove(key);
  };
}
