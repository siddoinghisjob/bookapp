import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../contextProvider";

function Home() {
  const user = useContext(Context)?.user;
  return (
    <div className="flex flex-col min-h-screen h-full w-full">
      <header className="bg-black text-white p-4">
        <h1 className="text-2xl">Home</h1>
      </header>
      <main className="flex-1 flex justify-center items-center">
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to BookBuff!</h2>
          <p className="text-lg mb-8">Click one of them to enter</p>
          {!user?.success && <div className="flex justify-center">
            <Link to="/login" className="bg-black text-white py-2 px-6 mr-4 rounded-lg hover:bg-gray-900">Login</Link>
            <Link to = "/register" className="bg-white text-black py-2 px-6 rounded-lg hover:bg-gray-200">Register</Link>
          </div>}
          {user?.success && <div className="flex justify-center w-full h-full items-center">
            <Link to = "/dashboard" className="bg-black text-white py-2 px-6 mr-4 rounded-lg hover:bg-gray-900">Dashboard</Link>
          </div>}
        </section>
      </main>
      <footer className="bg-black text-white py-4 text-center">
        <p>&copy; 2024 Soumya Deep Sarkar. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
