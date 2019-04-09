export class MockOfficeRESTApiError {
  constructor(message) {
    this.message = message;
  }
}

export class ConnectionError extends MockOfficeRESTApiError {
  constructor() {
    super('Internet connection failed.');
  }
}

export class UnsupportedStatusError extends MockOfficeRESTApiError {
  constructor() {
    super('Not recognised reponse from server');
  }
}

export class ServerError extends MockOfficeRESTApiError {}

export class ResourceNotFoundError extends MockOfficeRESTApiError {
  constructor(resourceType) {
    super(`${resourceType} not found.`);
  }
}

export class InvalidRequestError extends MockOfficeRESTApiError {}
