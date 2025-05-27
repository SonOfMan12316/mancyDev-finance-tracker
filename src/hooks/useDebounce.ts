import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    setTimer(handler);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
