# More hooks

- Review `useReducer` from previous session

## useRef

- analagous to an instance variable

- ```tsx
  import React, { useReducer, useRef } from "react";
  import { render } from "react-dom";
  import { WindowSize } from "./WindowSize";

  function App() {
    return <div>{/* {size.current.width} {size.current.height} */}</div>;
  }

  render(<App />, document.querySelector("#app"));
  ```

## useLayoutEffect

- happens earlier in the React lifecycle - synchronously before the browser "paints" the new UI
- this is relevant in our theme button
