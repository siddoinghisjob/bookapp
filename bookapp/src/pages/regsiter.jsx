import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  const [msg, setMsg] = useState("");
  const [code, setCode] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const form = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(import.meta.env.VITE_API + "/register", {
        method: "POST",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": import.meta.env.VITE_API,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setMsg("User registered successfully!");
        setCode(false);
        window.location.href = "/login";
      } else {
        setMsg("Registration failed.");
        setCode(true);
      }
    } catch (error) {
      setMsg("Error registering user:", error);
      setCode(true);
    } finally {
      setLoader(false);
    }
  };
  console.log(msg);
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-black text-white p-4">
        <h1 className="text-2xl">Register</h1>
      </header>
      <main className="flex-1 flex w-full justify-center items-center p-5">
        <form
          onSubmit={handleSubmit}
          className="text-center w-full md:w-1/3 flex flex-col"
        >
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            value={formData.username}
            required
            className="border border-gray-400 rounded-lg px-4 py-2 mb-4 w-full"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            required
            className="border border-gray-400 rounded-lg px-4 py-2 mb-4 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            required
            className="border border-gray-400 rounded-lg px-4 py-2 mb-4 w-full"
          />
          <div className="w-full">
            {!loader && (
              <button
                type="submit"
                className={`bg-black w-full text-white py-2 px-6 rounded-lg hover:bg-gray-900`}
              >
                Register
              </button>
            )}
            {loader && (
              <p className="w-full flex justify-center">
                <img className="h-10 w-10" src="/loading-gif.gif" />
              </p>
            )}
          </div>
          <p className="w-full text-center">
            Already have a account?{" "}
            <a className="underline decoration-dotted" href="/login">
              Login
            </a>
          </p>
          {msg && <p className={`w-full p-4 rounded-2xl shadow-inner mt-5 ${code ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
            {msg}
          </p>}
        </form>
      </main>
      <footer className="bg-black text-white py-4 text-center">
        <p>&copy; 2024 Soumya Deep Sarkar. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Register;
