export enum ToolType {
  rectangle = "rectangle",
  ellipse = "ellipse",
  pencil = "pencil",
}

export function getCurrentToolType(): ToolType {
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

export function getCurrentFill(): string {
  const input = document.querySelector("#fill") as HTMLInputElement;

  return input.value;
}

export function getCurrentStroke(): string {
  const input = document.querySelector("#stroke") as HTMLInputElement;

  return input.value;
}
