"use client";
import { useState, useEffect } from "react";
import { PokeCard } from "../components/pokecard";
import { PokeInfo } from "../components/pokeinfo";
import { Navigation } from "@/components/navigation";
import { Modal } from "@/components/modal";

async function fetchPokemon(startIndex, endIndex) {
  const p = [];
  for (let i = startIndex; i <= endIndex; i++) {
    const resp = await fetch("https://pokeapi.co/api/v2/pokemon/" + i);
    const data = await resp.json();
    p.push(data);
  }

  return p;
}

export default function Home() {
  const [dataPokemones, setDataPokemones] = useState([]);
  const [dataPokeInfo, setDataPokeInfo] = useState([]);

  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(20);

  const [isLoading, setIsLoading] = useState(false);

  const handlePokeCardClick = (data) => {
    setDataPokeInfo(data);
    openModal();
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (!isLoading && scrollPosition >= documentHeight * 0.9) {
      setIsLoading(true);
      setStartIndex((prevStartIndex) => prevStartIndex + 20);
      setEndIndex((prevEndIndex) => prevEndIndex + 20);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const pokename = await fetchPokemon(startIndex, endIndex);
      setDataPokemones((prevData) => [...prevData, ...pokename]);
      setIsLoading(false);
    }

    if (isLoading || dataPokemones.length === 0) {
      fetchData();
    }
  }, [startIndex, endIndex, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("xddd");
    setIsModalOpen(false);
  };

  return (
    <main className="flex px-20 sm:px-32 xl:px-50 min-w-[310px]">
      <div className="w-full  gap-4 lg:mr-[390px]  ">
        <Navigation />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-h-screen items-center justify-center  gap-4 py-6 w-full">
          {dataPokemones.map((data, index) => {
            const poke = {
              name: data.name,
              sprite: data.sprites.front_default,
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
        </div>
      </div>
      {dataPokeInfo.length === 0 ? (
        <div className="mt-44 hidden lg:flex bg-white dark:bg-[#333333] fixed  md:right-32 xl:right-32 h-[76vh] w-[23rem] rounded-2xl shadow-xl justify-center text-center flex-col items-center px-4 font-mono gap-2 ">
          <picture className="absolute -top-20">
            <img
              id="current-pokemon-image"
              src="https://js-pokedex-virid.vercel.app/src/no-pokemon-selected-image.png"
              style={{ height: "140px", imageRendering: "pixelated" }}
            />
          </picture>

          <span className="text-[#8F9396] dark:text-white">
            Select a Pokemon to display here.
          </span>
        </div>
      ) : (
        <div className="hidden lg:flex mt-44 bg-white dark:bg-[#333333] fixed  md:right-32 xl:right-32  w-[23rem]  rounded-2xl shadow-xl  flex-col items-center px-4  gap-2 lg:h-[75vh] lg:bottom-20">
          <PokeInfo dataPoke={dataPokeInfo} />
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
