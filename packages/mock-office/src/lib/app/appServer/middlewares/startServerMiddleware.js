import serversHub from '../../serversHub';
import ajv from '../ajv';

export default function startServerMiddleware(req, res) {
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
      .start()
      .then(
        () => {
          res.status(200).json({ id: req.body.id });
        },
        (err) => {
          res.status(500).json({ error: err });
        }
      );
  } else {
    res.status(400).json({ error: ajv.errors[0].message });
  }
}
