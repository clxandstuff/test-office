import serversHub from '../../serversHub';
import { serverToResponse } from './transformers';

export default function exportMiddleware(req, res) {
  res
    .set({
      'Content-Type': 'text/plain',
      'Content-Disposition': 'attachment; filename=export.json'
    })
    .write(JSON.stringify(serversHub.getServers().map(serverToResponse)), 'utf-8', () => {
      res.end();
    });
}
