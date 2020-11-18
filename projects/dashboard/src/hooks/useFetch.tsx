import { useEffect, useState } from "react";

type FetchResult<T> =
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

export default function useFetch<T>(url?: string): FetchResult<T> {
  const [state, setState] = useState<FetchResult<T>>({ status: "pending" });

  useEffect(() => {
    let isStale = false;

    async function fetchUrl() {
      if (!url) return;

      setState({ status: "pending" });

      try {
        const response = await fetch(url);
        const json = await response.json();

        if (isStale) return;

        setState({
          status: "success",
          value: json,
        });
      } catch (e) {
        setState({
          status: "failure",
          value: e,
        });
      }
    }

    fetchUrl();

    return () => {
      isStale = true;
    };
  }, [url]);

  return state;
}
