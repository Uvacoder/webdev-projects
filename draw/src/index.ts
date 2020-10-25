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

class Drawing {
  canvas: HTMLCanvasElement;
  currentShape?: Shape;
  isDragging = false;
  initialPoint: Point = { x: 0, y: 0 };
  shapes: Shape[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    canvas.addEventListener("mousedown", this.handleMouseDown);
    canvas.addEventListener("mousemove", this.handleMouseMove);
    canvas.addEventListener("mouseup", this.handleMouseUp);
    document.addEventListener("mouseup", this.handleGlobalMouseUp);

    // setInterval(draw, 1000 / 60);
    requestAnimationFrame(this.draw);
  }

  draw = () => {
    const context = this.canvas.getContext("2d");

    if (!context) return;

    context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    context.lineWidth = 2;

    this.shapes.forEach((shape) => {
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

    requestAnimationFrame(this.draw);
  };

  handleMouseDown = (event: MouseEvent) => {
    this.isDragging = true;

    this.initialPoint = {
      x: event.offsetX,
      y: event.offsetY,
    };

    const rect = createRect(this.initialPoint, this.initialPoint);
    const tool = getCurrentToolType();

    let currentShape: Shape;

    if (tool === ToolType.pencil) {
      currentShape = {
        type: "polyline",
        stroke: getStrokeColor(),
        points: [this.initialPoint],
      };
    } else {
      currentShape = {
        type: tool,
        ...rect,
        stroke: "dodgerblue",
        fill: "transparent",
      };
    }

    this.shapes.push(currentShape);
    this.currentShape = currentShape;
  };

  handleMouseMove = (event: MouseEvent) => {
    if (!this.isDragging) return;

    const point = {
      x: event.offsetX,
      y: event.offsetY,
    };

    switch (this.currentShape?.type) {
      case "rectangle":
      case "ellipse": {
        const rect = createRect(this.initialPoint, point);
        Object.assign(this.currentShape, rect);
        return;
      }
      case "polyline": {
        this.currentShape.points.push(point);
        return;
      }
    }
  };

  handleMouseUp = (event: MouseEvent) => {
    if (!this.isDragging) return;

    this.isDragging = false;

    const finalPoint = {
      x: event.offsetX,
      y: event.offsetY,
    };

    switch (this.currentShape?.type) {
      case "rectangle":
      case "ellipse": {
        const rect = createRect(this.initialPoint, finalPoint);
        const fill = getFillColor();
        const stroke = getStrokeColor();

        Object.assign(this.currentShape, {
          ...rect,
          fill,
          stroke,
        });
        break;
      }
      case "polyline": {
        this.currentShape.points.push(finalPoint);
        break;
      }
    }

    event.stopPropagation();
  };

  handleGlobalMouseUp = () => {
    if (!this.isDragging) return;

    this.isDragging = false;

    const tool = getCurrentToolType();

    if (tool !== ToolType.pencil) {
      this.shapes = this.shapes.filter((shape) => shape !== this.currentShape);
    }
  };
}

new Drawing(canvas);
