import { TextRectangleComponent } from "../../src/components";
import { IStory } from "../interfaces";
import { cssColorToInt } from "../../src/color";
import { AlignMethod } from "../../src/layout/Align/types";
import { Align } from "../../src/layout/Align/Align";
import { arrayAlign } from "../../src/layout/arrayAlign/arrayAlign";

export const alignChainStory: IStory = {
  title: "Align Chains",
  run: async (scene: Phaser.Scene) => {

    const align = new Align();
    const sceneSize = scene.scale.gameSize;
    const anchor = new Phaser.GameObjects.Rectangle(scene, 0, 0,
      sceneSize.width / 2, sceneSize.height / 2, cssColorToInt("#4ca347"));
    scene.add.existing(anchor);
    align.anchorSceneScreen(scene).center(anchor);

    /*** test data **/
    const innerTestData: string[] = [
      'first', 'second', 'third', 'fourth'
    ]

    const textObjects = [...innerTestData].map(alignMethod => {
      const testText = new TextRectangleComponent({
        scene, text: alignMethod, fontSize: 18, width: 150, height: 64
      });
      scene.add.existing(testText);
      return testText;
    });

    arrayAlign.row(textObjects, 23);
    align.anchorSceneScreen(scene)
      .center(arrayAlign.alignObject(textObjects));


    return () => {
      anchor.destroy();
      textObjects.forEach(textObject => textObject.destroy());
    };
  }
};
