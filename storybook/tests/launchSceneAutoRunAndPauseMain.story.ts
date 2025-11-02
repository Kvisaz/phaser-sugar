import { ChildSceneProxy, ISceneProxyCreateArgs } from "../../src/scenes/ChildScene/ChildSceneProxy";
import TextStyle = Phaser.Types.GameObjects.Text.TextStyle;
import POINTER_DOWN = Phaser.Input.Events.POINTER_DOWN;
import { SceneUtils } from "../../src/scenes/SceneUtils";
import { IStory } from "../interfaces";
import { cssColorToInt } from "../../src/color";

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

export const launchSceneAutoRunAndPauseMainStory: IStory = {
  title: "child mainScene pause main",
  run: async (scene: Phaser.Scene) => {
    logScenes(scene.game, "before loadGameAssets");
    logScenes(scene.game, "before sceneProxy");

    const destroyMain = addMainScene(scene);

    const sceneProxy = new ChildSceneProxy({
      mainScene: scene,
      childKey: "TestSceneProxy1",
      viewPort: {
        left: 0,
        right: 128,
        top: 64,
        bottom: 0,
      },
      isAutoRun: true,
      camera: {
        scale: 0.5
      },
      create: createChildScene,
    });

    logScenes(scene.game, "after sceneProxy");

    return () => {
      destroyMain();
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

function addMainScene(scene: Phaser.Scene) {

  const left = 0;
  const top = 0;

  const text1 = scene.add.text(left, top + 100, "Main Scene Text 1", { fontSize: "32px" });

  const text2 = scene.add.text(left, top + 200, "Main Scene Text 2", { fontSize: "32px" });

  const rotatingText1 = scene.add.text(
    left,
    top + 300,
    "All 2 Text must be cleared and restarted in storyBook",
    {
      fontSize: "32px",
      align: "center",
      wordWrap: {
        width: 400,
      },
    }
  );

  const textStyle = textStyle2;

  const rotatingText2 = scene.add.text(left + 100, top + 500, "Main Scene Rotating Text", {
    ...textStyle,
    align: "center",
    wordWrap: {
      width: 200,
    },
  });
  rotatingText1.setOrigin(0.5, 0.5);
  rotatingText2.setOrigin(0.5, 0.5);

  const unSubUpdate = SceneUtils.onUpdate(scene, (time, delta) => {
    rotatingText1.rotation += 0.003 * delta;
    rotatingText2.rotation -= 0.003 * delta;
  });

  return () => {
    unSubUpdate();
    text1.destroy();
    text2.destroy();
    rotatingText1.destroy();
    rotatingText2.destroy();
  };
}

function createChildScene({ scene, sceneProxy }: ISceneProxyCreateArgs) {
  const left = 0;
  const top = 0;


  const rect = new Phaser.GameObjects.Rectangle(scene, left, top, 256, 128, cssColorToInt('#016065')).setOrigin(0, 0);
  scene.add.existing(rect);

  const textStyle = textStyle1;

  let isMainScenePaused = false;
  scene.input.on(POINTER_DOWN, () => {
    if (isMainScenePaused) {
      sceneProxy.resumeParentScene();
    } else {
      sceneProxy.pauseParentScene();
    }
    isMainScenePaused = !isMainScenePaused;
  });

  scene.add.text(left, top + 100, "Child Scene Text 1", { ...textStyle, fontSize: "32px" });

  scene.add.text(left, top + 200, "Click on me to start and pause\nmain mainScene", {
    ...textStyle,
    fontSize: "32px",
  });

  scene.add.text(left, top + 350, "Main Scene must be paused", {
    ...textStyle,
    fontSize: "32px",
    wordWrap: {
      width: 400,
    },
  });
}
