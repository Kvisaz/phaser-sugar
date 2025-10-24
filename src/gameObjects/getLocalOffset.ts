import { getParentChain } from "./getParentChain";
import { IChild } from "../types";

export function getLocalOffset(gameObject: IChild): { x: number, y: number } {
  const offset = { x: 0, y: 0 };
  const chain = getParentChain(gameObject);
  if (chain.length === 0) return offset;
  chain.forEach(c => {
    offset.x += c.x;
    offset.y += c.y;
  });
  return offset;
}

export function getLocalDx(gameObject: Phaser.GameObjects.GameObject): number {
  let dx = 0;
  const chain = getParentChain(gameObject);
  if (chain.length === 0) return dx;
  chain.forEach(c => dx += c.x);
  return dx;
}

export function getLocalDy(gameObject: Phaser.GameObjects.GameObject): number {
  let dy = 0;
  const chain = getParentChain(gameObject);
  if (chain.length === 0) return dy;
  chain.forEach(c => dy += c.y);
  return dy;
}
