
/** решает кучу проблем с дефолтным setInteractive **/
export const setContainerInteractive = (obj: Phaser.GameObjects.Container)=>{
  const bounds = obj.getBounds();
  obj.setSize(bounds.width, bounds.height);
  obj.setInteractive({ useHandCursor: true });
  return obj;
}
