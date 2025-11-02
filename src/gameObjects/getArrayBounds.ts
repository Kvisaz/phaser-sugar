interface IBoundable {
  getBounds(): Phaser.Geom.Rectangle;
}

/**
 * Returns a rectangle that fully contains all objects in the array.
 *
 * @param objects - Array of objects implementing IBoundable (each has getBounds()).
 * @param output - Optional rectangle to write the result into (to avoid allocations).
 * @returns A Phaser.Geom.Rectangle representing the union of all bounds.
 */
export const getArrayBounds = <T extends IBoundable>(
  objects: T[],
  output: Phaser.Geom.Rectangle = new Phaser.Geom.Rectangle()
): Phaser.Geom.Rectangle => {
  if (objects.length === 0) {
    return output.setEmpty(); // clear the output rect
  }

  const firstBounds = objects[0].getBounds();
  output.setTo(firstBounds.x, firstBounds.y, firstBounds.width, firstBounds.height);

  for (let i = 1; i < objects.length; i++) {
    const currentBounds = objects[i].getBounds();
    Phaser.Geom.Rectangle.Union(output, currentBounds, output);
  }

  return output;
};
