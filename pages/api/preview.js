export default async (req, res) => {
  const { secret } = req.query;

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return res.status(401).send('Error: Invalid token').end();
  }

  try {
    res.setPreviewData(
      { message: 'Exit preview mode by visiting /api/exit-preview/' },
      { maxAge: 60 * 60 }
    ); // The preview mode cookies expire in 1 hour
    res.redirect('/');

    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return res.status(500).end();
  }
};
