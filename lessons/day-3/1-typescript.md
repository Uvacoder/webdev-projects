# TypeScript

- Main idea: JavaScript with type annotations. Annotations are stripped out during a build step
- Demonstrate compiled output in playground: https://www.typescriptlang.org/play

  ```ts
  let foo: number = 42;

  interface Rectangle {
    width: number;
    height: number;
  }

  let rect: Rectangle = { width: 0, height: 0 };
  ```

- At runtime, there may be no way to tell the type of your variables
- Mention sourcemaps
- Big difference from Swift: TypeScript does a lot of type refinement automatically
- Can be confusing at first, types in VSCode might not be what you expect

  ```ts
  let foo: number | string = JSON.parse("42");

  // Swift's "is" keyword also does type refinement
  if (typeof foo === "number") {
    foo;
  } else if (foo === "pizza") {
    foo;
  } else {
    foo;
  }
  ```

- Review key differences
  - Go through cheatsheet up to anonymous functions
  - https://dabbott.github.io/webdev-projects/cheatsheets/swift-typescript.html
