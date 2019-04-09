import serversHub from '../../serversHub';
import { serverToResponse } from './transformers';

export default function getStateMiddleware(req, res) {
  res.send(serversHub.getServers().map(serverToResponse));
}
