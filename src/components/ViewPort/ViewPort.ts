import { cssColorToInt } from "../../color";

interface IProps {
  /** where viewport will be live**/
  scene: Phaser.Scene;
  /** сцена для которой создается viewPort **/
  childKey: string;
  childScene: Phaser.Scene;
  /** Размеры**/
  width: number;
  height: number;
  /** свойства прямоугольника **/
  viewPortOptions?: Partial<IViewPortConfig>;
}

interface IViewPortConfig {
  fillColor: string;
  strokeColor: string;
  fillAlpha: number;
  strokeWidth: number;
}

const defaultConfig: IViewPortConfig = {
  fillColor: "#dedede",
  fillAlpha: 0,
  strokeColor: "#000000",
  strokeWidth: 1
};

/**
 * ViewPort - сцена, привязанная к размерам и позиции игрового объекта
 * Это позволяет создавать
 * - карты мира
 * - отдельные миры
 * - крутящиеся списки
 * и эффективно их позиционировать в родительской сцене
 *
 * Концепции
 *
 * 1. Родительская сцена - основная сцена, в которой создается ViewPort
 * 2. Child Scene - создается при создании ViewPort, добавляется к родительской
 * и уничтожается при его destroy (поэтому создавайте ViewPort редко и только тогда,
 * когда он нужен)
 * 3. Игровой объект ViewPort - Phaser.GameObjects.Rectangle - определяет позицию и размеры камеры
 * на Child Scene. Это означает, что перемещая ViewPort
 * - вы перемещаете фактически viewport этой камеры
 *
 *
 * Как использовать
 *
 * 1. Мини-карта
 * Child Scene должна проектироваться исходя из видимых размеров всей карты
 * В Child Scene следует установить camera.scrollX, camera.scrollY на центр видимости
 * - то есть центральную точку видимого мира
 *
 * Текущая проблема - при масштабировании камеры смещаются координаты
 */
export class ViewPort extends Phaser.GameObjects.Rectangle {
  private config: IViewPortConfig;
  private childSceneKey: string | undefined;

  constructor(props: IProps) {
    super(props.scene, 0, 0, props.width, props.height, 0);
    this.config = {
      ...defaultConfig,
      ...props.viewPortOptions
    };
    this.setFillStyle(cssColorToInt(this.config.fillColor), this.config.fillAlpha);
    this.setStrokeStyle(this.config.strokeWidth, cssColorToInt(this.config.strokeColor));

    this.addChildScene(props.childKey, props.childScene);
    this.updateLayout();
  }

  setPosition(x?: number, y?: number, z?: number, w?: number): this {
    super.setPosition(x, y, z, w);
    this.updateLayout();
    return this;
  }

  setScale(x?: number, y?: number): this {
    super.setScale(x, y);
    this.updateLayout();
    return this;
  }

  setRotation(angle?: number): this {
    super.setRotation(angle);
    this.updateLayout();
    return this;
  }

  public updateLayout() {
    const bounds = this.getBounds();
    const camera = this.childScene?.cameras.main;
    if(camera) {
      const cameraBounds = camera.getBounds();
      camera.setZoom(this.scale);
      camera.setViewport(
        bounds.left,
        bounds.top,
        bounds.width,
        bounds.height
      );
      camera.setScroll(cameraBounds.centerX, cameraBounds.centerY);
    }
  }

  get childScene(): Phaser.Scene | undefined {
    if (this.childSceneKey == null) return;
    return this.scene.scene.get(this.childSceneKey);
  }

  public addChildScene(key: string, scene: Phaser.Scene) {
    if (this.childSceneKey) {
      this.removeChildScene(this.childSceneKey);
    }
    this.childSceneKey = key;
    this.scene.scene.add(key, scene);
    this.scene.scene.launch(this.childSceneKey);
  }

  public removeChildScene(sceneKey: string) {
    try {
      this.scene.scene.remove(sceneKey);
    } catch (e) {
      console.warn("removeChildScene: scene not found");
      console.warn(e);
    }
  }

  destroy(fromScene?: boolean) {
    if (this.childSceneKey) {
      this.removeChildScene(this.childSceneKey);
    }
    super.destroy(fromScene);
  }
}
