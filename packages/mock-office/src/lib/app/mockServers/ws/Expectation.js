import Ajv from 'ajv';
import BaseExpectation from '../BaseExpectation';

const ajv = new Ajv();
const eventSchema = {
  type: 'object',
  properties: {
    type: {
      type: 'string'
    },
    message: {
      type: ['string', 'object', 'array', 'number']
    }
  }
};

const messagesSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      body: {
        type: ['string', 'object', 'array', 'number']
      },
      delay: {
        type: 'number'
      },
      interval: {
        type: 'number'
      }
    }
  }
};

export default class Expectation extends BaseExpectation {
  constructor(event, match, messages) {
    if (!ajv.validate(eventSchema, event)) {
      throw new Error(
        ajv.errors.map(e => `${e.dataPath} ${e.message}`).join('; ')
      );
    }

    if (!ajv.validate(messagesSchema, messages)) {
      throw new Error(
        ajv.errors.map(e => `${e.dataPath} ${e.message}`).join('; ')
      );
    }
    super(match, messages);
  }
}
