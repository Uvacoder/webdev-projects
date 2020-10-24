/*
Points to cover: 

How script will run before/after DOM content depending on where it's placed in HTML
How to get values from input elements
Getting positions from mouse events
Implementing drag gestures
How types like Point/Rect can be objects or classes, each with pros and cons
Mention css vendor prefixing
setTimeout vs. setInterval vs. raf
*/

type Point = { x: number; y: number };

type Size = { width: number; height: number };

type Rect = Point & Size;

type DrawingRect = Rect & {
  type: "rect";
  fill: string;
  stroke: string;
};

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

const canvas = (document.getElementById(
  "canvas"
) as unknown) as HTMLCanvasElement;

let isDragging = false;
let initialPoint: Point;
let dragIndicator: DrawingRect;
let shapes: DrawingRect[] = [];

function draw() {
  const context = canvas.getContext("2d");

  if (!context) return;

  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  context.lineWidth = 2;

  shapes.forEach((shape) => {
    context.fillStyle = shape.fill;
    context.strokeStyle = shape.stroke;
    context.fillRect(shape.x, shape.y, shape.width, shape.height);
    context.strokeRect(shape.x, shape.y, shape.width, shape.height);
  });

  requestAnimationFrame(draw);
}

// setInterval(draw, 1000 / 60);
requestAnimationFrame(draw);

canvas.addEventListener("mousedown", (event: MouseEvent) => {
  isDragging = true;

  initialPoint = {
    x: event.offsetX,
    y: event.offsetY,
  };

  const rect = createRect(initialPoint, initialPoint);

  dragIndicator = {
    type: "rect",
    ...rect,
    stroke: "dodgerblue",
    fill: "transparent",
  };

  shapes.push(dragIndicator);
});

canvas.addEventListener("mousemove", (event: MouseEvent) => {
  if (!isDragging) return;

  const point = {
    x: event.offsetX,
    y: event.offsetY,
  };

  switch (dragIndicator.type) {
    case "rect": {
      // const element = dragIndicator as DrawingRect;
      const rect = createRect(initialPoint, point);
      Object.assign(dragIndicator, rect);
      return;
    }
  }
});

canvas.addEventListener("mouseup", (event: MouseEvent) => {
  if (!isDragging) return;

  isDragging = false;

  const finalPoint = {
    x: event.offsetX,
    y: event.offsetY,
  };

  const boundingRect = createRect(initialPoint, finalPoint);

  const fill = getFillColor();
  const stroke = getStrokeColor();

  shapes = shapes.filter((shape) => shape !== dragIndicator);

  shapes.push({
    type: "rect",
    ...boundingRect,
    fill,
    stroke,
  });

  event.stopPropagation();
});

document.addEventListener("mouseup", (event: MouseEvent) => {
  if (!isDragging) return;

  shapes = shapes.filter((shape) => shape !== dragIndicator);

  isDragging = false;
});
