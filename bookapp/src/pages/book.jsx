import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRating from "../comps/rater";
import Image from "../comps/image";

export default function Book() {
  const param = useParams();
  const [rating, setRating] = useState(0);
  const [data, setData] = useState("");
  const [loader, setLoader] = useState(false);
  const [Reviewloader, setReviewLoader] = useState(false);
  const [ReviewMessage, setReviewMessage] = useState("");
  const [review, setReview] = useState("");
  const id = param.id;
  const call = () => {
    setLoader(true);
    fetch(`${import.meta.env.VITE_API}/work/` + id, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": import.meta.env.VITE_API,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setData(res.data);
        }
      })
      .finally(() => setLoader(false));
  };

  const handleReview = () => {
    setReviewLoader(true);
    fetch(`${import.meta.env.VITE_API}/review/`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": import.meta.env.VITE_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: review,
        rating: rating,
        oid: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setReviewMessage(
            <div className="w-full h-full bg-gray-50 p-5 border-b-2">
              <span className="border-b-2 flex flex-row justify-between w-full">
                <p>Me</p>
                <p>{rating / 5}</p>
              </span>
              <span>{review}</span>
            </div>
          );
        } else {
          setReviewMessage(
            <span className="w-full border-2 rounded-xl py-2 px-4">
              {" "}
              Error.
            </span>
          );
        }
      })
      .finally(() => setReviewLoader(false));
  };

  useEffect(call, []);
  return (
    <div
      className={`relative p-5 overflow-x-hidden h-full w-full flex flex-1 flex-col gap-5 bg-gray-100`}
    >
      <div
        className={`absolute ${
          loader ? "block" : "hidden"
        } bg-black top-0 bottom-0 left-0 z-10 right-0 bg-opacity-70 flex justify-center items-center`}
      >
        <div className="bg-white rounded-xl font-semibold p-5">Loading...</div>
      </div>
      <div className="text-black flex-1 w-full bg-white shadow-2xl h-full rounded-3xl p-5">
        <div className="grid md:grid-cols-books w-full">
          <div className="w-full flex items-center justify-center flex-col">
            <Image src={data.photo} alt={data.title} className="border-2 w-48 rounded-lg" />
            <div className="gap-5">
              <div className="text-center font-semibold w-full">
                {data.rating}/5
              </div>
            </div>
          </div>
          <div className="flex-col w-full flex">
            <div className="flex w-full flex-1 p-5 flex-col">
              <h1 className="text-2xl flex flex-col font-semibold justify-center w-full items-center">
                <span className="font-serif text-left">{data.title}</span>
                <span className="font-serif flex flex-row gap-2">
                  by{" "}
                  {
                    <>
                      {data.authors?.map((it, key) => (
                        <h1 key={key}>{it},&nbsp;</h1>
                      ))}
                    </>
                  }
                </span>
              </h1>
              <div className="text-lg p-5 flex-1 flex flex-col">
                {data.desc}
              </div>
              <span className="flex flex-wrap gap-3">
                <span className="w-fit p-3 border-2 rounded-xl">
                  Language : {data?.lang ? data.lang : "Unavailable"}
                </span>
                <span className="w-fit p-3 border-2 rounded-xl">
                  Pages : {data?.pages ? data.pages : "Unavailable"}
                </span>
                <span className="w-fit p-3 border-2 rounded-xl">
                  Publising Date : {data?.date ? data.date : "Unavailable"}
                </span>
                <span className="w-fit p-3 border-2 rounded-xl">
                  Publisher : {data?.publisher ? data.publisher : "Unavailable"}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-black flex-1 grid place-items-center gap-4 md:grid-cols-review bg-white shadow-2xl h-full rounded-3xl p-5">
        <div className="grid place-items-center w-full h-full gap-3">
          <StarRating setRating={setRating} rating={rating} />
          <textarea
            onChange={(e) => setReview(e.target.value)}
            className="border-2 w-full h-full rounded-lg"
          />
          <button
            onClick={handleReview}
            className={`${Reviewloader?'cursor-wait':''}w-full rounded-md bg-rose-500 border-red-600 visible border-2`}
          >
            Submit
          </button>
        </div>
        <div className="flex h-full w-full flex-col justify-center items-center md:pl-10 rounded-2xl">
          <h1 className="font-semibold w-full text-center text-4xl mb-3">
            Reviews
          </h1>
          <div className="text-black flex justify-center w-full flex-col gap-4 font-medium">
            {ReviewMessage}
            {data?.reviews?.map((review, key) => {
              return (
                <div
                  className="w-full h-full bg-gray-50 p-5 border-b-2"
                  key={key}
                >
                  <span className="border-b-2 flex flex-row justify-between w-full">
                    <p>{review.rating}/5</p>
                  </span>
                  <span>{review.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
