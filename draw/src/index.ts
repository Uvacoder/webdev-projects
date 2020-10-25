/*
Points to cover: 

How script will run before/after DOM content depending on where it's placed in HTML
How to get values from input elements
Getting positions from mouse events
Event bubbling
Implementing drag gestures
Mouse events vs. touch events
How types like Point/Rect can be objects or classes, each with pros and cons
Enums vs unions vs discriminated types
Converting to/from string-backed enums
setTimeout vs. setInterval vs. raf
Global event handlers
Bounding rects
Mention css vendor prefixing
*/

type Point = { x: number; y: number };

type Size = { width: number; height: number };

type Rect = Point & Size;

type RectangleShape = Rect & {
  type: "rectangle";
  fill: string;
  stroke: string;
};

type EllipseShape = Rect & {
  type: "ellipse";
  fill: string;
  stroke: string;
};

type PolylineShape = {
  type: "polyline";
  stroke: string;
  points: Point[];
};

type Shape = RectangleShape | EllipseShape | PolylineShape;

enum ToolType {
  rectangle = "rectangle",
  ellipse = "ellipse",
  pencil = "pencil",
}

function getCurrentToolType(): ToolType {
  const input = document.querySelector(
    'input[name="tool"]:checked'
  ) as HTMLInputElement;

  switch (input.value) {
    case "rectangle":
      return ToolType.rectangle;
    case "ellipse":
      return ToolType.ellipse;
    case "pencil":
      return ToolType.pencil;
    default:
      throw new Error("Invalid tool type");
  }
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
let currentShape: Shape;
let shapes: Shape[] = [];

function draw() {
  const context = canvas.getContext("2d");

  if (!context) return;

  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  context.lineWidth = 2;

  shapes.forEach((shape) => {
    context.strokeStyle = shape.stroke;

    switch (shape.type) {
      case "rectangle":
        context.fillStyle = shape.fill;
        context.fillRect(shape.x, shape.y, shape.width, shape.height);
        context.strokeRect(shape.x, shape.y, shape.width, shape.height);
        break;
      case "ellipse":
        context.fillStyle = shape.fill;
        context.beginPath();
        context.ellipse(
          shape.x + shape.width / 2,
          shape.y + shape.height / 2,
          shape.width / 2,
          shape.height / 2,
          0,
          0,
          Math.PI * 2
        );
        context.fill();
        context.stroke();
        break;
      case "polyline":
        const [start, ...rest] = shape.points;
        context.beginPath();
        if (start) {
          context.moveTo(start.x, start.y);
        }
        rest.forEach((point) => {
          context.lineTo(point.x, point.y);
        });
        context.stroke();
        break;
    }
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
  const tool = getCurrentToolType();

  if (tool === ToolType.pencil) {
    currentShape = {
      type: "polyline",
      stroke: getStrokeColor(),
      points: [initialPoint],
    };
  } else {
    currentShape = {
      type: tool,
      ...rect,
      stroke: "dodgerblue",
      fill: "transparent",
    };
  }

  shapes.push(currentShape);
});

canvas.addEventListener("mousemove", (event: MouseEvent) => {
  if (!isDragging) return;

  const point = {
    x: event.offsetX,
    y: event.offsetY,
  };

  switch (currentShape.type) {
    case "rectangle":
    case "ellipse": {
      const rect = createRect(initialPoint, point);
      Object.assign(currentShape, rect);
      return;
    }
    case "polyline": {
      currentShape.points.push(point);
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

  switch (currentShape.type) {
    case "rectangle":
    case "ellipse": {
      const rect = createRect(initialPoint, finalPoint);
      const fill = getFillColor();
      const stroke = getStrokeColor();

      Object.assign(currentShape, {
        ...rect,
        fill,
        stroke,
      });
      break;
    }
    case "polyline": {
      currentShape.points.push(finalPoint);
      break;
    }
  }

  event.stopPropagation();
});

document.addEventListener("mouseup", (event: MouseEvent) => {
  if (!isDragging) return;

  isDragging = false;

  const tool = getCurrentToolType();

  if (tool !== ToolType.pencil) {
    shapes = shapes.filter((shape) => shape !== currentShape);
  }
});
