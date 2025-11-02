import { ChildSceneProxy, ISceneProxyCreateArgs } from "../../src/scenes/ChildScene/ChildSceneProxy";
import TextStyle = Phaser.Types.GameObjects.Text.TextStyle;
import { IStory } from "../interfaces";

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

export const launchSceneAutoRunStory: IStory = {
  title: "child mainScene auto run",
  run: async (scene: Phaser.Scene) => {
    logScenes(scene.game, "before loadGameAssets");
    logScenes(scene.game, "before sceneProxy");

    const create = ({ scene }: ISceneProxyCreateArgs) => {
      const textStyle = {
        ...textStyle1,
      };
      const left = 0;
      const top = 0;
      scene.add.text(left, top, "Auto Runned Text 1", textStyle);

      scene.add.text(left, top + 100, "Auto Runned Text 2", textStyle);

      scene.add.text(
        left,
        top + 300,
        "All 2 Text must be cleared and restarted in storyBook",
        textStyle
      );
    };

    const sceneProxy = new ChildSceneProxy({
      mainScene: scene,
      childKey: "TestSceneProxy1",
      viewPort: {
        left: 64,
        right: 128,
        top: 64,
        bottom: 0,
      },
      isAutoRun: true,
      create,
    });

    logScenes(scene.game, "after sceneProxy");

    return () => {
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
