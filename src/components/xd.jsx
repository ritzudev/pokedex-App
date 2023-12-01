"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

let pokemones = [];

const getAllPokemons = async () => {
  try {
    const resp = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=60");
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
  const allPokes = await getAllPokemons();
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
    /* //getAllSprite()
    setPokemons(pokemons);
    setCurrentList(pokemones.slice(0, currentlyShow));
    */
    //setIsLoading(false);
    
    return pokemones;
  }
};

export default function pokelist() {
  const [pokemons, setPokemons] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //const [currentlyShow, setCurrentlyShow] = useState(30);
  const [hasMore, setHasMore] = useState(true);

  let currentlyShow = 30;

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

  const getAllSprite = async () => {
    for (let i = 0; i < pokemones.length; i++) {
      let url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        id + 1
      }.svg`;
      let resp = await fetch(url);
      let data = await resp.json();
    }
  };

  const allpokes = async () => {
    const allP = await getAllTypes();
   setCurrentList(allP);
   setIsLoading(false);
  }

  useEffect(() => {
   allpokes()
  }, []);

  /*  useEffect(() => {
    updatePokemonList();
  }, currentList); */

  const PokeCard = ({ id, types, name, sprite }) => {
    return (
      <section
        key={id}
        className="w-full h-44 group  relative font-mono  shadow-xl rounded-2xl mb-4"
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

  /*
  let currentlyShowingAmount = 0;
  let maxIndex = 30;

  function updatePokemonList() {
    if (currentlyShowingAmount <= maxIndex) {
      RenderList(currentlyShowingAmount);
    }
  }

  function fetchMorePokemon(by) {
    if (maxIndex + by <= currentList.length) {
      maxIndex += by;
    } else {
      maxIndex = currentList.length - 1;
      setHasMore(false)
    }

    updatePokemonList();
  } */

  const loadMorePokemon = () => {
    console.log("pokes", pokemons);
    const newAmount = currentlyShow + 20; // Puedes ajustar la cantidad que deseas cargar cada vez
    setCurrentList([...currentList, pokemons.slice(currentlyShow, newAmount)]);
    //setCurrentlyShow(newAmount);

    if (newAmount >= 850) {
      setHasMore(false); // Si ya mostramos todos los Pokémon, desactivamos la carga infinita
    }
  };

  const RenderList = (index) => {
    console.log("index mano", index);

    if (currentList[index]) {
      return (
          <div>
            {currentList.map((poke, index) => {
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
      
      );
      currentlyShow += 1;
    //updatePokemonList();
    }

    
  };

  return <>{isLoading ? <h1>Loadign</h1> : <RenderList />} </>;
}
