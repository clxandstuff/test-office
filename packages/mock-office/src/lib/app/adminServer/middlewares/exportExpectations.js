import { serverToResponse } from './transformers';

export default server => (req, res) => {
  res
    .set({
      'Content-Type': 'text/plain',
      'Content-Disposition': 'attachment; filename=export.json'
    })
    .write(JSON.stringify(serverToResponse(server)), 'utf-8', () => {
      res.end();
    });
};
