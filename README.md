# :hourglass: Testpoint

It waits for predicate or expectation to be truthy, and returns promise. Useful for tests when you are not able to hook directly into some asynchronous changes during test.

It can be used to wait for final result of test or some intermediary step during test.

Motivated by and rewritten from great libs: [wait-for-expect](https://github.com/TheBrainFamily/wait-for-expect) and [waitUntil](https://github.com/devlato/waitUntil) to support both, true/false predicates and expect() - ways of waiting for desired conditions in time.

## Instalation

```sh
$ npm install testpoint --save-dev
```

## Usage

### Waiting for final expectations (e.g. using expect in jest)

```js
test('final expect example', () => {
  const state = 'default';
  const updateState = () => {
    Promise.resolve().then(() => {
      state = 'updated';
    });
  };

  updateState();

  return testPoint(() => {
    expect(state).toEqual('updated');
  });
});
```

### Waiting for step to go on (using predicate)

```js
test('checkpoint during test example', async () => {
  const state = 'default';
  const firstStep = () => {
    setTimeout(() => {
      state = 'first step';
    }, 100);
  };
  const restSteps = () => {
    Promise.resolve()
      .then(() => {
        state = 'second step';
      })
      .then(() => {
        setTimeout(() => {
          state = 'third step';
        })
      });
  };

  firstStep();

  await testPoint(() => {
    return state === 'first step';
  });

  restSteps();

  await testPoint(() => {
    return state === 'second step';
  });

  await testPoint(() => {
    expect(state).toEqual('third step');
  })
});
```

### API

**testPoint(fn, config)**

```js
testPoint(() => true, {
  interval: 100 // ms - default 50
  timeout: 3000 // ms - default 5000
});
```

###
