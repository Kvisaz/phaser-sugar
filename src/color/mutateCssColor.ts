import { intToCssColor } from "./intToCssColor";
import { cssColorToInt } from "./cssColorToInt";

export function mutateCssColor(color: string, mutationPower: number): string {
  if (!/^#[0-9A-F]{6}$/i.test(color)) {
    throw new Error('Invalid color format. Use "#RRGGBB".');
  }

  if (mutationPower <= 0) {
    return color;
  }

  let colorInt = cssColorToInt(color);

  let r = (colorInt >> 16) & 0xff;
  let g = (colorInt >> 8) & 0xff;
  let b = colorInt & 0xff;

  function randomOffset(): number {
    return Math.random() * 2 - 1;
  }

  r = Math.min(255, Math.max(0, Math.round(r + randomOffset() * mutationPower * 255)));
  g = Math.min(255, Math.max(0, Math.round(g + randomOffset() * mutationPower * 255)));
  b = Math.min(255, Math.max(0, Math.round(b + randomOffset() * mutationPower * 255)));

  colorInt = (r << 16) | (g << 8) | b;

  return intToCssColor(colorInt);
}


// console.log(mutateColor("#358C54", 0)); // "#358C54"
// console.log(mutateColor("#358C54", 0.5)); 
// console.log(mutateColor("#358C54", 1));
