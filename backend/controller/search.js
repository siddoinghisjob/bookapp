const search = async (req,res) => {
    try{
        const q = req.params.id;
        const fc = await fetch('https://openlibrary.org/search.json?q='+q+'&_spellcheck_count=0&limit=10&fields=key,cover_i,title,subtitle,author_name,name&mode=everything')
        const resdata = await fc.json();
        for(let i = 0; i < resdata.docs.length; i++){
            resdata.docs[i].cover_i = "https://covers.openlibrary.org/b/id/" + resdata.docs[i].cover_i + "-S.jpg"
        }
        res.json({success : true, data : resdata.docs}).status(200);
    }
    catch(e){
        res.json({success : false}).status(400);
    }
};

module.exports = search;