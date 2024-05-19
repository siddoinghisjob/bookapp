import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMsg] = useState();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    fetch(`${import.meta.env.VITE_API}/login`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": import.meta.env.VITE_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          const func = () => (window.location.href = "/dashboard");
          setMsg(
            <div className="relative bg-green-100 rounded-md border-2 border-green-700 font-semibold text-slate-800 px-3 py-1 font-sans">
              Successfully logged in.
              <div className="absolute bg-green-600 top-0 bottom-0 left-0 bg-opacity-50 animate-increase"></div>
            </div>
          );
          func();
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
    <div className="flex flex-col min-h-screen">
      <header className="bg-black text-white p-4">
        <h1 className="text-2xl">Login</h1>
      </header>
      <main className="flex-1 flex flex-col w-full justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col p-4 gap-3">
          <section className="text-center flex md:flex-row flex-col gap-3">
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-400 rounded-lg px-4 py-2 mb-4 w-64"
            />
            <input
              required
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-400 rounded-lg px-4 py-2 mb-4 w-64"
            />
          </section>
          <button
            type={"submit"}
            className={`bg-black  text-white py-2 px-6 rounded-lg hover:bg-gray-90 ${
              loader ? "cursor-wait" : "cursor-pointer"
            }`}
          >
            Login
          </button>
          {message}
          <p className="w-full text-center">
            Don&apos;t have a account? <a href="/register" className="underline decoration-dotted">Register</a>
          </p>
        </form>
      </main>
      <footer className="bg-black text-white py-4 text-center">
        <p>&copy; 2024 Soumya Deep Sarkar. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Login;
