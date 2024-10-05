import { IStory } from "../../../storybook/interfaces";
import { Align } from "../../layout";
import { TextRectangleComponent } from "./TextRectangle";

export const textRectangleStory: IStory = {
  title: "TextRectangle",
  run: async (scene: Phaser.Scene) => {

    const rect1 = new TextRectangleComponent({
      scene,
      text: "Hello World"
    });
    scene.add.existing(rect1);

    Align.setLeftTop(rect1, 10, 10);

    return () => {
      rect1.destroy();
    };
  }
};
