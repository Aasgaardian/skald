// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      {/* Header */}
      <header className="py-6 px-8 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">Skald</div>
          <nav>
            <Link
              href="/stories"
              className="px-4 py-2 rounded-md bg-foreground text-background hover:bg-opacity-90 transition"
            >
              Browse Stories
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center px-8 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Immersive Scrollytelling
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-gray-600 dark:text-gray-400">
          Create engaging stories with dynamic, scroll-based animations and interactions
        </p>

        <div className="flex gap-4 flex-col sm:flex-row">
          <Link
            href="/stories"
            className="rounded-full bg-foreground text-background hover:bg-opacity-90 transition flex items-center justify-center gap-2 px-6 py-3 text-lg font-medium"
          >
            Explore Stories
          </Link>

          <a
            href="https://www.sanity.io/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-solid border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition flex items-center justify-center px-6 py-3 text-lg font-medium"
          >
            Documentation
          </a>
        </div>

        <div className="mt-20 max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Create</h3>
              <p>Build your story in Sanity Studio with customizable sections and elements</p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Design</h3>
              <p>Add animations, transitions, and interactive elements to bring your story to life</p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Share</h3>
              <p>Publish and share your scrollytelling experiences with the world</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-8 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Skald Scrollytelling
          </p>
          <div className="flex gap-4">
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            >
              Built with Next.js
            </a>
            <a
              href="https://sanity.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            >
              Powered by Sanity
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}