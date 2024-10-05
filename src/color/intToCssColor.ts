/** convert int number from Phaser format 0xfffffff to CSS string format '#fffffff' **/
export function intToCssColor(colorInt: number): string {
  return `#${colorInt.toString(16).padStart(6, "0")}`.toUpperCase();
}
