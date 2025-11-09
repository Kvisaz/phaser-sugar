import { TextRectangleComponent } from "../../src/components";
import { IStory } from "../interfaces";
import { cssColorToInt } from "../../src/color";
import { Align } from "../../src/layout/Align/Align";
import { AlignMethod, layoutColumn, layoutRow } from "../../src";

export const alignArrStory: IStory = {
  title: "Align Arr",
  run: async (scene: Phaser.Scene) => {

    const align = new Align();
    const sceneSize = scene.scale.gameSize;
    const anchor = new Phaser.GameObjects.Rectangle(scene, 0, 0,
      sceneSize.width / 2, sceneSize.height / 2, cssColorToInt("#4ca347"));
    scene.add.existing(anchor);
    align.anchorSceneScreen(scene).center(anchor);
    const destroyables: { destroy: () => void }[] = [];

    /*** test data **/
    const innerTestData: string[] = [
      "first", "second", "third", "fourth"
    ];

    const textObjects1 = [...innerTestData].map(alignMethod => {
      const testText = new TextRectangleComponent({
        scene, text: alignMethod, fontSize: 18, width: 150, height: 64
      });
      scene.add.existing(testText);
      destroyables.push(testText);
      return testText;
    });

    const textObjects2 = [...innerTestData].map(alignMethod => {
      const testText = new TextRectangleComponent({
        scene, text: alignMethod, fontSize: 18, width: 150, height: 64
      });
      scene.add.existing(testText);
      destroyables.push(testText);
      return testText;
    });

    const textObjects3 = [...innerTestData].map(alignMethod => {
      const testText = new TextRectangleComponent({
        scene, text: alignMethod, fontSize: 18, width: 150, height: 64
      });
      scene.add.existing(testText);
      destroyables.push(testText);
      return testText;
    });


    const textObjects4 = [...innerTestData].map(alignMethod => {
      const testText = new TextRectangleComponent({
        scene, text: alignMethod, fontSize: 18, width: 150, height: 64
      });
      scene.add.existing(testText);
      destroyables.push(testText);
      return testText;
    });


    align.anchorSceneScreen(scene)
      .center(
        layoutRow({
          nextOffsetX: 12,
          alignToAnchor: AlignMethod.TOP_IN,
          children: [
            layoutColumn({ children: textObjects1, nextOffsetY: i => i * 6 }),
            layoutColumn({ children: textObjects2, nextOffsetY: 23 }),
            layoutColumn({ children: textObjects3, nextOffsetY: i => i === 0 ? 0 : 32 }),
            layoutColumn({ children: textObjects4 })
          ]
        })
      );


    return () => {
      anchor.destroy();
      destroyables.forEach(obj => obj.destroy());
    };
  }
};
