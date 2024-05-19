export default function Loader() {
  return (
    <div className="flex flex-col min-h-screen h-full w-full">
      <header className="bg-black text-white p-4">
        <h1 className="text-2xl">Home</h1>
      </header>
      <main className="flex-1 flex justify-center items-center">
        <section className="h-full w-full flex justify-center items-center">
          <img
            className="bg-white rounded-full p-3 shadow-md animate-pulse"
            src="/loading-gif.gif"
            height={100}
            width={100}
            alt={"Loading..."}
          />
        </section>
      </main>
      <footer className="bg-black text-white py-4 text-center">
        <p>&copy; 2024 Soumya Deep Sarkar. All rights reserved.</p>
      </footer>
    </div>
  );
}
