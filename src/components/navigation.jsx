"use client"

export function Navigation() {
  const getPoke = async ({ name = "charizard" }) => {
    try {
      const resp = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
      const data = await resp.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full  my-10 ">
      <div className="w-full h-16 bg-white dark:bg-[#333333] flex flex-row items-center rounded-xl px-4 shadow-xl">
        <input
          className="outline-none w-full rounded-xl text-black dark:text-white dark:bg-[#333333] sm:text-xl"
          type="text"
          name=""
          id=""
          placeholder="Search your Pokemon"
        />
        <div>
          <button
            className="bg-[#FF5350] h-10 w-10 flex justify-center items-center rounded-xl text-white shadow-[rgba(0,0,0.1,0.1)_10px_5px_4px_0px]  shadow-[#ff535088]"
            type="button"
            onClick={getPoke}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-search"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
              <path d="M21 21l-6 -6"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* <picture>
          <img src="https://e1.pngegg.com/pngimages/964/97/png-clipart-pokemon-sun-and-moon-rendered-logos-pokemon-sun-logo-thumbnail.png" alt="" />
        </picture> */}
    </div>
  );
}
