import { useState, useEffect } from 'react';
function useDebounce(value, delay) {
  const [debouce, setDebounce] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounce(value), delay);
    return () => clearTimeout(handler);
  }, [value]);
  return debouce;
}
export default useDebounce;
