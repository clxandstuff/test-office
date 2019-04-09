import { expectationToResponse } from './transformers';

export default server => (req, res) => {
  res.status(200).json(server.expectations.map(expectationToResponse));
};
