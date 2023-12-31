import { useRef, useState } from "react";

export function Navigation({valueP, onClickdata, onChange}) {

  const [nameP, setNameP] = useState('');

  const enterPress = (event) => {
    if(event.key === 'Enter' && nameP !== ''){
      getPoke()
    }
  }

  const getPoke = async () => {
    try {
      const resp = await fetch("https://pokeapi.co/api/v2/pokemon/" + nameP.toLocaleLowerCase());
      const data = await resp.json();
      const { name, sprites, id, types, height, weight, abilities, stats } = data;
      
        const selectedData = {
          name,
          sprite: sprites.front_default, // Puedes ajustar esto según la estructura de sprites
          id,
          types,
          height,
          weight,
          abilities,
          stats,
        };
       onClickdata(selectedData);
      console.log(selectedData);
      setNameP('');
    } catch (error) {
      console.log(error);
    }
  };

  const debounceRef = useRef();

  const onQueryChanged = (e) => {
     if (debounceRef.current) {
        clearTimeout(debounceRef.current);
     }

     debounceRef.current = setTimeout(() => {
        //console.log('values mi king: ', e.target.value);
        onChange(e.target.value)
     }, 1000);
  }

  return (
    <div className="w-full  my-10 ">
      <div className="w-full h-16 bg-white dark:bg-[#333333] flex flex-row items-center rounded-xl px-4 shadow-xl">
        <input
          className="outline-none w-full rounded-xl text-black dark:text-white dark:bg-[#333333] sm:text-xl"
          type="text"
          name=""
          id=""
          placeholder="Search your Pokemon"
         
          onChange={e => onQueryChanged(e)}
          onKeyDown={enterPress}
        />
        <div>
          <button
            className="bg-[#FF5350] h-10 w-10 flex justify-center items-center rounded-xl text-white shadow-[rgba(0,0,0.1,0.1)_10px_5px_4px_0px]  shadow-[#ff535088]"
            type="button"
            onClick={getPoke}
            name="search-button"
            title="serach-button"
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
