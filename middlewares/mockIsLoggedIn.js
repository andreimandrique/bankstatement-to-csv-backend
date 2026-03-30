const mockIsLoggedIn = (req, res, next) => {
  req.user = {
    sub: "100899178136072953385",
    email: "andrei@gmail.com",
  };
  req.isAuthenticated = () => true;
  next();
};

export default mockIsLoggedIn;
