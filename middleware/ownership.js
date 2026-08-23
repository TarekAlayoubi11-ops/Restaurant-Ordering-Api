const ownership = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required"
    });
  }

  if (req.user.role === "admin") {
    return next();
  }

  if (req.user.sub !== req.params.id) {
    return res.status(403).json({
      message: "You can only access your own account"
    });
  }

  next();
};

module.exports = ownership;