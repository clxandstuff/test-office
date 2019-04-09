export default server => (req, res) => {
  if (!req.body) {
    res.status(400).end();
    return;
  }

  if (server.remove(req.body.behaviourId)) {
    res.status(200).end();
  } else {
    res.status(404).end();
  }
};
