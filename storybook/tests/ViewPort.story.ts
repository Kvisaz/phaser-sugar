import { IStory } from "../interfaces";
import { Align } from "../../src/layout";
import { getCanvasSize } from "../../src/scenes/ChildScene/utils";
import { cssColorToInt } from "../../src/color";
import { TextRectangleComponent } from "../../src/components/TextRectangle";
import { ViewPort } from "../../src/components/ViewPort/ViewPort";
import { delay, tweenPromise } from "../../src/async";

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
      height: 320,
      viewPortOptions: {
        fillColor: "#2a982a",
        fillAlpha: 0.2,
        autoCenter: true
      }
    });
    scene.add.existing(viewPort);

    align.center(viewPort);

    await delay(2000);
    align.leftIn(viewPort).topIn(viewPort);
    const toBounds = viewPort.getBounds();
    align.center(viewPort);
    await tweenPromise({
      scene,
      config: {
        targets: viewPort,
        props: {
          x: toBounds.left + toBounds.width/2,
          y: toBounds.top + toBounds.height/2
        },
        duration: 400,
        onUpdate: ()=>{
          viewPort.updateLayout();
        }
      }
    });

    await delay(2000);
    viewPort.setScale(0.5);

    return () => {
      viewPort.destroy();
    };
  }
};


class ChildSceneTest extends Phaser.Scene {
  constructor(key: string) {
    super({ key });
  }

  init() {
    [
      Phaser.Scenes.Events.DESTROY,
      Phaser.Scenes.Events.PAUSE,
      Phaser.Scenes.Events.RESUME,
      Phaser.Scenes.Events.SHUTDOWN
    ].forEach(event => {
      this.events.once(event, () => {
        console.log(`ChildSceneTest - ${event}`);
      });
    });

  }

  create() {

    console.log("ChildSceneTest create() called");

    const scene = this;

    const align = new Align().anchorSceneScreen(scene);
    const canvasSize = getCanvasSize(scene);
    // const width = canvasSize.width; const height = canvasSize.height;
    const width = 640;
    const height = 320;
    const bg = new Phaser.GameObjects.Rectangle(scene, 0, 0, width, height, cssColorToInt("#30af30"));
    bg.setStrokeStyle(2, cssColorToInt("#000000"));
    scene.add.existing(bg);

    align.leftIn(bg).topIn(bg);
    scene.cameras.main.setScroll(0);
    align.anchor(bg);

    /** центрируем на карте **/
    // this.cameras.main.startFollow(bg);

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
