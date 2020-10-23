/*
Points to cover: 

How script will run before/after DOM content depending on where it's placed in HTML
How to get values from input elements
Getting positions from mouse events
Implementing drag gestures
How types like Point/Rect can be objects or classes, each with pros and cons
*/

import { createElement as h, setAttributes } from "./svg";

type Point = { x: number; y: number };

type Size = { width: number; height: number };

type Rect = Point & Size;

function getCurrentTool(): string {
  const input = document.querySelector(
    'input[name="tool"]:checked'
  ) as HTMLInputElement;

  return input.value;
}

function getFillColor(): string {
  const input = document.querySelector("#fill") as HTMLInputElement;

  return input.value;
}

function getStrokeColor(): string {
  const input = document.querySelector("#stroke") as HTMLInputElement;

  return input.value;
}

function createRect(initialPoint: Point, finalPoint: Point): Rect {
  return {
    width: Math.abs(finalPoint.x - initialPoint.x),
    height: Math.abs(finalPoint.y - initialPoint.y),
    x: Math.min(finalPoint.x, initialPoint.x),
    y: Math.min(finalPoint.y, initialPoint.y),
  };
}

const svg = (document.getElementById("canvas") as unknown) as SVGSVGElement;

let isDragging = false;
let initialPoint: Point;
let dragIndicator: SVGElement;

console.log(getCurrentTool());

svg.addEventListener("mousedown", (event: MouseEvent) => {
  isDragging = true;

  initialPoint = {
    x: event.offsetX,
    y: event.offsetY,
  };

  dragIndicator = h("rect", {
    ...initialPoint,
    stroke: "dodgerblue",
    fill: "transparent",
    "stroke-width": 2,
  });

  console.log(dragIndicator);

  svg.appendChild(dragIndicator);
});

svg.addEventListener("mousemove", (event: MouseEvent) => {
  if (!isDragging) return;

  const point = {
    x: event.offsetX,
    y: event.offsetY,
  };

  switch (dragIndicator.tagName) {
    case "rect": {
      const element = dragIndicator as SVGRectElement;
      const boundingRect = createRect(initialPoint, point);
      setAttributes(element, boundingRect);
      return;
    }
  }
});

svg.addEventListener("mouseup", (event: MouseEvent) => {
  if (!isDragging) return;

  isDragging = false;

  const finalPoint = {
    x: event.offsetX,
    y: event.offsetY,
  };

  const boundingRect = createRect(initialPoint, finalPoint);

  svg.removeChild(dragIndicator);
  svg.appendChild(
    h("rect", {
      ...boundingRect,
      fill: getFillColor(),
      stroke: getStrokeColor(),
      "stroke-width": 2,
    })
  );

  event.stopPropagation();
});

document.addEventListener("mouseup", (event: MouseEvent) => {
  if (!isDragging) return;

  svg.removeChild(dragIndicator);

  isDragging = false;
});
