/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import Image from "./image";

export default function Slider(props) {
  const navigate = useNavigate();
  const arr = [];
  const [firstRef, firstInView, firstEntry] = useInView({
    threshold: 0,
  });
  const [lastRef, lastInView, lastEntry] = useInView({
    threshold: 0,
  });
  const winref = useRef();
  const cardGen = (i) => {
    return (
      <span
        key={i}
        onClick={() => {
          if (props?.arr[i]?.link) {
            window.location.href = props?.arr[i]?.link;
          }
        }}
        className={`relative group ${
          props?.arr[i]?.link
            ? "cursor-pointer transition-all hover:scale-110"
            : ""
        } min-h-[10rem] lg:min-w-[20%] max-h-[20rem] min-w-[100%] md:min-w-[50%] lg:max-w-[20%] max-w-[100%] md:max-w-[50%] justify-center items-center`}
      >
        <div className="w-full h-full flex justify-center">
          <Image
            className="w-fit bg-white rounded-xl p-2"
            src={props?.arr[i]?.src}
            alt={props?.arr[i]?.alt}
          />
        </div>
      </span>
    );
  };
  const scrollTo = (parity) => {
    let width = winref.current.clientWidth;
    if (parity > 0) winref.current.scrollLeft += width;
    else if (parity < 0) winref.current.scrollLeft -= width;
  };
  arr.push(
    <span
        key={0}
        ref={firstRef}
        onClick={() => {
          if (props?.arr[0]?.link) {
            navigate(props?.arr[0]?.link)
          }
        }}
        className={`relative group ${
          props?.arr[0]?.link
            ? "cursor-pointer transition-all hover:scale-110"
            : ""
        } min-h-[10rem] lg:min-w-[20%] max-h-[20rem] min-w-[100%] md:min-w-[50%] lg:max-w-[20%] max-w-[100%] md:max-w-[50%] justify-center items-center`}
      >
        <div className="w-full h-full flex justify-center">
          <Image
            className="w-fit bg-white rounded-xl p-2"
            src={props?.arr[0]?.src}
            alt={props?.arr[0]?.alt}
          />
        </div>
      </span>
  );
  for (let i = 1; i < props?.arr?.length - 1; i++) {
    arr.push(cardGen(i));
  }
  if(props?.arr?.length>1){
    let i = props?.arr?.length-1;
    arr.push(
        <span
        key={i}
        ref={lastRef}
        onClick={() => {
          if (props?.arr[i]?.link) {
            navigate(props?.arr[i]?.link)
          }
        }}
        className={`relative group ${
          props?.arr[i]?.link
            ? "cursor-pointer transition-all hover:scale-110"
            : ""
        } min-h-[10rem] lg:min-w-[20%] max-h-[20rem] min-w-[100%] md:min-w-[50%] lg:max-w-[20%] max-w-[100%] md:max-w-[50%] justify-center items-center`}
      >
        <div className="w-full h-full flex justify-center">
          <Image
            className="w-fit bg-white rounded-xl p-2"
            src={props?.arr[i]?.src}
            alt={props?.arr[i]?.alt}
          />
        </div>
      </span>
    )
  }
  return (
    <div className="relative w-full bg-white shadow-xl p-2 overflow-x-auto">
      <div
        className={`${
          !firstInView ? "visible" : "hidden"
        } absolute top-1/2 left-0 bg-black rounded-full z-50 p-2 cursor-pointer opacity-60 hover:opacity-100`}
        onClick={() => scrollTo(-400)}
      >
        <b
          className={`text-white p-0 rotate-180 rounded-full h-10 w-10 flex justify-center items-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            className=""
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            />
          </svg>
        </b>
      </div>
      <div
        ref={winref}
        className="relative justify-start overflow-x-auto overflow-y-hidden md:overflow-hidden scroll-smooth flex"
      >
        {arr}
      </div>
      <div
        className={`${
          !lastInView && props?.arr?.length>1 ? "visible" : "hidden"
        } absolute top-1/2 right-0 bg-black rounded-full z-50 p-2 cursor-pointer opacity-60 hover:opacity-100`}
        onClick={() => scrollTo(400)}
      >
        <b className="text-white p-0 rotate-180 rounded-full h-10 w-10 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            className=""
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
            />
          </svg>
        </b>
      </div>
    </div>
  );
}
