"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function TopScroll() {
  const [show, setShow] = useState("hidden");

  const pathName = usePathname();
  function topScroll() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    window.addEventListener("scroll", function () {
      updateBackToTopVisibility();
    });
  }, []);

  function updateBackToTopVisibility() {
    setShow(window.scrollY > window.innerHeight ? "flex" : "hidden");

    /* if(window.scrollY > window.innerHeight) {
        document.getElementById('back-to-top-button').classList.remove('hide');
    } else {
        document.getElementById('back-to-top-button').classList.add('hide');
    }; */
  }

  return (
    <>
      {pathName === "/trivia" ? (
        <></>
      ) : (
        <div
          onClick={topScroll}
          className={`${show} sticky w-12 h-12 px-2 py-4  justify-center items-center bg-white rounded-lg float-right bottom-10 right-10 cursor-pointer`}
        >
          <img
            className="w-10"
            src="https://js-pokedex-virid.vercel.app/src/arrow-up-icon.png"
            alt=""
          />
        </div>
      )}
    </>
  );
}
