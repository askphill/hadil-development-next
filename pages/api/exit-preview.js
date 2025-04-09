export default (req, res) => {
  // Clears the preview mode cookies.
  res.clearPreviewData();
  res.redirect('/');
};
