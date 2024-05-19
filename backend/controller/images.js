const images = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const result = await fetch(
      "https://openlibrary.org/trending/hours.json?hours=24&minimum=3&sort_by_count=false&limit=18&page=" +
        page
    );
    let data = await result.json();
    data = data.works
    const imagesPromise = data.map((item) => {
      const src =
        "https://covers.openlibrary.org/b/olid/" + item.cover_edition_key + '-M.jpg';
      const alt = item.title;
      const link = "/book" + item.key;
      return { src: src, alt: alt, link: link };
    });
    const images = await Promise.all(imagesPromise);
    res.json({data : images, msg : null}).status(200);
  } catch (err) {
    res.status(400).json({msg : "Error"});
  }
};

module.exports = images;
