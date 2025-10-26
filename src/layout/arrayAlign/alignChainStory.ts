import { TextRectangleComponent } from "../../components";
import { IStory } from "../../../storybook/interfaces";
import { cssColorToInt } from "../../color";
import { AlignMethod } from "../Align/types";
import { Align } from "../Align/Align";
import { arrayAlign } from "./arrayAlign";

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


    return () => {
      anchor.destroy();
      textObjects.forEach(textObject => textObject.destroy());
    };
  }
};
