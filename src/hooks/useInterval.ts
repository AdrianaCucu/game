import { useRef, useEffect } from "react";

export function useInterval(callback: () => void | any, delay: number) {
  const savedCallback = useRef();

  // Remember the latest callback
  useEffect(() => {
    if (savedCallback) {
      // @ts-ignore
      savedCallback.current = callback;
    }
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    function tick() {
      if (savedCallback && savedCallback.current) {
        // @ts-ignore
        savedCallback.current();
      }
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
}
