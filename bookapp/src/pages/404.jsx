function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-black text-white py-4">
        <h1 className="text-2xl">404 - Not Found</h1>
      </header>
      <main className="flex-1 flex justify-center items-center">
        <section className="text-center">
          <p className="text-lg">Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
        </section>
      </main>
      <footer className="bg-black text-white py-4 text-center">
        <p>&copy; 2024 Soumya Deep Sarkar. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default NotFound;
