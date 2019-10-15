# `pocket-server`

Simple mock server as a node module. Helpful for development, testing purposes.

## Usage

### Response for all requests

```js
const start = require('pocket-server');

// response for all requests

server.start(3000, [{
  response: {
    body: 'response body'
  }
}], config);
```


### Filtering by path

```js
const start = require('pocket-server');

// response for all requests

server.start(3000, [{
  request: {
    path: '/page'
  }
  response: {
    body: 'page content'
  }
}], config);
```

### Error response

```js
const start = require('pocket-server');

// response for all requests

server.start(3000, [{
  request: {
    path: '/submit'
  }
  response: {
    status: 400,
    body: 'Invalid data'
  }
}], config);
```


### JSON response

```js
const start = require('pocket-server');

// response for all requests

server.start(3000, [{
  request: {
    path: '/user'
  }
  response: {
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      name: 'John',
      age: 21
    }
  }
}], config);
```

### start(port, mocks, config)

**port** - Number - port to listen

**mocks** - Array - array of mocks

**config** - Object - configuration object

