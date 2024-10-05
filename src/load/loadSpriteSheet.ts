import { loadAssets } from "./loadAssets";

interface IProps {
  scene: Phaser.Scene;
  url: string;
  textureName: string;
  frameWidth: number;
  frameHeight: number;
}

export const loadSpriteSheet = async ({ scene, textureName, frameHeight, frameWidth, url }: IProps): Promise<void> => {
  return loadAssets(scene, scene => {
    scene.load.spritesheet(textureName, url, {
      frameWidth,
      frameHeight
    });
  }, progress => {
    console.log('progress', progress);
  });
};
