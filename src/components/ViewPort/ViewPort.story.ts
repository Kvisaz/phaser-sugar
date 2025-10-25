import { IStory } from "../../../storybook/interfaces";
import { Align } from "../../layout";
import { getCanvasSize } from "../../scenes/ChildScene/utils";
import { cssColorToInt } from "../../color";
import { TextRectangleComponent } from "../TextRectangle";
import { ViewPort } from "./ViewPort";

export const viewPortStory: IStory = {
  title: "View Port Story",
  run: async (scene: Phaser.Scene) => {
    const align = new Align();
    align.anchorSceneScreen(scene);

    const childKey = "viewPortStory-ChildSceneTest";
    const viewPort = new ViewPort({
      scene,
      childKey,
      childScene: new ChildSceneTest(childKey),
      width: 640,
      height: 480
    });
    scene.add.existing(viewPort);

    return () => {
      viewPort.destroy();
    };
  }
};


class ChildSceneTest extends Phaser.Scene {
  constructor(key: string) {
    super({ key });
  }

  init(){
    [
      Phaser.Scenes.Events.DESTROY,
      Phaser.Scenes.Events.PAUSE,
      Phaser.Scenes.Events.RESUME,
      Phaser.Scenes.Events.SHUTDOWN,
    ].forEach(event => {
      this.events.once(event, () => {
        console.log(`ChildSceneTest - ${event}`);
      });
    })

  }

  create() {

    console.log('ChildSceneTest create() called');

    const scene = this;

    const align = new Align().anchorSceneScreen(scene);
    const canvasSize = getCanvasSize(scene);
    const bg = new Phaser.GameObjects.Rectangle(scene, 0, 0, canvasSize.width, canvasSize.height, cssColorToInt("#30af30"));
    bg.setStrokeStyle(2, cssColorToInt("#000000"));
    scene.add.existing(bg);

    align.center(bg);
    align.anchor(bg);

    const textProps = {
      scene, text: "topIn,leftIn", fontSize: 32, textPaddingX: 16, textPaddingY: 16
    };

    const texts = [
      "topIn,leftIn",
      "bottomIn, rightIn",
      "center"
    ].map(text => {
      const component = new TextRectangleComponent({
        ...textProps, text
      });
      scene.add.existing(component);

      const operations = text.split(",").map(op => op.trim());
      operations.forEach(operation => {
        // @ts-ignore
        align[operation](component);
      });
      return component;
    });
  }
}
