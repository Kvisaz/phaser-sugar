import { Align } from "../../src/layout/Align/Align";
import { TextRectangleComponent } from "../../src/components";
import { IStory } from "../interfaces";
import { cssColorToInt } from "../../src/color";

export const alignStory: IStory = {
  title: "Align Tests",
  run: async (scene: Phaser.Scene) => {

    const align = new Align();
    const sceneSize = scene.scale.gameSize;
    const anchor = new Phaser.GameObjects.Rectangle(scene, 0, 0,
      sceneSize.width / 2, sceneSize.height / 2, cssColorToInt("#4ca347"));
    scene.add.existing(anchor);
    align.anchorSceneScreen(scene).center(anchor);

    /*** test data **/
    type TestData = { text: string }
    const innerTestData: TestData[] =
      [
        { text: "leftIn,topIn" },
        { text: "leftIn,centerY" },
        { text: "leftIn,bottomIn" },
        { text: "centerX,bottomIn" },
        { text: "rightIn,bottomIn" },
        { text: "rightIn,centerY" },
        { text: "rightIn,topIn" },
        { text: "centerX,topIn" },
        { text: "center" }
      ];

    const outerTestData: TestData[] =
      [
        { text: "leftTo,topIn" },
        { text: "leftTo,centerY" },
        { text: "leftTo,bottomIn" },
        { text: "leftIn,bottomTo" },
        { text: "centerX,bottomTo" },
        { text: "rightIn,bottomTo" },
        { text: "rightTo,bottomIn" },
        { text: "rightTo,centerY" },
        { text: "rightTo,topIn" },
        { text: "leftIn,topTo" },
        { text: "centerX,topTo" },
        { text: "rightIn,topTo" },
        { text: "center" }
      ];

    const textObjects = [...innerTestData, ...outerTestData].map(testData => {
      const operations = testData.text.split(",").map(op => op.trim());
      const testText = new TextRectangleComponent({
        scene, text: testData.text, fontSize: 18, width: 150, height: 64
      });
      scene.add.existing(testText);
      align.anchor(anchor);
      operations.forEach(operation => {
        // @ts-ignore
        align[operation](testText);
      });
      return testText;
    });


    return () => {
      anchor.destroy();
      textObjects.forEach(textObject => textObject.destroy());
    };
  }
};
