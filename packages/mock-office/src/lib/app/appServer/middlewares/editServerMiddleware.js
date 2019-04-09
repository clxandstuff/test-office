import { omit } from 'ramda';
import serversHub from '../../serversHub';
import { serverToResponse } from './transformers';
import ajv from '../ajv';

export default function editServerMiddleware(req, res) {
  const schema = {
    properties: {
      name: {
        type: 'string',
        minLength: 1
      },
      port: {
        type: 'number',
        minimum: 3000
      },
      recordMode: {
        type: 'boolean'
      },
      id: {
        type: 'string'
      }
    },
    required: ['id']
  };

  if (!ajv.validate(schema, req.body)) {
    const splitPath = ajv.errors[0].dataPath.split('.');
    const param = splitPath[splitPath.length - 1];
    res.status(400).json({ error: `${param} ${ajv.errors[0].message}` });
    return;
  }

  const { id, name, port, recordMode, fallbackUrl } = req.body;
  const server = serversHub.getServer(id);
  if (!server) {
    res.status(404).end();
    return;
  }

  if (name) {
    server.name = name;
  }

  if (fallbackUrl) {
    server.webServer.fallbackUrl = fallbackUrl;
  }

  if (typeof recordMode !== 'undefined') {
    server.webServer.triggerRecordMode(recordMode);
  }

  if (port) {
    server.webServer.changePort(port)
      .then(() => {
        res.status(200).json(omit(['behaviours'], serverToResponse(server)));
      });
  } else {
    res.status(200).json(omit(['behaviours'], serverToResponse(server)));
  }
}
