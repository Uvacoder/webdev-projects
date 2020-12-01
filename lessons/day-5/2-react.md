- Conditional rendering
- Lists and keys

  ```tsx
  import React from "react";
  import { render } from "react-dom";

  const host = document.querySelector("#app");

  const data = [
    { id: "a", name: "Devin" },
    { id: "b", name: "Michael" },
    { id: "c", name: "Jordan" },
  ];

  function App() {}

  render(<App />, host);
  ```

- Re-render

  ```tsx
  import React from "react";
  import { render } from "react-dom";

  const host = document.querySelector("#app");

  interface Props {
    count: string;
  }

  function MyComponent({ count }: Props) {
    return <div>{count}</div>;
  }

  let count = 0;

  setInterval(() => {
    render(<MyComponent count={count++} />, host);
  }, 1000);
  ```

- Children

Lab time!

- Check out resources.ts so you can see the shape of data that will eventually come from the database
- Implement the Info component
- Implement the Article component
- Refactor StarButton so that it uses Button, and use Button within the Trade component

Things to review:

- Props spread: {...} for link
- Spacer: display block
- tabs={} vs. {tabs} as children
- {asset} {asset && <spacer>}
