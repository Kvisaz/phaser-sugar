interface IChild {
  parentContainer?: Phaser.GameObjects.Container & IChild ;
}

export function getParentChain(gameObject: IChild): Phaser.GameObjects.Container[] {
  const chain: Phaser.GameObjects.Container[] = [];
  let p = gameObject.parentContainer;
  while (p) {
    chain.push(p);
    p = p.parentContainer;
  }
  return chain;
}
