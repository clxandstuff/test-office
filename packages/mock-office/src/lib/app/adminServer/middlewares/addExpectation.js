export default server => (req, res) => {
  try {
    server.add(req.body);
    res.status(200).end();
  } catch (e) {
    res.status(400).send(e.message);
  }
};
