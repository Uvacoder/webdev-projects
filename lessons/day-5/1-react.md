# React

- A library for managing complexity of the DOM

  - Breaking down a UI into highly reusable parts
    - React leans much more toward small, reusable components than other frameworks
  - Provides utilities and patterns for managing UI state
  - Creating elements, adding event listeners, smoothing out differences between browsers

- https://www.react.express/jsx

- Editor + transpiler: https://unpkg.com/javascript-playgrounds@1.1.0/public/index.html#data=%7B%22preset%22%3A%22react%22%2C%22panes%22%3A%5B%22editor%22%2C%22transpiler%22%5D%2C%22code%22%3A%22%22%7D

- Editor + hidden player (open Chrome console): https://unpkg.com/javascript-playgrounds@1.1.0/public/index.html#data=%7B%22preset%22%3A%22react%22%2C%22panes%22%3A%5B%22editor%22%2C%7B%22type%22%3A%22player%22%2C%22style%22%3A%7B%22width%22%3A%220%22%7D%2C%22id%22%3A%221%22%7D%5D%2C%22playground%22%3A%7B%22enabled%22%3Afalse%7D%2C%22code%22%3A%22console.log(%3Cdiv%20%2F%3E)%22%7D

- First example

  https://unpkg.com/javascript-playgrounds@1.1.0/public/index.html#data=%7B%22preset%22%3A%22react%22%2C%22panes%22%3A%5B%22editor%22%2C%7B%22type%22%3A%22player%22%2C%22platform%22%3A%22web%22%2C%22style%22%3A%7B%22borderLeft%22%3A%221px%20solid%20%23CCC%22%7D%2C%22id%22%3A%221%22%7D%5D%2C%22typescript%22%3A%7B%22enabled%22%3Atrue%7D%2C%22code%22%3A%22import%20React%20from%20%5C%22react%5C%22%3B%5Cnimport%20%7B%20render%20%7D%20from%20%5C%22react-dom%5C%22%3B%5Cn%5Cnconst%20host%20%3D%20document.querySelector(%5C%22%23app%5C%22)%3B%5Cn%22%7D

```tsx
import React from "react";
import { render } from "react-dom";

function MyComponent() {
  return <div>Welcome to React!</div>;
}

const host = document.querySelector("#app");

render(<MyComponent />, host);
```

## Building with React

1. Break the app into components
   - It helps when you know how the whole app will look in advance
   - Even if you don't, it's OK! Refactoring component structure is typically low effort
2. Build a static version of the app
   - This will enable us to lay the foundation for the app
3. Determine what should be stateful
4. Determine in which component each piece of state should live
   - State should live in the highest parent in the tree that needs to know it
5. Hardcode initial states
   - So we can flesh out the data flow
6. Add inverse data flow
   - Data flow **from parent to child** in place. Then we can add inverse data flow, propagating events **from child to parent**.
7. Add server communication (if present)
