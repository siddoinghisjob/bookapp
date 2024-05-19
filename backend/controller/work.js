const { get } = require("../model/reviews");

const work = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await fetch("https://openlibrary.org/books/" + id + ".json");
    const jsondata = await data.json();
    let publishers = jsondata?.publishers;
    if (publishers?.length > 0) publishers = publishers[0];
    const title = jsondata.title;
    let desc = jsondata?.description;
    if (desc) {
      if (desc?.value) desc = desc?.value;
    } else desc = "No description available";
    let authors = jsondata.authors;
    let arr = [];
    if (authors?.length > 0) {
      const call = authors.map(async (author) => {
        const fc = await fetch("https://openlibrary.org" + author.author.key + ".json");
        const res = await fc.json();
        return res.name;
      });
      arr = await Promise.all(call);
    }
    authors = arr;
    let photo = jsondata?.covers,
      tmp = "";
    if (photo?.length > 0) {
      tmp = "https://covers.openlibrary.org/b/id/" + photo[0] + "-M.jpg";
    }
    photo = tmp;
    const pages = jsondata.number_of_pages;
    let lang = jsondata?.languages;
    tmp = "";
    if (lang?.length > 0) {
      const fc = await fetch("https://openlibrary.org" + lang[0].key + ".json");
      const result = await fc.json();
      tmp = result.name;
    }
    lang = tmp;
    const date = jsondata.publish_date || jsondata.first_publish_date;
    let review = await get(id); 

    const resdata = {
      title: title,
      desc: desc.replace(/(?:https?|ftp):\/\/[\n\S]+/g, ''),
      authors: [...new Set(authors)],
      photo: photo,
      pages: pages,
      lang: lang,
      date: date,
      reviews : review.reviews,
      rating: review.rating
    };
    res.status(200).json({
      success: true,
      data: resdata,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
    });
  }
};

module.exports = work;
