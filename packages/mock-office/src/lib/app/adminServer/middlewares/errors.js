/* eslint-disable no-unused-vars */
/* this needs to have 4 parameters to be recognized as error handler */
export default (err, req, res, next) => {
  /* eslint-enable no-unused-vars */
  res.status(500).send(err.stack);
};
