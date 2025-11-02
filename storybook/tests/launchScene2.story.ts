import { ChildSceneProxy } from "../../src/scenes/ChildScene/ChildSceneProxy";
import TextStyle = Phaser.Types.GameObjects.Text.TextStyle;
import { SceneUtils } from "../../src/scenes/SceneUtils";
import { IStory } from "../interfaces";
import { Align } from "../../src/layout";

const textStyle1: TextStyle = {
  fontSize: "32px",
  color: "lime",
  wordWrap: {
    width: 400,
  },
};

const textStyle2: TextStyle = {
  fontSize: "32px",
  color: "orange",
  wordWrap: {
    width: 400,
  },
};

export const launchSceneStory2: IStory = {
  title: "launch child mainScene",
  run: async (scene: Phaser.Scene) => {
    logScenes(scene.game, "before loadGameAssets");
    logScenes(scene.game, "before sceneProxy");
    const align = new Align();
    const sceneProxy = new ChildSceneProxy({
      mainScene: scene,
      childKey: "TestSceneProxy1",
      viewPort: {
        left: 64,
        right: 128,
        top: 64,
        bottom: 0,
      },
    });
    sceneProxy.run();
    sceneProxy.addCreate(({ scene: childScene2 }) => {
      const textStyle = {
        ...textStyle1,
      };
      const left = 0;
      const top = 0;
      childScene2.add.text(left, top, "Parent 2 Text", textStyle);

      childScene2.add.text(left, top + 100, "Child Scene 2 Text", textStyle);

      childScene2.add.text(
        left,
        top + 300,
        "All 2 Text must be cleared and restarted in storyBook",
        textStyle
      );
    });
    logScenes(scene.game, "after sceneProxy");

    const sceneProxy2 = new ChildSceneProxy({
      mainScene: scene,
      childKey: "TestSceneProxy2",
      viewPort: {
        left: 512,
        right: 0,
        top: 128,
        bottom: 0,
      },
    });
    sceneProxy2.run();
    sceneProxy2.addCreate(({ scene: childScene }) => {
      const textStyle = {
        ...textStyle2,
      };

      const left = 0;
      const top = 0;
      childScene.add.text(left, top, "Parent 2 Text", textStyle);

      const rotatingText = childScene.add.text(left, top + 100, "Child Scene 2 Text", textStyle);
      rotatingText.setOrigin(0.5, 0.5);
      Align.setLeftTop(rotatingText, left, top + 100);

      childScene.add.text(
        left,
        top + 300,
        "All 2 Text must be cleared and restarted in storyBook",
        textStyle
      );

      SceneUtils.onUpdate(childScene, (time, delta) => {
        rotatingText.rotation += 0.003 * delta;
      });
    });
    logScenes(scene.game, "after sceneProxy 2");

    return () => {
      sceneProxy.destroy();
      sceneProxy2.destroy();
      logScenes(scene.game, "after destroy");
    };
  },
};

function logScenes(game: Phaser.Game, ...args: unknown[]) {
  if (args) console.log(...args);
  console.log(`scenes amount:  ${game.scene.getScenes(false).length}`);
  console.log(`scenes:`, game.scene.getScenes(false));
}
