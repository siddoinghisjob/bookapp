import { useEffect, useState } from "react";
import Slider from "../comps/slider";
import Search from "../comps/search";

function Dashboard() {
  const [images, setImages] = useState([]);

  const [msg, setMsgs] = useState();
  const [Imgloader, setImgLoader] = useState();

  const fetchImages = () => {
    setImgLoader(true);
    fetch(`${import.meta.env.VITE_API}/images/1`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": import.meta.env.VITE_API,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg) setMsgs("Error occured.");
        else setImages(res.data);
      })
      .catch((err) => setMsgs("Error occured."))
      .finally(() => setImgLoader(false));
  };


  useEffect(() => fetchImages(1), []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="w-full p-5 h-full linearGradient text-white">
        <h1 className=" font-semibold text-5xl  p-10 text-center">
          Welcome to BookBUFF!
        </h1>
      </div>
      <div className="w-full z-50 flex-1 px-5 pb-3 rounded-lg bg-gray-200 flex flex-col justify-start h-full">
        <h1 className=" text-black font-bold text-2xl text-center p-5">
          Trending
        </h1>
        {Imgloader ? (
          <span className="w-full h-full flex justify-center items-center">
            <img className="h-20 w-20" src="/loading-gif.gif" />
          </span>
        ) : msg ? (
          msg
        ) : (
          <Slider arr={images} />
        )}
      </div>
      {msg}
    </div>
  );
}

export default Dashboard;
