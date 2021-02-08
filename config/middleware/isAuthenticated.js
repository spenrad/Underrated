module.exports = function(req, res, next) {

  if (req.user) {
    return next();
  }

  return res.json({err: true});
};
