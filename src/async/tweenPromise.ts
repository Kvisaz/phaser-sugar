export interface ITweenPromiseProps {
  config: Phaser.Types.Tweens.TweenBuilderConfig;
  scene: Phaser.Scene;
}

/**
 * Creates a Phaser tween and returns a Promise that resolves when the tween completes.
 * This allows for asynchronous handling of tweens, useful for chaining or awaiting animations.
 *
 * @param {ITweenPromiseProps} props - Object containing the tween configuration and the scene.
 * @param {Phaser.Types.Tweens.TweenBuilderConfig} props.config - The configuration object for the tween.
 * @param {Phaser.Scene} props.scene - The Phaser scene in which the tween will be added.
 * @returns {Promise<void>} A promise that resolves when the tween completes.
 */
export function tweenPromise({ config, scene }: ITweenPromiseProps): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const oldOnComplete = config.onComplete;
    config.onComplete = (tween: Phaser.Tweens.Tween,
                         targets: unknown[],
                         ...param: unknown[]) => {
      oldOnComplete?.(tween, targets, ...param);
      resolve();
    };
    scene.tweens.add(config);
  });
}
