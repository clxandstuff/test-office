const { setTimeout, setInterval } =
  typeof window !== 'undefined' ? window : global;

export default function testPoint(predicate, config = {}) {
  const { interval = 50, timeout = 5000 } = config;
  return new Promise((resolve, reject) => {
    let timeoutId;
    let lastError;

    const intervalId = setInterval(() => {
      try {
        let result = predicate();

        // support for using expect() instead of returning true/false
        if (result !== true && result !== false) {
          result = true;
        }

        if (result) {
          clearInterval(intervalId);
          if (timeoutId) {
            clearTimeout(timeoutId);
          }

          resolve();
        }
      } catch (e) {
        lastError = e;
      }
    }, interval);

    timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      reject(lastError);
    }, timeout);
  });
}
