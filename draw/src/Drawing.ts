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
        this.currentShape.points.push(finalPoint);
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
