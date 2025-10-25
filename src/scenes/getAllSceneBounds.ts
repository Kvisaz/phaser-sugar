/**
 * Возвращает прямоугольник, охватывающий все GameObject'ы в сцене.
 * Если сцена пуста — возвращает прямоугольник (0, 0, 0, 0).
 */
export function getAllSceneBounds(scene: Phaser.Scene): Phaser.Geom.Rectangle {
  let allBounds = new Phaser.Geom.Rectangle();
  let initialized = false;

  scene.children.each((child: Phaser.GameObjects.GameObject) => {
    // Пропускаем объекты без геометрии (например, контейнеры без размеров)
    const bounds = (child as any)?.getBounds?.();
    if (!bounds) return;

    if (!initialized) {
      allBounds = Phaser.Geom.Rectangle.Clone(bounds);
      initialized = true;
    } else {
      allBounds = Phaser.Geom.Rectangle.Union(allBounds, bounds);
    }
  });

  // Если нет ни одного объекта — вернуть нулевой прямоугольник
  return initialized ? allBounds : new Phaser.Geom.Rectangle(0, 0, 0, 0);
}
