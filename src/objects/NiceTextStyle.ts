type PhaserTextStyle = Phaser.Types.GameObjects.Text.TextStyle;

export interface INiceTextStyle extends Partial<PhaserTextStyle> {
  color?: string;
  fontSizePx?: number;
  // lineHeight is relative to current fontSizePx
  lineHeight?: number;
  wrapWidth?: number;
}

interface IAddNiceTextArgs {
  scene: Phaser.Scene;
  text: string;
  style?: INiceTextStyle;
}

export function addNiceText({ scene, text, style }: IAddNiceTextArgs) {
  const textObject = new Phaser.GameObjects.Text(scene, 0, 0, text, {});
  if (style) addNiceTextStyle(textObject, style);
  return textObject;
}

export function addNiceTextStyle(
  obj: Phaser.GameObjects.Text,
  style: INiceTextStyle
): Phaser.GameObjects.Text {
  const phaserStyle: PhaserTextStyle = {
    ...style
  };

  if (style.fontSizePx) {
    phaserStyle.fontSize = `${style.fontSizePx}px`;
  }

  if (style.wrapWidth) {
    phaserStyle.wordWrap = { width: style.wrapWidth };
  }

  obj.setStyle(phaserStyle);
  if (style.lineHeight && style.fontSizePx) {
    const addPx = (style.lineHeight - 1) * style.fontSizePx;
    obj.setLineSpacing(addPx);
  }
  return obj;
}
