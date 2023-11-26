"use client";
import { useState, useEffect } from "react";
import { PokeCard } from "../components/pokecard";
import { PokeInfo } from "../components/pokeinfo";
import { Navigation } from "@/components/navigation";
import { Modal } from "@/components/modal";
import noPokemonSelected from "../../public/img/no-pokemon-selected.png";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";

async function fetchPokemon(startIndex, endIndex) {
  const p = [];
  for (let i = startIndex; i <= endIndex; i++) {
    const resp = await fetch("https://pokeapi.co/api/v2/pokemon/" + i);
    const data = await resp.json();
    p.push(data);
  }

  return p;
}

async function getPokemon(idPokemon) {
  const resp = await fetch("https://pokeapi.co/api/v2/pokemon/" + idPokemon);
  const data = await resp.json();
  return data;
}

export default function Home() {
  const [dataPokemones, setDataPokemones] = useState([]);
  const [dataPokeInfo, setDataPokeInfo] = useState([]);

  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(20);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInfo, setIsLoadingInfo] = useState(false);

  const [idPoke, setIdPoke] = useState(null);

  const [hasMore, setHasMore] = useState(true);

  const fetchMorePokemon = async () => {
    console.log('no me llames mano, y ahora? jaaaaaaaa');
    const currentLength = dataPokemones.length;
    /* setStartIndex(currentLength + 1);
    setEndIndex(currentLength + 10) */
    const newPokemon = await fetchPokemon(
      currentLength + 1,
      currentLength + 10
    );

    if (newPokemon.length === 0) {
      setHasMore(false);
    } else {
      setDataPokemones((prevData) => {
        // Filtra duplicados antes de concatenar los nuevos datos
        const filteredData = prevData.filter((prevPokemon) => (
          !newPokemon.some((newPokemon) => newPokemon.id === prevPokemon.id)
        ));

        return [...filteredData, ...newPokemon];
      });
      /* setDataPokemones([...dataPokemones, ...newPokemon]); */
    }
  };

  const setdataId = (data) => {
    const id = parseInt(data.idPokemon);
    setIdPoke(id);
  };

  const fetchDatapoke = async () => {
    if (idPoke === null) return;

    try {
      setIsLoadingInfo(true);
      const pokemonData = await getPokemon(idPoke);
      setDataPokeInfo(pokemonData);
      console.log("Pokemon data:", pokemonData);
      setIsLoadingInfo(false);
      // Aquí puedes realizar cualquier lógica adicional con los datos del Pokémon
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  useEffect(() => {
    fetchDatapoke();
  }, [idPoke]);

  const handlePokeCardClick = (data) => {
    setDataPokeInfo(data);
    openModal();
  };

  /* const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (!isLoading && scrollPosition >= documentHeight * 0.9) {
      setIsLoading(true);
      setStartIndex((prevStartIndex) => prevStartIndex + 20);
      setEndIndex((prevEndIndex) => prevEndIndex + 20);
      setIsLoading(false);
    }
  }; */

  /*  useEffect(() => {
    async function fetchData() {
      const pokename = await fetchPokemon(startIndex, endIndex);
      setDataPokemones((prevData) => [...prevData, ...pokename]);
      setIsLoading(false);
    }

    if (isLoading || dataPokemones.length === 0) {
      fetchData();
    }
  }, [endIndex, isLoading]); */

  const fetchData = async () => {
    console.log('mano yada');
    if (dataPokemones.length != 0) return;
    
    setIsLoading(true);
    try {
      const newData = await fetchPokemon(startIndex, endIndex);
      setDataPokemones((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]); */

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  {
    /* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-h-screen items-center justify-center gap-4 py-6 w-full">
      {data.map((pokemon) => (
        <PokeCard key={pokemon.id} {...pokemon} onClick={onClick} />
      ))}
    </div> */
  }
  const PokemonList = ({ data, onClick }) => (
    <InfiniteScroll
      dataLength={dataPokemones.length}
      next={fetchMorePokemon}
      className="grid grid-cols-1 pt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-h-screen items-center justify-center  gap-4 py-6 w-full"
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {dataPokemones.map((data, index) => {
        const poke = {
          name: data.name,
          sprite: data.sprites.other.dream_world.front_default,
          /* sprite: data.sprites.front_default, */
          id: data.id,
          types: data.types,
          height: data.height,
          weight: data.weight,
          abilities: data.abilities,
          stats: data.stats,
          species: data.species,
        };
        return (
          <PokeCard key={data.id} {...poke} onClick={handlePokeCardClick} />
        );
      })}
    </InfiniteScroll>
  );

  return (
    <main className="flex px-20 sm:px-32 xl:px-50 min-w-[310px]">
      <div className="w-full  gap-4 lg:mr-[390px]  ">
        <Navigation onClickdata={handlePokeCardClick} />
        <PokemonList />
      </div>
      {dataPokeInfo.length === 0 ? (
        <div className="mt-44 hidden lg:flex bg-white dark:bg-[#333333] fixed  md:right-32 xl:right-32 h-[76vh] w-[23rem] rounded-2xl shadow-xl justify-center text-center flex-col items-center px-4 font-mono gap-2 ">
          <picture className="absolute -top-20">
            {/* <img
              id="current-pokemon-image"
              src={noPokemonSelected}
              style={{ height: "140px", imageRendering: "pixelated" }}
            /> */}
            <Image
              src={noPokemonSelected}
              height={140}
              width={91}
              alt="No pokemon selected"
              style={{
                imageRendering: "pixelated",
                width: "auto",
                height: "auto",
              }}
              placeholder="blur"
            />
          </picture>

          <span className="text-[#8F9396] dark:text-white">
            Select a Pokemon to display here.
          </span>
        </div>
      ) : (
        <div className="hidden lg:flex mt-44 bg-white dark:bg-[#333333] fixed  md:right-32 xl:right-32  w-[23rem]  rounded-2xl shadow-xl  flex-col items-center px-4  gap-2 lg:h-[75vh] lg:bottom-20">
          <PokeInfo dataPoke={dataPokeInfo} onClick={setdataId} />
        </div>
      )}

      {isModalOpen && dataPokeInfo.length !== 0 ? (
        <>
          <Modal onClose={closeModal}>
            <PokeInfo dataPoke={dataPokeInfo} />
          </Modal>
        </>
      ) : (
        <> </>
      )}
    </main>
  );
}
