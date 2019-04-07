const { setTimeout, setInterval } =
  typeof window !== 'undefined' ? window : global;

function runExpectOrPredicate(fn) {
  let result = fn();

  // when using expect() without returning value
  if (result !== true && result !== false) {
    result = true;
  }

  return result;
}

export default function testPoint(fn, config = {}) {
  const { interval = 50, timeout = 5000 } = config;
  return new Promise((resolve, reject) => {
    let timeoutId;
    let lastError;

    setTimeout(() => {
      try {
        if (runExpectOrPredicate(fn)) {
          resolve();
        }
      } catch (e) {
        lastError = e;
      }
    });

    const intervalId = setInterval(() => {
      try {
        if (runExpectOrPredicate(fn)) {
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
