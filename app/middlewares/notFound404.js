// This middleware will handle the 404 error and respond to all routes that are not found by the router

module.exports = (req, res) => {
  res.status(404).send('Oups vous vous êtes perdu !');
};