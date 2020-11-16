/**
 * Return the canvas element
 */
function getCanvasElement() {}

type ToolType = unknown; /* Replace 'unknown' with a better type! */

/**
 * Return the currently selected tool by reading the DOM.
 */
function getCurrentToolType(): ToolType {
  throw new Error("Not implemented");
}

/**
 * Return the current fill color by reading the DOM.
 */
function getCurrentFill(): string {
  throw new Error("Not implemented");
}

/**
 * Return the current stroke color by reading the DOM.
 */
function getCurrentStroke(): string {
  throw new Error("Not implemented");
}

/**
 * Implement this!
 */
interface Shape {}

/**
 * Define types for RectangleShape, EllipseShape, and PolylineShape
 */

/**
 * An array of shapes... hardcode a rectangle, ellipse, and polyline!
 */
let shapes: Shape = [];

/**
 * Write a class `Drawing` that can draw shapes onto the canvas element
 */
