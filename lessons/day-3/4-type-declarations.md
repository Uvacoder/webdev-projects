# Type Declarations

# `type` keyword

- Literals can be used as types

  ```ts
  type A = number;

  type B = 42;

  // primitive types are lowercase - uppercase is something, not what you want
  type C = Number;
  ```

- Type widening

  ```ts
  let a = 42;

  const b = 42;
  ```

# Object types

- Struct-style objects (look a lot like values)

  ```ts
  type C = {
    foo: number;
    bar: string;
  };

  let c = {
    foo: 123,
    bar: "hi",
  };

  type D = {
    foo: 123;
    bar: "hi";
  };

  let d = {
    foo: 123;
    bar: "hi";
  }
  ```

- Dictionary-style types

  ```ts
  type E = { [key: string]: string };

  let e: E = {
    foo: "hi",
  };

  e.bar = "ok";
  ```

- Classes are about the same as Swift, syntax and semantics

- Interfaces are about the same as protocols

  ```ts
  interface F {
    foo: string;
    bar(n: number): number;
  }
  ```

  - Keywords `type` and `interface` are almost interchangeable - https://microsoft.github.io/TypeScript-New-Handbook/everything/#interface-vs-alias

- Unions

  ```ts
  type U = string | number | 42 | { foo: string } | { baz: 123 };

  function doSomething(arg: U) {
    if (typeof arg === "string") {
      arg;
    } else if (typeof arg === "number") {
      arg;
    } else if ("foo" in arg) {
      arg.foo;
    } else {
      arg.baz;
    }
  }

  doSomething("hi");
  ```

- There are enums, but unions are typically more common.
  - Enums can't have associated data
  - Converting to/from enum is more of a hassle
- Discriminating Unions

  ```ts
  type U = { type: "a"; foo: string } | { type: "b"; baz: 123 };

  function doSomething(arg: U) {
    // TypeScript figures out arg.type is union
    switch (arg.type) {
      case "a":
        arg;
        break;
      case "b":
        arg;
        break;
    }
  }

  doSomething({ type: "a", foo: "bar" });
  ```

- (If time) Intersection types (works with object types and interfaces)

  ```ts
  type A = { foo: string };
  type B = { bar: number };
  type C = A & B;
  ```
