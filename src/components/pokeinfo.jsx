"use client";

import { useState, useEffect } from "react";

/* 

DW: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg
GIF: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${dataPoke.id}.gif`
EVO: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/' + id + '.png';

*/

export function PokeInfo({ dataPoke, onClick }) {
  const [descPokemon, setDescPokemon] = useState("");
  const [evoPokemon, setEvoPokemon] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [infoPokemon, setInfoPokemon] = useState({});
  const [spritePokemon, setSpritePokemon] = useState("");

  const getInfoPokemon = async () => {
    console.log('cuantas veces más???');
    try {
      const resp = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${dataPoke.id}`
      );
      const data = await resp.json();

      setInfoPokemon(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDescription = async () => {

    try {
      setIsLoading(true);
      const resp = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${dataPoke.id}`
      );
      const speciesData = await resp.json();

      getEvolution(speciesData.evolution_chain.url);
      const flavorText = speciesData.flavor_text_entries[0].flavor_text.replace(
        /\n|\f/g,
        " "
      );
      setDescPokemon(flavorText);
    } catch (error) {
      console.error("Error fetching Pokemon species:", error);
      throw error; // Puedes manejar el error según tus necesidades
    } finally {
      setIsLoading(false);
    }
  };

  const getEvolution = async (url) => {
    try {
      const resp = await fetch(url);
      const evolutionData = await resp.json();
      setEvoPokemon(evolutionData);
    } catch (error) {
      console.error("Error fetching evolution data:", error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  };

  useEffect(() => {
    
    getInfoPokemon();
    getDescription();
    validImage();
    
  }, [dataPoke]);

  const validImage = () => {
    if (dataPoke.id >= 650) {
      setSpritePokemon(dataPoke.sprite);
    } else {
      setSpritePokemon(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${dataPoke.id}.gif`
      );
    }
  };

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

  const statsColors = {
    hp: "#DF2140",
    attack: "#FF994D",
    defense: "#eecd3d",
    "special-attack": "#85DDFF",
    "special-defense": "#96da83",
    speed: "#FB94A8",
  };

  const statsName = {
    0: "HP",
    1: "ATK",
    2: "DEF",
    3: "SpA",
    4: "SpD",
    5: "SPD",
  };

  function totalStats() {
    var total = 0;
    infoPokemon?.stats?.forEach((element) => {
      total += element.base_stat;
    });
    return total;
  }

  function capitalizeFirts(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function filterIdFromSpeciesURL(url) {
    return url
      .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
      .replace("/", "");
  }

  const PokemonImage = ({ species }) => {
    const idPokemon = filterIdFromSpeciesURL(species?.url);
    return (
      <img
        onClick={() =>
          onClick({
            idPokemon,
          })
        }
        className="h-16 w-16"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemon}.png`}
        alt=""
      />
    );
  };

  const EvolutionDetails = ({ details }) => (
    <span className="bg-[#F6F8FC] dark:bg-[#1A1A1A] px-4 py-1 rounded-full text-xs font-bold flex h-min">
      {details.min_level ? `Lvl ${details.min_level}` : "?"}
    </span>
  );

  const EvolutionChain = ({ chain }) => {
    if (chain === undefined) {
      return;
    }

    return (
      <section className="flex flex-wrap sm:flex-nowrap items-center justify-center pb-4">
        {isLoading ? (
          <h1>loading...</h1>
        ) : (
          <>
            <PokemonImage species={chain?.species} />
            <EvolutionDetails
              details={chain?.evolves_to[0].evolution_details[0]}
            />

            {chain.evolves_to?.[0] && (
              <>
                <PokemonImage species={chain.evolves_to[0].species} />

                {chain.evolves_to[0]?.evolves_to?.[0] && (
                  <>
                    <EvolutionDetails
                      details={
                        chain.evolves_to[0].evolves_to[0].evolution_details[0]
                      }
                    />
                    <PokemonImage
                      species={chain.evolves_to[0].evolves_to[0].species}
                    />
                  </>
                )}
              </>
            )}
          </>
        )}
      </section>
    );
  };

  return (
    <>
      <picture className="">
        <img
          id="current-pokemon-image"
          src={spritePokemon}
          style={{ height: "140px", imageRendering: "pixelated" }}
          className="absolute  -top-20 mx-auto left-1/2 -translate-x-1/2"
        />
      </picture>
      <section className="mt-20 flex flex-col items-center overflow-scroll no-scrollbar dark:text-white h-[65vh] lg:h-[70vh]">
        <span className="text-[#8F9396] text-xs font-bold">
          # {dataPoke.id}
        </span>
        <span className="font-bold text-2xl ">
          {capitalizeFirts(dataPoke.name)}
        </span>
        <div className="flex gap-4 py-4">
          {dataPoke.types.map(({ name }, index) => (
            <span
              key={index}
              style={{ backgroundColor: typeColors[name] }}
              className=" px-2 py-1 rounded-md text-white text-sm"
            >
              {capitalizeFirts(name)}
            </span>
          ))}
        </div>
        <h2 className="font-bold">Pokedex Entry</h2>
        {isLoading ? (
          <div role="status" className="w-full animate-pulse">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-3"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-3"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-3"></div>
          </div>
        ) : (
          <p className="text-[#8F9396] dark:text-[#ccc]">{descPokemon}</p>
        )}

        <div className="flex w-full gap-4 text-center py-4">
          <div className="w-full">
            <h4>Height</h4>
            <h5 className="w-full bg-[#F6F8FC] dark:bg-[#1A1A1A] rounded-full py-1 my-2">
              {infoPokemon.height / 10}m
            </h5>
          </div>
          <div className="w-full">
            <h4>Weight</h4>
            <h5 className="w-full bg-[#F6F8FC] dark:bg-[#1A1A1A] rounded-full py-1 my-2">
              {infoPokemon.weight / 10}kg
            </h5>
          </div>
        </div>

        <h4>Abilities</h4>
        <div className="grid grid-cols-2 w-full gap-4 text-center py-4">
          {infoPokemon?.abilities?.map(({ ability }, index) => (
            <h5
              key={index}
              className="w-full bg-[#F6F8FC] dark:bg-[#1A1A1A] rounded-full py-1 flex justify-center "
            >
              {capitalizeFirts(ability.name)}
            </h5>
          ))}
        </div>

        <h4>Stats</h4>
        <section className="flex flex-wrap gap-2 py-4 justify-center">
          {infoPokemon?.stats?.map(({ base_stat, stat }, index) => {
            return (
              <div
                key={index}
                className="flex flex-col gap-2 bg-[#F6F8FC] dark:bg-[#1A1A1A] py-2 px-4 rounded-xl items-center w-16"
              >
                <span
                  style={{ backgroundColor: statsColors[stat.name] }}
                  className=" rounded-full py-1 px-2 font-bold text-white text-xs"
                >
                  {statsName[index]}
                </span>
                <span className="font-bold text-base">{base_stat}</span>
              </div>
            );
          })}
          <div className="flex flex-col gap-2 bg-[#88AAEA] py-2 px-4 rounded-xl items-center w-16">
            <span className="bg-[#7195DC] rounded-full py-1 px-2 font-bold text-white text-xs">
              TOT
            </span>
            <span className="font-bold text-base">{totalStats()}</span>
          </div>
        </section>

        <h4>Evolution</h4>
        <EvolutionChain chain={evoPokemon?.chain} />
      </section>
    </>
  );
}

{
  /* <p>{evoPokemon.chain.evolves_to[0].evolves_to[0].species.name}</p> 
    color: #091b45; 
    text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;

*/
}
