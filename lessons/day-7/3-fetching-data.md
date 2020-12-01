# Fetch

- Demonstrate `fetch` in chrome console

  ```ts
  fetch("http://localhost:3000/info/1");
  ```

- Using `fetch` in an async function

  ```ts
  async function getInfo() {
    const response = await fetch("http://localhost:3000/info/1");
    console.log(response);
  }

  getInfo();
  ```

- Getting the response as JSON

  ```ts
  async function getInfo() {
    const response = await fetch("http://localhost:3000/info/1");
    const result = await response.json();
    console.log(result);
  }

  getInfo();
  ```

## Calling fetch in a React component

- Demonstrate `fetch` to get data for the `info` block

  ```ts
  const [info, setInfo] = useState<InfoResource | undefined>(undefined);

  useEffect(() => {
    async function getInfo() {
      const response = await fetch("http://localhost:3000/info/1");
      const data = await response.json();
      console.log(data);
      setInfo(data);
    }

    getInfo();
  }, []);
  ```

- Let's extract this into a custom hook (copy & paste, return info):

  ```ts
  export function useInfo() {
    const [info, setInfo] = useState<InfoResource | undefined>(undefined);

    useEffect(() => {
      async function getInfo() {
        const response = await fetch("http://localhost:3000/info/1");
        const data = await response.json();
        console.log(data);
        setInfo(data);
      }

      getInfo();
    }, []);

    return info;
  }
  ```

- Limitation: loading state, errors. We'll come back to that
- Could do the same for each endpoint
- Can we reuse more of this?
- Parameterize the url... useFetch

  ```ts
  export function useInfo() {
    const [info, setInfo] = useState<InfoResource | undefined>(undefined);

    useEffect(() => {
      async function getInfo() {
        const response = await fetch("http://localhost:3000/info/1");
        const data = await response.json();
        console.log(data);
        setInfo(data);
      }

      getInfo();
    }, []);

    return info;
  }
  ```

- useFetch

  ```ts
  type PromiseState<T> =
    | {
        status: "pending";
      }
    | {
        status: "success";
        value: T;
      }
    | {
        status: "failure";
        value: Error;
      };

  export function useFetch<T>() {
    const [result, setResult] = useState<PromiseState<T>>({
      status: "pending",
    });

    // ...

    return result;
  }
  ```

- useFetch

  ```ts
  export function useFetch<T>(url: string) {
    const [result, setResult] = useState<PromiseState<T>>({
      status: "pending",
    });

    useEffect(() => {
      async function fetchUrl() {
        setResult({ status: "pending" });

        try {
          const response = await fetch(url);
          const json = await response.json();

          setResult({ status: "success", value: json });
        } catch (e) {
          setResult({ status: "failure", value: e });
        }
      }

      fetchUrl();
    }, [url]);

    return result;
  }
  ```

- Problem: what happens when the url changes?
- Network requests may come back out of order
- Use cleanup handler and `isStale`

  ```ts
  export function useFetch<T>(url: string) {
    const [result, setResult] = useState<PromiseState<T>>({
      status: "pending",
    });

    useEffect(() => {
      let isStale = false;

      async function fetchUrl() {
        setResult({ status: "pending" });

        try {
          const response = await fetch(url);
          const json = await response.json();

          if (isStale) return;

          setResult({ status: "success", value: json });
        } catch (e) {
          if (isStale) return;

          setResult({ status: "failure", value: e });
        }
      }

      fetchUrl();

      return () => {
        isStale = true;
      };
    }, [url]);

    return result;
  }
  ```
