"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Navigation } from "./navigation";
import { CustomSelect } from "./customSelect";

export default function PokeListNew({ onClick }) {
  const [currentList, setCurrentList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [minIndex, setMinIndex] = useState(0);
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
      const resp = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=890");
      const data = await resp.json();
      console.log(data);

      data.results.map((pokemon, i) => {
        let validSprite =
          i <= 648
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
                i + 1
              }.svg`
            : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${
                i + 1
              }.png`;
        pokemones.push({
          id: i + 1,
          name: pokemon.name,
          types: [],
          sprite: validSprite,
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
      setListF(allPokes);
      setCurrentList(allPokes);
    }
  };

  useEffect(() => {
    if (currentList.length === 0) {
      getAllTypes();
    }
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
    console.log("llamame mrd", currentList);
    if (currentList.length === 0 && filterName !== "") {
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
        onClick={() => onClick({ id, types, name, sprite })}
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

  //const [nameP, setNameP] = useState("");
  const [listF, setListF] = useState([]);

  /* useEffect(() => {
    filterName("");
  }, []); */

  const [regionValue, setRegionValue] = useState("");

  const filterRegion = async (value) => {
    setRegionValue(value);

    const valueRanges = {
      1: { startI: 0, endI: 151 },
      2: { startI: 151, endI: 251 },
      3: { startI: 251, endI: 386 },
      4: { startI: 386, endI: 493 },
      5: { startI: 493, endI: 649 },
      6: { startI: 649, endI: 721 },
      7: { startI: 721, endI: 809 },
      8: { startI: 809, endI: 890 },
    };
    const range = valueRanges[value];

    if (range) {
      setListF(currentList.slice(range.startI, range.endI));
    }
    setHasMore(false);
  };

  const filterType = async (value) => {
    //console.log(value, dataPokemones);

    const pokefilter = currentList.filter((poke) =>
      poke.types.some((type) => type.name === value)
    );

    setListF(pokefilter);

    /*  const resp = await fetch('https://pokeapi.co/api/v2/type/' + value );
    const data = await resp.json();
    console.log(data); */
  };

  const filterName = (value) => {
    console.log(value);
    setHasMore(false);
    const data =
      value !== ""
        ? currentList.filter((poke) => poke.name.includes(value))
        : currentList;
    setListF(data);
  };
  return (
    <>
      <Navigation onChange={filterName} />
      <div className="flex gap-6 flex-col md:flex-row w-full">
        <CustomSelect typeS={1} onChange={filterRegion} />
        <CustomSelect typeS={2} onChange={filterType} />
      </div>

      <InfiniteScroll
        dataLength={regionValue !== "" ? listF.length : maxIndex}
        next={more}
        hasMore={hasMore}
      >
        <div className="grid grid-cols-1 pt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  items-center justify-center  gap-4 py-6 w-full">
          {listF
            .slice(0, regionValue !== "" ? listF.length : maxIndex)
            .map((poke, index) => {
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
    </>
  );
}
