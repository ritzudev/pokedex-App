"use client";

import "./globals.css";

export const metadata = {
  title: "Pokedex - Ritzudev",
  description: "Pokedex development by Ritzudev",
};

export default function RootLayout({ children }) {
  function topScroll() {
    window.scrollTo(0, 0);
  }

  return (
    <html lang="en">
      <head>
      <title>Pokedex App</title>
      </head>
      <body>
        {/* <Navigation /> */}
        {children}
        <div
          onClick={topScroll}
          className="sticky w-12 h-12 px-2 py-4 flex justify-center items-center bg-white rounded-lg float-right bottom-10 right-10 cursor-pointer"
        >
          <img
            className="w-10"
            src="https://js-pokedex-virid.vercel.app/src/arrow-up-icon.png"
            alt=""
          />
        </div>
      </body>
    </html>
  );
}