type SVGAttributes<K extends keyof SVGElementTagNameMap> = Partial<
  Record<keyof Partial<SVGElementTagNameMap[K]>, string | number>
> & { fill?: string; stroke?: string; "stroke-width"?: string | number };
type SVGChildren = (SVGElement | string)[];

export function setAttributes<T extends SVGElement>(
  element: T,
  attributes: Partial<Record<keyof Partial<T>, string | number>> & {
    fill?: string;
  }
) {
  Object.entries(attributes).forEach(([key, value]) => {
    if (value) {
      element.setAttribute(key, value.toString());
    }
  });
}

export function createElement<K extends keyof SVGElementTagNameMap>(
  tagName: K,
  children?: SVGChildren
): SVGElementTagNameMap[K];
export function createElement<K extends keyof SVGElementTagNameMap>(
  tagName: K,
  attributes: SVGAttributes<K>,
  children?: SVGChildren
): SVGElementTagNameMap[K];
export function createElement<K extends keyof SVGElementTagNameMap>(
  tagName: K,
  attributes?: SVGAttributes<K> | SVGChildren,
  children?: SVGChildren
): SVGElementTagNameMap[K] {
  const element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    tagName
  );

  if (Array.isArray(attributes)) {
    children = attributes;
    attributes = undefined;
  }

  if (attributes) {
    setAttributes(element, attributes);
  }

  if (children) {
    element.append(...children);
  }

  return element;
}
