import serversHub from '../../serversHub';
import ajv from '../ajv';

export default function removeServerMiddleware(req, res) {
  const schema = {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      }
    },
    required: ['id']
  };

  if (ajv.validate(schema, req.body)) {
    serversHub.remove(req.body.id)
      .then(
        () => {
          res.status(200).end();
        },
        () => {
          res.status(404).end();
        }
      );
  } else {
    res.status(400).json(ajv.errors[0]);
  }
}
