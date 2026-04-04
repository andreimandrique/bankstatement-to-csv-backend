const getDetail = (req, res) => {
  res.render("detail", { google_id: req.user.sub });
};

export { getDetail };
