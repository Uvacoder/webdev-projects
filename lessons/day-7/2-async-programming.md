# Review from last session

- Cover `useReducer` example, the Currencies component

# Async Programming

- Promises - a built-in class to manage async control flow in our app
- Promises mirror try, catch and throw, but async
- A promise is a wrapper around a value
- Resolving promises

  ```ts
  const resolvedPromise = Promise.resolve(42);

  resolvedPromise.then((value) => {
    console.log("Resolved:", value);
  });
  ```

- Rejecting promises

  ```ts
  const rejectedPromise = Promise.reject("Some problem");

  rejectedPromise.catch((error) => {
    console.log("Rejected:", error);
  });
  ```

- Function constructor
- Handling both resolve and reject

  ```ts
  const functionPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hello");
    }, 1000);
  });

  functionPromise
    .then((value) => {
      console.log("Resolved", value);
    })
    .catch((value) => {
      console.log("Rejected", value);
    });
  ```

- Writing a `delay` function

  ```ts
  function delay(f, duration) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(f());
      }, duration);
    });
  }

  delay(() => "hello", 1000).then((x) => {
    console.log(x);
  });
  ```

## Async / await keywords

- JavaScript syntax for working with promises
- Async functions automatically wrap their return value in a promise

  ```ts
  async function getValue() {
    return 42;
  }

  getValue().then((value) => {
    console.log(value);
  });
  ```

- We can use `await` to unwrap a resolved promise - or throw an error if it was rejected
- This only works in async functions!

  ```ts
  async function doSomethingWithValue() {
    const value = await getValue();

    console.log(value);
  }

  doSomethingWithValue();
  ```

- Try calling our delay function

  ```ts
  async function run() {
    try {
      let value = await delay(() => "hello", 1000);

      console.log("Value:", value);

      return value;
    } catch (error) {
      console.log("Error:", error);

      return undefined;
    }
  }

  run();
  ```

- Playground (editor + 25% console):
  https://unpkg.com/javascript-playgrounds@1.1.0/public/index.html#data=%7B%22preset%22%3A%22react%22%2C%22panes%22%3A%5B%22editor%22%2C%7B%22type%22%3A%22console%22%2C%22style%22%3A%7B%22flex%22%3A%220%200%2025%25%22%7D%2C%22id%22%3A%221%22%7D%2C%7B%22type%22%3A%22player%22%2C%22platform%22%3A%22web%22%2C%22style%22%3A%7B%22width%22%3A0%7D%2C%22id%22%3A%222%22%7D%5D%2C%22typescript%22%3A%7B%22enabled%22%3Atrue%7D%2C%22playground%22%3A%7B%22enabled%22%3Afalse%7D%2C%22sharedEnvironment%22%3Atrue%2C%22code%22%3A%22%22%7D
