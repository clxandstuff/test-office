import MockServer from '../../../../../../src/lib/app/mockServers/http/MockServer';

describe('MockServer', () => {
  describe('start', () => {
    it('should return promise', () => {
      const ms = new MockServer({ port: 9988 });
      const startReturnedValue = ms.start();
      expect(startReturnedValue).toBeInstanceOf(Promise);
      return startReturnedValue.then(() => ms.stop());
    });
  });

  describe('stop', () => {
    it('should return promise', () => {
      const ms = new MockServer({ port: 9988 });
      expect(ms.stop()).toBeInstanceOf(Promise);
    });
  });
});
