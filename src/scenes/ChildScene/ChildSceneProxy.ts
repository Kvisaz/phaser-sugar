import { getCanvasSize, IViewPort } from "./utils";

export interface ISceneProxyCreateArgs {
  scene: Phaser.Scene;
  parentScene: Phaser.Scene;
  sceneProxy: ChildSceneProxy;
}
export type SceneProxyCreateCallback = (args: ISceneProxyCreateArgs) => void;

interface IProps {
  mainScene: Phaser.Scene;
  childKey: string;
  viewPort?: IViewPort;
  create?: SceneProxyCreateCallback;
  isAutoRun?: boolean;
  camera?: {
    scale?: number;
  }
}

/**
 * Беспредельно удобный способ добавлять новые сцены
 * как объекты к главной
 * просто создай ChildSceneProxy
 * а затем удали при вызове диалогов и прочего
 * можно ставить на паузу и возобновлять!
 */
export class ChildSceneProxy extends Phaser.GameObjects.Rectangle {
  private readonly childScene: Phaser.Scene;
  private isRunning = false;
  constructor(private props: IProps) {
    super(props.mainScene, 0, 0, 0, 0, 0);
    this.childScene = new Phaser.Scene({ key: props.childKey });
    props.mainScene.scene.add(props.childKey, this.childScene);

    const { isAutoRun, create } = props;
    if (isAutoRun) {
      this.run();
      if (create) {
        this.addCreate(create);
      }
    }
  }

  run() {
    if (this.isRunning) return;
    const { viewPort } = this.props;
    if (viewPort) {
      const canvasSize = getCanvasSize(this.childScene);
      this.childScene.cameras.main.setViewport(
        viewPort.left,
        viewPort.top,
        canvasSize.width - viewPort.left - viewPort.right,
        canvasSize.height - viewPort.top - viewPort.bottom
      );
    }

    const scale = this.props.camera?.scale;
    if (scale) {
      this.childScene.cameras.main.setZoom(scale);
    }


    this.scene.scene.launch(this.props.childKey);
    this.isRunning = true;
  }

  addCreate(createFunc: SceneProxyCreateCallback) {
    createFunc({
      scene: this.childScene,
      parentScene: this.scene,
      sceneProxy: this,
    });
  }

  destroy() {
    this.scene.scene.remove(this.props.childKey);
  }

  pause() {
    this.childScene.scene.pause();
  }

  pauseParentScene(){
    this.scene.scene.pause();
  }

  resume() {
    this.childScene.scene.resume();
  }

  resumeParentScene(){
    this.scene.scene.resume();
  }
}
