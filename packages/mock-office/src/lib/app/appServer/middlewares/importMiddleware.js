import serversHub from '../../serversHub';
import { serverToResponse } from './transformers';
import ajv from '../ajv';

const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      behaviours: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            event: {
              type: 'object',
              properties: {
                type: {
                  type: 'string'
                }
              },
              required: ['type']
            },
            reactions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string'
                  }
                },
                required: ['type']
              }
            }
          },
          required: ['reactions', 'event']
        }
      }
    }
  }
};

export default function importMiddleware(req, res) {
  if (!ajv.validate(schema, req.body)) {
    res.status(400).json({ error: `${ajv.errors[0].dataPath} ${ajv.errors[0].message}` });
    return;
  }

  serversHub.import(req.body).then(() => {
    res.json(serversHub.getServers().map(serverToResponse));
  });
}
