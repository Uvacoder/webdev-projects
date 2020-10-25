import { createRect, Point, Rect } from "./primitives";
import { ToolType } from "./tools";

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

interface DrawingConfig {
  getCurrentToolType: () => ToolType;
  getCurrentStroke: () => string;
  getCurrentFill: () => string;
}

function isTouchEvent(event: Event): event is TouchEvent {
  return event.type.startsWith("touch");
}

function getEventPoint(event: MouseEvent | TouchEvent): Point {
  if (isTouchEvent(event)) {
    return {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY,
    };
  } else {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }
}

export class Drawing {
  canvas: HTMLCanvasElement;
  currentShape?: Shape;
  isDragging = false;
  initialPoint: Point = { x: 0, y: 0 };
  shapes: Shape[] = [];

  getCurrentToolType: () => ToolType;
  getCurrentStroke: () => string;
  getCurrentFill: () => string;

  constructor(canvas: HTMLCanvasElement, config: DrawingConfig) {
    this.canvas = canvas;
    this.getCurrentToolType = config.getCurrentToolType;
    this.getCurrentStroke = config.getCurrentStroke;
    this.getCurrentFill = config.getCurrentFill;

    canvas.addEventListener("mousedown", this.handleMouseDown);
    canvas.addEventListener("mousemove", this.handleMouseMove);
    canvas.addEventListener("mouseup", this.handleMouseUp);
    document.addEventListener("mouseup", this.handleGlobalMouseUp);

    canvas.addEventListener("touchstart", this.handleMouseDown);
    canvas.addEventListener("touchmove", this.handleMouseMove);
    canvas.addEventListener("touchend", this.handleMouseUp);
    document.addEventListener("touchend", this.handleGlobalMouseUp);

    // setInterval(draw, 1000 / 60);
    requestAnimationFrame(this.draw);
  }

  getPoint(event: TouchEvent | MouseEvent): Point {
    const rect = this.canvas.getBoundingClientRect();
    const eventPoint = getEventPoint(event);

    return {
      x: eventPoint.x - rect.x,
      y: eventPoint.y - rect.y,
    };
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

  handleMouseDown = (event: TouchEvent | MouseEvent) => {
    this.isDragging = true;
    this.initialPoint = this.getPoint(event);

    let currentShape: Shape;

    const tool = this.getCurrentToolType();

    if (tool === ToolType.pencil) {
      currentShape = {
        type: "polyline",
        stroke: this.getCurrentStroke(),
        points: [this.initialPoint],
      };
    } else {
      const rect = createRect(this.initialPoint, this.initialPoint);

      currentShape = {
        type: tool,
        ...rect,
        stroke: "dodgerblue",
        fill: "transparent",
      };
    }

    this.shapes.push(currentShape);
    this.currentShape = currentShape;

    event.preventDefault();
  };

  handleMouseMove = (event: TouchEvent | MouseEvent) => {
    if (!this.isDragging) return;

    const point = this.getPoint(event);

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

  handleMouseUp = (event: TouchEvent | MouseEvent) => {
    if (!this.isDragging) return;

    this.isDragging = false;

    const point = this.getPoint(event);

    switch (this.currentShape?.type) {
      case "rectangle":
      case "ellipse": {
        const rect = createRect(this.initialPoint, point);
        const fill = this.getCurrentFill();
        const stroke = this.getCurrentStroke();

        Object.assign(this.currentShape, {
          ...rect,
          fill,
          stroke,
        });
        break;
      }
      case "polyline": {
        this.currentShape.points.push(point);
        break;
      }
    }

    event.stopPropagation();
  };

  handleGlobalMouseUp = () => {
    if (!this.isDragging) return;

    this.isDragging = false;

    const tool = this.getCurrentToolType();

    if (tool !== ToolType.pencil) {
      this.shapes = this.shapes.filter((shape) => shape !== this.currentShape);
    }
  };
}
