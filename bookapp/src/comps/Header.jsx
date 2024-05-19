import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./search";

export default function Header() {
  const [loader, setLoader] = useState(false);
  const [message, setMsg] = useState();

  const handleLogout = (e) => {
    e.preventDefault();
    setLoader(true);
    fetch(`${import.meta.env.VITE_API}/logout`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": import.meta.env.VITE_API,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          const func = () => (window.location.href = "/");
          setMsg(
            <div className="relative bg-green-100 rounded-md border-2 border-green-700 font-semibold text-slate-800 px-3 py-1 font-sans">
              Successfully logged out.
              <div className="absolute bg-green-600 top-0 bottom-0 left-0 bg-opacity-50 animate-increase"></div>
            </div>
          );
          setTimeout(func, 500);
        } else {
          if (res?.msg) {
            setMsg(
              res?.msg?.map((message, key) => (
                <div
                  key={key}
                  className="p-2 py-1 w-full flex justify-center items-center text-center bg-red-50 text-red-700 rounded-xl border-2 border-rose-700"
                >
                  {message}
                </div>
              ))
            );
          } else {
            setMsg(
              <span className="p-2 py-1 w-full bg-red-50 text-red-700 rounded-xl border-2 border-rose-700">
                Email doesn&apos;t exist.&nbsp;
                <Link to="/signup" className="text-cyan-800 hover:underline">
                  Sign up
                </Link>
              </span>
            );
          }
        }
      })
      .catch((err) => {
        <div className="p-2 py-1 w-full flex justify-center items-center text-center bg-red-50 text-red-700 rounded-xl border-2 border-rose-700">
          Email or password is wrong.
        </div>;
      })
      .finally(() => setLoader(false));
  };
  return (
    <header className="bg-black flex-col text-white p-4 pt-2 w-full flex justify-between gap-2">
      <div className="flex flex-row justify-between">
        <Link to="/dashboard">
          <h1 className="text-3xl font-bold text-center">BookBuff</h1>
        </Link>
        <div className="md:block hidden w-full">
          <Search />
        </div>
        <button
          onClick={handleLogout}
          className={`uppercase text-slate-300 ${
            loader ? "cursor-wait" : "cursor-pointer"
          }`}
        >
          Logout
        </button>
        {message}
      </div>
      <div className="md:hidden block w-full">
        <Search/>
      </div>
    </header>
  );
}
