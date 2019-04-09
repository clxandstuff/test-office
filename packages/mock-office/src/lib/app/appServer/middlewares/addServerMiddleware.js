import serversHub from '../../serversHub';
import { serverToResponse } from './transformers';
import ajv from '../ajv';

export default function addServerMiddleware(req, res) {
  const schema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 1
      },
      port: {
        type: 'number',
        minimum: 3000
      },
      type: {
        type: 'string',
        enum: ['http', 'ws']
      },
      secure: {
        type: 'boolean'
      },
      keyPath: {
        type: 'string'
      },
      certPath: {
        type: 'string'
      }
    },
    required: [
      'name',
      'type'
    ]
  };

  if (ajv.validate(schema, req.body)) {
    const server = serversHub.add(req.body);

    res.json(serverToResponse(server));

    return;
  }

  const splitPath = ajv.errors[0].dataPath.split('.');
  const param = splitPath[splitPath.length - 1];
  res.status(400).json({ error: `${param} ${[0].message}` });
}
