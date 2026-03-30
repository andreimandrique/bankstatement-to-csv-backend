const getDashboard = (req, res) => {
  res.render("dashboard", { error: null });
};

export { getDashboard };
