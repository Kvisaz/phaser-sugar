interface IProps {
  parentScene: Phaser.Scene;
  key: string;
  childScene: Phaser.Scene;
}

export function launchSceneWithRemoveCallback({
  parentScene,
  key,
  childScene,
}: IProps): () => void {
  const sceneManager = parentScene.scene;
  console.log("sceneManager.get(key)", sceneManager.get(key));
  sceneManager.add(key, childScene, true);

  return () => {
    console.log("run unsub");
    parentScene.scene.stop(key);
    parentScene.game.scene.remove(key);
  };
}
