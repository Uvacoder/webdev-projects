# Custom Hooks

- Writing a component that displays the size of the document

- https://codesandbox.io/s/mystifying-shape-g5d06?file=/src/index.js

- ```tsx
  import React, { useState, useEffect } from "react";
  import { render } from "react-dom";

  function App() {
    const [size, setSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    useEffect(() => {
      function handleResize() {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return (
      <div>
        {size.width} {size.height}
      </div>
    );
  }

  render(<App />, document.querySelector("#app"));
  ```

- Abstract out into separate function

  ```tsx
  import React, { useState, useEffect } from "react";
  import { render } from "react-dom";

  function useWindowSize() {
    const [size, setSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    useEffect(() => {
      function handleResize() {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return size;
  }

  function App() {
    const size = useWindowSize();

    return (
      <div>
        {size.width} {size.height}
      </div>
    );
  }

  render(<App />, document.querySelector("#app"));
  ```
