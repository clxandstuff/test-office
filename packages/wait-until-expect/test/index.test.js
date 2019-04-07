import testPoint from '../src/index';

test('when after timeout, it rejects promise with last thrown error from predicate', () => {
  let deferredValue;

  setTimeout(() => {
    deferredValue = 'foo';
  }, 60);

  expect(
    testPoint(
      () => {
        expect(deferredValue).toEqual('foo');
      },
      {
        timeout: 50
      }
    )
  ).rejects.toThrow(
    (() => {
      try {
        expect(deferredValue).toEqual('foo');
      } catch (e) {
        return e;
      }
      return true;
    })()
  );
});

test('when befeore timeout, when condition is fulfilled, it resolves promise', () => {
  let deferredValue;

  setTimeout(() => {
    deferredValue = 'foo';
  }, 30);

  return expect(
    testPoint(
      () => {
        return deferredValue === 'foo';
      },
      {
        timeout: 50
      }
    )
  ).resolves.toBe(undefined);
});

test('bypasses jest fake timers', () => {
  let deferredValue;

  setTimeout(() => {
    deferredValue = 'real timeout value';
  }, 100);
  jest.useFakeTimers();
  setTimeout(() => {
    deferredValue = 'fake timeout value';
  }, 50);

  jest.advanceTimersByTime(50);
  expect(deferredValue).toEqual('fake timeout value');

  return testPoint(() => {
    expect(deferredValue).toEqual('real timeout value');
  });
});
