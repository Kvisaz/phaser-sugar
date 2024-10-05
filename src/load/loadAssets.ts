/**
 * Loads assets in a Phaser scene and returns a Promise that resolves when the loading is complete.
 * An optional onProgress callback can be passed to track the progress of the asset loading.
 *
 * @param {Phaser.Scene} scene - The Phaser scene where assets will be loaded.
 * @param {(scene: Phaser.Scene) => void} loader - A function that triggers asset loading within the scene.
 * @param {(progress: number) => void} [onProgress] - Optional callback function to track loading progress. Receives a number between 0 and 1.
 * @returns {Promise<void>} A promise that resolves when all assets are fully loaded.
 */
export const loadAssets = async (
  scene: Phaser.Scene,
  loader: (scene: Phaser.Scene) => void,
  onProgress?: (progress: number) => void
): Promise<void> => {
  return new Promise<void>((resolve) => {
    loader(scene);

    // If onProgress is provided, listen to the progress event and call the callback with the progress value.
    if (onProgress) {
      scene.load.on(Phaser.Loader.Events.PROGRESS, (progress: number) => {
        onProgress(progress);
      });
    }

    // Resolve the promise when loading is complete.
    scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
      resolve();
    });

    // Start loading the assets.
    scene.load.start();
  });
};
