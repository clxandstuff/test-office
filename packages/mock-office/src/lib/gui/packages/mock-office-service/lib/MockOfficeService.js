import {
  ConnectionError,
  UnsupportedStatusError,
  ResourceNotFoundError,
  InvalidRequestError
} from './errors';
import { ServerError } from './index';

export default class MockOfficeService {
  constructor(host) {
    if (!host) {
      throw new Error('Missing host parameter');
    }

    this.host = host;
    this.getState = this.getState.bind(this);
  }

  static fetch(...args) {
    if (!args.length) {
      throw new TypeError('Argument required, but only 0 present');
    }

    return fetch(...args)
      .catch(() => {
        throw new ConnectionError();
      })
      .then(res => {
        if (res.status === 500) {
          return res.json().then(({ error }) => {
            throw new ServerError(error);
          });
        }

        return res;
      });
  }

  addServer(params) {
    return MockOfficeService.fetch(`${this.host}/add-server`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(params)
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 400) {
        return res.json().then(({ error }) => {
          throw new InvalidRequestError(error);
        });
      }

      throw new UnsupportedStatusError(res.status);
    });
  }

  addBehaviour(serverId, behaviour) {
    return MockOfficeService.fetch(`${this.host}/add-behaviour`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ serverId, behaviour })
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 400) {
        return res.json().then(({ error }) => {
          throw new InvalidRequestError(error);
        });
      }

      throw new UnsupportedStatusError(res.status);
    });
  }

  getBehaviour(serverId, behaviourId) {
    return MockOfficeService.fetch(
      `${this.host}/behaviour?id=${behaviourId}&server=${serverId}`,
      {
        headers: {
          Accept: 'application/json, text/plain, */*'
        }
      }
    ).then(res => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 400) {
        return res.json().then(({ error }) => {
          throw new InvalidRequestError(error);
        });
      } else if (res.status === 404) {
        throw new ResourceNotFoundError('Behaviour');
      }

      throw new UnsupportedStatusError(res.status);
    });
  }

  startServer(id) {
    return MockOfficeService.fetch(`${this.host}/start-server`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then(res => {
      if (res.status === 200) {
        return Promise.resolve();
      } else if (res.status === 400) {
        return res.json().then(({ error }) => {
          throw new InvalidRequestError(error);
        });
      } else if (res.status === 404) {
        throw new ResourceNotFoundError('Server');
      }

      throw new UnsupportedStatusError(res.status);
    });
  }

  stopServer(id) {
    return MockOfficeService.fetch(`${this.host}/stop-server`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then(res => {
      if (res.status === 200) {
        return Promise.resolve();
      } else if (res.status === 400) {
        return res.json().then(({ error }) => {
          throw new InvalidRequestError(error);
        });
      } else if (res.status === 404) {
        throw new ResourceNotFoundError('Server');
      }

      throw new UnsupportedStatusError(res.status);
    });
  }

  removeServer(id) {
    return MockOfficeService.fetch(`${this.host}/remove-server`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then(res => {
      if (res.status === 200) {
        return Promise.resolve();
      } else if (res.status === 400) {
        return res.json().then(({ message }) => {
          throw new InvalidRequestError(message);
        });
      } else if (res.status === 404) {
        throw new ResourceNotFoundError('Server');
      }

      throw new UnsupportedStatusError(res.status);
    });
  }

  editServer(serverId, params) {
    return MockOfficeService.fetch(`${this.host}/edit-server`, {
      method: 'POST',
      body: JSON.stringify(Object.assign({ id: serverId }, params)),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 400) {
        return res.json().then(({ message }) => {
          throw new InvalidRequestError(message);
        });
      } else if (res.status === 404) {
        throw new ResourceNotFoundError('Server');
      }

      throw new UnsupportedStatusError(res.status);
    });
  }

  removeBehaviour(behaviourId, serverId) {
    return MockOfficeService.fetch(`${this.host}/remove-behaviour`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ behaviourId, serverId })
    }).then(res => {
      if (res.status === 200) {
        return Promise.resolve();
      } else if (res.status === 400) {
        return res.json().then(({ message }) => {
          throw new InvalidRequestError(message);
        });
      } else if (res.status === 404) {
        throw new ResourceNotFoundError('Behaviour');
      }

      throw new UnsupportedStatusError(res.status);
    });
  }

  getState() {
    return MockOfficeService.fetch(`${this.host}/state`, {
      headers: { Accept: 'application/json, text/plain, */*' }
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      }

      throw new UnsupportedStatusError(res.status);
    });
  }

  importState(state) {
    return MockOfficeService.fetch(`${this.host}/import`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      }

      throw new InvalidRequestError(res.error);
    });
  }
}
