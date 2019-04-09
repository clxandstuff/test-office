import serversHub from '../../serversHub';
import ajv from '../ajv';

export default function stopServerMiddleware(req, res) {
  const schema = {
    properties: {
      id: {
        type: 'string'
      }
    },
    required: ['id']
  };

  if (ajv.validate(schema, req.body)) {
    serversHub
      .getServer(req.body.id).webServer
      .stop()
      .then(
        () => {
          res.status(200).json({ id: req.body.id });
        },
        (err) => {
          res.status(400).json({ error: err.message });
        }
      );
  } else {
    res.status(400).json({ error: ajv.errors[0].message });
  }
}
