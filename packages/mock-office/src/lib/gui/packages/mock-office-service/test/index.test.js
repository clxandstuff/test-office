import MockOfficeService, {
  ConnectionError,
  InvalidRequestError,
  UnsupportedStatusError,
  ResourceNotFoundError,
  ServerError
} from '../lib';

describe('MockOfficeService', () => {
  describe('.fetch', () => {
    it('should throw ConnectionError when fetch fails', () => {
      fetch.mockRejectOnce();

      return MockOfficeService.fetch('http://host.com').catch(e => {
        expect(e).toBeInstanceOf(ConnectionError);
      });
    });

    it('should throw errror when no arguments have been provided', () => {
      expect(() => MockOfficeService.fetch()).toThrow();
    });

    it('should throw ServerError when response status 500', () => {
      const mos = new MockOfficeService('http://host.com');
      fetch.mockResponseOnce(JSON.stringify({ error: 'error message' }), {
        status: 500
      });

      return mos.getState().catch(e => {
        expect(e).toBeInstanceOf(ServerError);
      });
    });
  });

  describe('.addServer', () => {
    it('should throw InvalidPayloadError on response status 400', () => {
      const mos = new MockOfficeService('http://host.com');
      fetch.mockResponseOnce(JSON.stringify({ error: 'error message' }), {
        status: 400
      });

      return mos.addServer().catch(e => {
        expect(e).toBeInstanceOf(InvalidRequestError);
      });
    });

    it('should return payload on response status 200', () => {
      const mos = new MockOfficeService('http://host.com');
      const resPayload = { prop: 'val' };
      fetch.mockResponseOnce(JSON.stringify(resPayload), {
        status: 200
      });

      return mos.addServer().then(payload => {
        expect(payload).toEqual(resPayload);
      });
    });

    it('should return payload on unsupported response status', () => {
      const mos = new MockOfficeService('http://host.com');
      fetch.mockResponseOnce('', {
        status: 555
      });

      return mos.addServer().catch(e => {
        expect(e).toBeInstanceOf(UnsupportedStatusError);
      });
    });
  });

  describe('.addBehaviour', () => {
    it('should throw InvalidPayloadError on response status 400', () => {
      const mos = new MockOfficeService('http://host.com');
      fetch.mockResponseOnce(JSON.stringify({ error: 'error message' }), {
        status: 400
      });

      return mos.addBehaviour('server id', {}).catch(e => {
        expect(e).toBeInstanceOf(InvalidRequestError);
      });
    });

    it('should return payload on response status 200', () => {
      const mos = new MockOfficeService('http://host.com');
      const resPayload = { prop: 'val' };
      fetch.mockResponseOnce(JSON.stringify(resPayload), {
        status: 200
      });

      return mos.addBehaviour().then(payload => {
        expect(payload).toEqual(resPayload);
      });
    });

    it('should return payload on unsupported response status', () => {
      const mos = new MockOfficeService('http://host.com');
      fetch.mockResponseOnce('', {
        status: 555
      });

      return mos.addBehaviour().catch(e => {
        expect(e).toBeInstanceOf(UnsupportedStatusError);
      });
    });
  });

  describe('.getBehaviour', () => {
    it('should throw ResourceNotFoundError on response status 404', () => {
      const mos = new MockOfficeService('http://host.com');
      fetch.mockResponseOnce('', {
        status: 404
      });

      return mos.getBehaviour('server-id', 'behaviour-id').catch(e => {
        expect(e).toBeInstanceOf(ResourceNotFoundError);
      });
    });

    it('should throw InvalidPayloadError on response status 400', () => {
      const mos = new MockOfficeService('http://host.com');
      fetch.mockResponseOnce(JSON.stringify({ error: 'error message' }), {
        status: 400
      });

      return mos.getBehaviour('server-id', 'behaviour-id').catch(e => {
        expect(e).toBeInstanceOf(InvalidRequestError);
      });
    });

    it('should return payload on response status 200', () => {
      const mos = new MockOfficeService('http://host.com');
      const resPayload = { prop: 'val' };
      fetch.mockResponseOnce(JSON.stringify(resPayload), {
        status: 200
      });

      return mos.getBehaviour().then(payload => {
        expect(payload).toEqual(resPayload);
      });
    });
  });

  describe('.startServer', () => {
    it('should throw ResourceNotFoundError on response status 404', () => {
      const mos = new MockOfficeService('http://host.com');
      fetch.mockResponseOnce('', {
        status: 404
      });

      return mos.startServer('server-id').catch(e => {
        expect(e).toBeInstanceOf(ResourceNotFoundError);
      });
    });

    it('should throw InvalidPayloadError on response status 400', () => {
      const mos = new MockOfficeService('http://host.com');
      fetch.mockResponseOnce(JSON.stringify({ error: 'error message' }), {
        status: 400
      });

      return mos.startServer('server-id').catch(e => {
        expect(e).toBeInstanceOf(InvalidRequestError);
      });
    });

    it('should return resolved promise on response status 200', () => {
      const mos = new MockOfficeService('http://host.com');
      fetch.mockResponseOnce('', {
        status: 200
      });

      return mos.startServer();
    });
  });

  describe('.stopServer', () => {
    it('should throw ResourceNotFoundError on response status 404', () => {
      const mos = new MockOfficeService('http://host.com');
      fetch.mockResponseOnce('', {
        status: 404
      });

      return mos.stopServer('server-id').catch(e => {
        expect(e).toBeInstanceOf(ResourceNotFoundError);
      });
    });

    it('should throw InvalidPayloadError on response status 400', () => {
      const mos = new MockOfficeService('http://host.com');
      fetch.mockResponseOnce(JSON.stringify({ error: 'error message' }), {
        status: 400
      });

      return mos.stopServer('server-id').catch(e => {
        expect(e).toBeInstanceOf(InvalidRequestError);
      });
    });

    it('should return resolved promise on response status 200', () => {
      const mos = new MockOfficeService('http://host.com');
      fetch.mockResponseOnce('', {
        status: 200
      });

      return mos.stopServer('server-id');
    });
  });

  describe('.removeServer', () => {
    it('should throw ResourceNotFoundError on response status 404', () => {
      const mos = new MockOfficeService('http://host.com');
      fetch.mockResponseOnce('', {
        status: 404
      });

      return mos.removeServer('server-id').catch(e => {
        expect(e).toBeInstanceOf(ResourceNotFoundError);
      });
    });

    it('should throw InvalidPayloadError on response status 400', () => {
      const mos = new MockOfficeService('http://host.com');
      const errorMessage = 'error message';
      fetch.mockResponseOnce(JSON.stringify({ message: errorMessage }), {
        status: 400
      });

      return mos.removeServer('server-id').catch(e => {
        expect(e).toBeInstanceOf(InvalidRequestError);
        expect(e.message).toEqual(errorMessage);
      });
    });

    it('should return resolved promise on response status 200', () => {
      const mos = new MockOfficeService('http://host.com');
      fetch.mockResponseOnce('', {
        status: 200
      });

      return mos.removeServer('server-id');
    });
  });

  describe('.editServer', () => {
    it('should throw ResourceNotFoundError on response status 404', done => {
      const mos = new MockOfficeService('http://host.com');
      fetch.mockResponseOnce('', {
        status: 404
      });

      mos.editServer('server-id').catch(e => {
        expect(e).toBeInstanceOf(ResourceNotFoundError);
        done();
      });
    });

    it('should throw InvalidPayloadError on response status 400', () => {
      const mos = new MockOfficeService('http://host.com');
      const errorMessage = 'error message';
      fetch.mockResponseOnce(JSON.stringify({ message: errorMessage }), {
        status: 400
      });

      return mos.editServer('server-id').catch(e => {
        expect(e).toBeInstanceOf(InvalidRequestError);
        expect(e.message).toEqual(errorMessage);
      });
    });

    it('should return resolved promise on response status 200', () => {
      const mos = new MockOfficeService('http://host.com');
      const resPayload = {
        name: 'server name',
        port: 3000,
        type: 'ws'
      };
      fetch.mockResponseOnce(JSON.stringify(resPayload), { status: 200 });

      return mos.editServer('server-id').then(payload => {
        expect(payload).toEqual(resPayload);
      });
    });
  });

  describe('.removeBehaviour', () => {
    it('should throw ResourceNotFoundError on response status 404', done => {
      const mos = new MockOfficeService('http://host.com');
      fetch.mockResponseOnce('', {
        status: 404
      });

      mos.removeBehaviour('server-id').catch(e => {
        expect(e).toBeInstanceOf(ResourceNotFoundError);
        done();
      });
    });

    it('should throw InvalidPayloadError on response status 400', () => {
      const mos = new MockOfficeService('http://host.com');
      const errorMessage = 'error message';
      fetch.mockResponseOnce(JSON.stringify({ message: errorMessage }), {
        status: 400
      });

      return mos.removeBehaviour('server-id').catch(e => {
        expect(e).toBeInstanceOf(InvalidRequestError);
        expect(e.message).toEqual(errorMessage);
      });
    });

    it('should return resolved promise on response status 200', done => {
      const mos = new MockOfficeService('http://host.com');
      fetch.mockResponseOnce('', { status: 200 });

      return mos.removeBehaviour('server-id').then(done);
    });
  });

  describe('.getState', () => {
    it('should return resolved promise on response status 200', done => {
      const mos = new MockOfficeService('http://host.com');
      const resPayload = {
        servers: [{ server: 'server' }]
      };
      fetch.mockResponseOnce(JSON.stringify(resPayload), { status: 200 });

      return mos.getState('server-id').then(payload => {
        expect(payload).toEqual(resPayload);
        done();
      });
    });
  });
});
