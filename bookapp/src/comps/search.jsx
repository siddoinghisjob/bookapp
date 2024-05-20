import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Image from "./image";

export default function Search() {
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sLoader, setSLoader] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    setSLoader(true);
    setSuggestions([]);
    fetch(`${import.meta.env.VITE_API}/search/` + search, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": import.meta.env.VITE_API,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setSuggestions(res.data);
        else setSuggestions([]);
      })
      .catch((e) => setError("Error on server side."))
      .finally(() => setSLoader(false));
  }, [search]);
  return (
    <div className="w-full relative flex justify-center items-center">
      <input
        type="search"
        className="md:w-2/3 w-full h-12 p-3 rounded-full text-black"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      {search?.length > 0 && (
        <div className="absolute shadow-md z-[999] flex justify-start flex-col items-center bg-white top-12 rounded-2xl p-5 text-black md:w-2/3 w-full max-h-96 overflow-auto">
          {sLoader && <div>Loading....</div>}
          {!sLoader &&
            suggestions?.map((it, key) => {
              return (
                <Link
                  to={"/book" + it.key}
                  key={key}
                  className="w-full  h-full border-b-2 shadow-inner"
                >
                  <span className="grid min-h-24 max-h-24 gap-2 border-2 grid-cols-suggest">
                    <Image
                      alt={it.title ? it.title : "No Title"}
                      src={it.cover_i}
                    />
                    <h1>
                      {it.title ? it.title : "No Title"} |{" "}
                      {it.author_name?.length > 0 ? it.author_name[0] : ""}
                    </h1>
                  </span>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
}
