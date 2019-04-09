import serversHub from '../../serversHub';
import { behaviourToResponse } from './transformers';
import ajv from '../ajv';

const schema = {
  properties: {
    server: {
      type: 'string'
    },
    scenario: {
      type: 'string'
    },
    id: {
      type: 'string'
    }
  },
  required: ['server', 'scenario', 'id']
};

export default function getBehaviourMiddleware(req, res) {
  if (!ajv.validate(schema, req.query)) {
    res.status(400).json(ajv.errors);
    return;
  }

  try {
    const server = serversHub.getServer(req.query.server);

    if (!server) {
      res.status(404).end();
      return;
    }

    const behaviour = server.webServer.codex.getBehaviour(req.query.id);
    if (!behaviour) {
      res.status(404).end();
      return;
    }

    res.status(200).json(behaviourToResponse(behaviour));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
