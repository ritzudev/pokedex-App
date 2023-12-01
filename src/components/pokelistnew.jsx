"use client";


import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function PokeListNew({onClick}) {
  const [currentList, setCurrentList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [maxIndex, setMaxIndex] = useState(20); 
  const [currentShow, setCurrentShow] = useState(0); 

  const typeColors = {
    normal: "#BCBCAC",
    fighting: "#BC5442",
    flying: "#669AFF",
    poison: "#AB549A",
    ground: "#DEBC54",
    rock: "#BCAC66",
    bug: "#ABBC1C",
    ghost: "#6666BC",
    steel: "#ABACBC",
    fire: "#FF421C",
    water: "#2F9AFF",
    grass: "#78CD54",
    electric: "#FFCD30",
    psychic: "#FF549A",
    ice: "#78DEFF",
    dragon: "#7866EF",
    dark: "#785442",
    fairy: "#FFACFF",
    shadow: "#0E2E4C",
  };

  const getAllPokemons = async () => {
    let pokemones = [];
    try {
      const resp = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=200");
      const data = await resp.json();
      console.log(data);

      data.results.map((pokemon, i) => {
        pokemones.push({
          id: i + 1,
          name: pokemon.name,
          types: [],
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
            i + 1
          }.svg`,
        });
      });

      return pokemones;
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    } /* finally {
      getAllTypes();
    } */
  };

  const getAllTypes = async () => {
    let allPokes = await getAllPokemons();
    try {
      for (let i = 1; i <= 18; i++) {
        let url = "https://pokeapi.co/api/v2/type/" + i;
        let response = await fetch(url);
        let responseAsJson = await response.json();

        const pokemonInType = responseAsJson.pokemon;
        //console.log(pokemonInType);
        for (let j = 0; j < pokemonInType.length; j++) {
          //console.log(pokemonInType[j].pokemon.url);
          const pokemonId = pokemonInType[j].pokemon.url
            .replace("https://pokeapi.co/api/v2/pokemon/", "")
            .replace("/", "");
          //console.log(pokemonId === 2);
          if (pokemonId <= allPokes.length && allPokes[pokemonId]) {
            allPokes[pokemonId - 1].types.push({ name: responseAsJson.name });
          }
        }
      }
    } catch (error) {
      console.error("pipipi", error);
    } finally {
      //console.log('pokes',allPokes);
      setCurrentList(allPokes);
    }
  };

  useEffect(() => {
    getAllTypes();
  }, []);

  const increaseMaxIndex = (by) => {
    if (maxIndex + by <= currentList.length) {
      // console.log(maxIndex);
     // maxIndex += by;
     setMaxIndex((prevMaxIndex) => prevMaxIndex + by);
      console.log("1", maxIndex, currentList.length);
      // console.log('2',maxIndex);
    } else {
      console.log("nop", maxIndex);
      setMaxIndex(currentList.length);
      //maxIndex = currentList.length - 1;
      //setHasMore(false);
    }
  };

  /* function updatePokemonList() {
    if (currentShow <= maxIndex) {
      //console.log("2", currentShow, maxIndex);
      renderPoke(currentShow);
    }
  } */

  const more = () => {
    console.log('llamame mrd');
    if (currentList.length === 0) {
      //setHasMore(false);
    } else {
      increaseMaxIndex(30);
      //updatePokemonList();
    }
  };


  useEffect(() => {
    if (currentShow === maxIndex) {
      more();
    }
  }, [currentShow]);


  const PokeCard = ({ id, types, name, sprite }) => {
    return (
      <section
        key={id}
        className="w-full h-44 group  relative font-mono  shadow-xl rounded-2xl mb-4"
        onClick={()=> onClick({id, types, name, sprite})}
      >
        <div className="w-full h-[140px] flex justify-end pb-4 items-center flex-col  group-hover:border-2 group-hover:border-gray-400 bg-white dark:bg-[#333333] absolute bottom-0 rounded-2xl transition-all duration-100 ease-in cursor-pointer">
          <span className="text-[#8F9396] text-xs font-bold">N° {id}</span>
          <span className="font-bold text-xl dark:text-white">{name}</span>
          <div className="flex gap-4 mt-2">
            {types.map(({ name }, index) => (
              <span
                key={index}
                style={{ backgroundColor: typeColors[name] }}
                className=" px-2 py-1 rounded-md text-white text-sm"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
        <picture>
          <img
            style={{ imageRendering: "pixelated" }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 group-hover:scale-[1.15] transition-all duration-100 ease-in h-28 max-w-28 mx-auto"
            src={sprite}
            alt=""
          />
        </picture>
      </section>
    );
  };

  /* function renderPoke(index) {
    //console.log('pipipi',index);
    if (currentList[index]) {

      const poke = currentList[index];
    const container = document.getElementById("pokedex-list-render-container");

     ReactDOM.render(
      <PokeCard key={poke.id}
      id={poke.id}
      name={poke.name}
      types={poke.types}
      sprite={poke.sprite} />,
      container
    ) 

      document
        .getElementById("pokedex-list-render-container")
        ?.insertAdjacentHTML(
          "beforeend",
          `<section
        key={id}
        className="w-full h-44 group  relative font-mono  shadow-xl rounded-2xl mb-4"
      >
        <div className="w-full h-[140px] flex justify-end pb-4 items-center flex-col  group-hover:border-2 group-hover:border-gray-400 bg-white dark:bg-[#333333] absolute bottom-0 rounded-2xl transition-all duration-100 ease-in cursor-pointer">
          <span className="text-[#8F9396] text-xs font-bold">N° ${poke.id}</span>
          <span className="font-bold text-xl dark:text-white">${poke.name}</span>
          <div className="flex gap-4 mt-2">
            ${poke.types.map(({ name }, index) => (
              <span
                key={index}
                style={{ backgroundColor: typeColors[name] }}
                className=" px-2 py-1 rounded-md text-white text-sm"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
        <picture>
          <img
            style={{ imageRendering: "pixelated" }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 group-hover:scale-[1.15] transition-all duration-100 ease-in h-28 max-w-28 mx-auto"
            src=${poke.sprite}
            alt=""
          />
        </picture>
      </section>`
        );

     setCurrentShow((prevCurrentShow ) =>  prevCurrentShow + 1)

      //updatePokemonList();
    }
  } */

  return (
    <InfiniteScroll dataLength={maxIndex} next={more} hasMore={hasMore}>
      <div className="grid grid-cols-1 pt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-h-screen items-center justify-center  gap-4 py-6 w-full">
      {currentList.slice(0, maxIndex).map((poke, index) => {
              return (
                <PokeCard
                  key={poke.id}
                  id={poke.id}
                  name={poke.name}
                  types={poke.types}
                  sprite={poke.sprite}
                ></PokeCard>
              );
            })}
      </div>
    </InfiniteScroll>
  );
}
