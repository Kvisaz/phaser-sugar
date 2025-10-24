import { getLocalOffset } from "./getLocalOffset";
import { IChild, ISizeable } from "../types";

export function getLocalBounds(obj: ISizeable & IChild): Phaser.Geom.Rectangle {
  const worldBounds = obj.getBounds();
  const localOffset = getLocalOffset(obj);
  return new Phaser.Geom.Rectangle(worldBounds.x - localOffset.x, worldBounds.y - localOffset.y, worldBounds.width, worldBounds.height);
}
