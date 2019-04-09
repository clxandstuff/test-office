import serversHub from '../../serversHub';
import ajv from '../ajv';

export default function removeBehaviourMiddleware(req, res) {
  const schema = {
    properties: {
      behaviourId: {
        type: 'string'
      },
      serverId: {
        type: 'string'
      }
    },
    required: ['behaviourId', 'serverId']
  };

  if (!ajv.validate(schema, req.body)) {
    res.json(ajv.errors);
    return;
  }

  const server = serversHub.getServer(req.body.serverId);

  if (!server) {
    res.status(400).end();
    return;
  }

  if (server.webServer.codex.removeBehaviour(req.body.behaviourId)) {
    res.status(200).end();
  } else {
    res.status(404).end();
  }
}
