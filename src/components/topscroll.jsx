export function TopScroll() {

  function topScroll() {
    window.scrollTo(0, 0);
  }

  return (
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
  )
}