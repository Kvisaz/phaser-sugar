import { TextRectangleComponent } from "../../components";
import { IStory } from "../../../storybook/interfaces";
import { cssColorToInt } from "../../color";
import { Layout } from "./Layout";


export const layoutStory: IStory = {
  title: "Layout",
  run: async (scene: Phaser.Scene) => {

    const sceneLayout = new Layout({ layoutArea: scene });

    const sceneSize = scene.scale.gameSize;
    const rectangle = new Phaser.GameObjects.Rectangle(scene, 0, 0,
      sceneSize.width / 2, sceneSize.height / 2, cssColorToInt("#4ca347"));
    scene.add.existing(rectangle);
    const bgLayout = new Layout({ layoutArea: rectangle });


    /*** test data **/
    const topSidebarTexts = createTexts(scene, [
      "top1", "top2", "top3", "top4"
    ]);
    const leftSidebarTexts = createTexts(scene, [
      "left1", "left 2", "left 3", "left 4"
    ]);

    const leftInnerSidebarTexts = createTexts(scene, [
      "in-left-1", "in-left-2", "in-left-3"
    ]);

    const bottomInnerSidebarTexts = createTexts(scene, [
      "in-bot-1", "in-bot-2", "in-bot-3"
    ]);


    const layoutUpdate = () => {
      sceneLayout.center([rectangle]);
      sceneLayout.sidebarTop(topSidebarTexts);
      sceneLayout.sidebarLeft(leftSidebarTexts);

      bgLayout.sidebarLeft(leftInnerSidebarTexts);
      bgLayout.sidebarBottom(bottomInnerSidebarTexts);
    };
    layoutUpdate();

    const bgLayoutUpdate = () => {
      bgLayout.sidebarLeft(leftInnerSidebarTexts);
      bgLayout.sidebarBottom(bottomInnerSidebarTexts);
    };


    const operations = [
      () => {
        console.log("run first operation");
        rectangle.setPosition(rectangle.x - 100, rectangle.y - 100);
        bgLayout.resize();
        bgLayoutUpdate();
      },
      () => {
        console.log("run second operation");
        rectangle.setPosition(rectangle.x + 300, rectangle.y + 300);
        bgLayout.resize();
        bgLayoutUpdate();
      },
      () => {
        console.log("run 3 operation");
        layoutUpdate();
        bgLayout.resize();
      }
    ];

    let index = -1;
    const runNextOperation = () => {
      index++;
      if (index >= operations.length) index = 0;
      const operation = operations[index];
      console.log(`runNextOperation: ${index} of ${operations.length}`);
      operation();
    };


    rectangle.setInteractive({
      useHandCursor: true
    });
    rectangle.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      runNextOperation();
    });

    return () => {
      rectangle.destroy();
      [
        ...topSidebarTexts,
        ...leftSidebarTexts,
        ...leftInnerSidebarTexts,
        ...bottomInnerSidebarTexts
      ].forEach(textObject => textObject.destroy());
    };
  }
};


function createTexts(scene: Phaser.Scene, texts: string[]) {
  return [...texts].map(text => {
    const testText = new TextRectangleComponent({
      scene, text, fontSize: 18, width: 150, height: 64
    });
    scene.add.existing(testText);
    return testText;
  });
}
