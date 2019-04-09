import Ajv from 'ajv';
import BaseExpectation from '../BaseExpectation';

const ajv = new Ajv();
const expectationSchema = {
  type: 'object',
  properties: {
    path: {
      type: 'string'
    },
    method: {
      type: 'string'
    },
    headers: {
      type: 'object'
    }
  }
};

const actionSchema = {
  type: 'object',
  properties: {
    headers: {
      type: 'object'
    },
    status: {
      type: 'number'
    },
    body: {},
    delay: {
      type: 'number'
    }
  }
};

export default class Expectation extends BaseExpectation {
  constructor(expectation, match, actions) {
    if (!ajv.validate(expectationSchema, expectation)) {
      throw new Error(
        ajv.errors.map(e => `${e.dataPath} ${e.message}`).join('; ')
      );
    }

    actions.forEach(action => {
      if (!ajv.validate(actionSchema, action)) {
        throw new Error(
          ajv.errors.map(e => `${e.dataPath} ${e.message}`).join('; ')
        );
      }
    });
    super(match, actions);
  }
}