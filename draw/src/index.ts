import { Drawing } from "./drawing";
import { getCurrentFill, getCurrentStroke, getCurrentToolType } from "./tools";

const canvas = (document.getElementById(
  "canvas"
) as unknown) as HTMLCanvasElement;

new Drawing(canvas, {
  getCurrentFill,
  getCurrentStroke,
  getCurrentToolType,
});
