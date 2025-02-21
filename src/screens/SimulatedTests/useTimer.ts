import { useState, useEffect } from 'react';

function useTimer(initialSeconds: number, submitted: boolean): number {
  const [timer, setTimer] = useState(initialSeconds);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!submitted && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [submitted, timer]);

  return timer;
}

export default useTimer;