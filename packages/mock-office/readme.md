# Mock Office

![travis build status](https://travis-ci.org/xclix/mock-office.svg?branch=master) ![npm version](https://badge.fury.io/js/mock-office.svg) [![Coverage Status](https://coveralls.io/repos/github/xclix/mock-office/badge.svg?branch=master)](https://coveralls.io/github/xclix/mock-office?branch=master)

**Tool for running mock servers locally to faciliate frontend development.**

* Create and run multiple **HTTP** and **Web Socket** servers instantly.
* Cover complex scenarios, including delays, backend error responses, custom headers etc.
* Run it locally or on shared resources, CI.

## Table of contents:
1. [Installation](#installation)
1. [Usage](#usage)
1. [Adding expectations](#adding-expectations)
1. [Test](#test)

## Instalation

Install from npm:
```sh
$ npm run install mock-office -g
```

## Usage

```sh
$ mock-office [server type] [parameters]
```

CLI parameters:

**server type** - http or ws

**--src, -s** - path to file with mocks

**--port, -p** - port to listen (default 3000)

## Adding expectations

Admin REST server starts along with mock server on port (server port + 1).

POST `/expectation`

 **Http server**

Example: 
```js
{
    "request": {
        // matchers
    },
    "response": {
        // params
    }
}
```

**Request matchers:**

* **headers** - Object - key-value pairs of HTTP headers

* **method** - String - HTTP method

* **path** - String - url path

**Response parameters:**

* **headers** - Object - key-value pairs of HTTP headers

* **status** - Number - HTTP status code

* **body** - String - stringified body content

* **delay** - Number - delay time in ms

**Web socket server**

```js
{
    "connection": {
       // matchers
    },
    // or "incomingMessage": {}
    "messages": [
        {
            //params
        }, // ...
    ]
}
```

#### connection matchers

// no matchers at the moment

#### incomingMessage matchers:

* **body** - String - message body

#### message parameters:

* **delay** - Number - delay time in ms

* **interval** - Number - interval time in ms

* **body** - String - plain text body content

## Test

To run tests:

`$ npm test`
