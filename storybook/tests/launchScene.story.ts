import { launchSceneWithRemoveCallback } from "../../src/scenes/ChildScene/launchScene";
import { ChildSceneProxy } from "../../src/scenes/ChildScene/ChildSceneProxy";
import { getCanvasSize } from "../../src/scenes/ChildScene/utils";
import { IStory } from "../interfaces";
import { delay } from "../../src/async";

class TestScene extends Phaser.Scene {
  private text: Phaser.GameObjects.Text | undefined;
  constructor(key: string) {
    super({ key });
  }

  create() {
    const scene = this;
    this.text = scene.add.text(100, 200, "Child Scene Text", { fontSize: "32px" });

    scene.add.text(100, 100, "Parent Text", { fontSize: "32px" });

    scene.add.text(100, 400, "All Text must be cleared and restarted in storyBook", {
      fontSize: "32px",
      wordWrap: {
        width: 400,
      },
    });
  }

  update(time: number, delta: number) {
    this.text!.rotation += 0.01 * delta;
  }
}

export const launchSceneStory: IStory = {
  title: "launch child with func",
  run: async (scene: Phaser.Scene) => {
    logScenes(scene.game, "before loadGameAssets");
    const testSceneUnSub = launchSceneWithRemoveCallback({
      parentScene: scene,
      key: "test",
      childScene: new TestScene("test"),
    });

    logScenes(scene.game, "before sceneProxy");
    const sceneProxy = new ChildSceneProxy({
      mainScene: scene,
      childKey: "TestScene2",
    });

    logScenes(scene.game, "after sceneProxy");
    await delay(100);
    sceneProxy.run();
    sceneProxy.addCreate(({ scene: childScene2 }) => {
      const canvasSize = getCanvasSize(childScene2);
      childScene2.cameras.main.setViewport(
        canvasSize.width / 2,
        0,
        canvasSize.width / 2,
        canvasSize.height
      );
      childScene2.add.text(100, 200, "Child Scene 2 Text", { fontSize: "32px" });

      childScene2.add.text(100, 100, "Parent 2 Text", { fontSize: "32px" });

      childScene2.add.text(100, 400, "All 2 Text must be cleared and restarted in storyBook", {
        fontSize: "32px",
        wordWrap: {
          width: 400,
        },
      });
    });

    return () => {
      testSceneUnSub();
      sceneProxy.destroy();
      logScenes(scene.game, "after destroy");
    };
  },
};

function logScenes(game: Phaser.Game, ...args: unknown[]) {
  if (args) console.log(...args);
  console.log(`scenes amount:  ${game.scene.getScenes(false).length}`);
  console.log(`scenes:`, game.scene.getScenes(false));
}
