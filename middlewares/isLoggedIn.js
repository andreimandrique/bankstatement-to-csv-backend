const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/");
  }
  next();
};

export default isLoggedIn;
