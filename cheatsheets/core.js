/**
 * @returns {HTMLElement}
 */
export function createElement(...args) {
  let [type, options = {}, children = []] = args;

  if (
    (args.length === 2 && Array.isArray(args[1])) ||
    typeof args[1] === "string"
  ) {
    options = {};
    children = args[1];
  }

  const element = document.createElement(type);

  Object.assign(element, options);

  for (let child of children) {
    element.append(child);
  }

  return element;
}

/**
 *
 * @param {HTMLElement} node
 * @param {{ css?: string[], js?: string[] }} dependencies
 */
export function loadDependencies(node, dependencies = {}) {
  const { css = [], js = [] } = dependencies;

  const elements = [
    ...css.map((url) =>
      createElement("link", { rel: "stylesheet", href: url })
    ),
    ...js.map((url) => createElement("script", { src: url })),
  ];

  elements.forEach((dep) => {
    node.append(dep);
  });

  return Promise.all(
    elements.map((element) => {
      return new Promise((resolve) => {
        element.onload = resolve;
      });
    })
  );
}
