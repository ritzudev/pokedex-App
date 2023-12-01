"use client";
import { useState, useEffect } from "react";
import { PokeCard } from "../components/pokecard";
import { PokeInfo } from "../components/pokeinfo";
import { Navigation } from "@/components/navigation";
import { CustomSelect } from "@/components/customSelect";
import { Modal } from "@/components/modal";
import noPokemonSelected from "../../public/img/no-pokemon-selected.png";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import PokeListNew from "@/components/pokelistnew";

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

  const [regionValue, setRegionValue] = useState("");

  const fetchMorePokemon = async () => {
    /* setStartIndex(currentLength + 1);
    setEndIndex(currentLength + 10) */

    console.log(
      "no me llames mano, y ahora? jaaaaaaaa",
      dataPokemones[dataPokemones.length - 1]
    );
    const currentLength = dataPokemones.length;
    const currentID = dataPokemones[dataPokemones.length - 1];
    const newPokemon = await fetchPokemon(currentID.id + 1, currentID.id + 20);

    if (newPokemon.length === 0) {
      setHasMore(false);
    } else {
      setDataPokemones((prevData) => {
        // Filtra duplicados antes de concatenar los nuevos datos
        const filteredData = prevData.filter(
          (prevPokemon) =>
            !newPokemon.some((newPokemon) => newPokemon.id === prevPokemon.id)
        );

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
    console.log("mano yada");
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

  const filterRegion = async (value) => {
    console.log(value);
    let startI = 0;
    let endI = 0;

    if (value == "1") {
      startI = 1;
      endI = 20;
      //endI = 151;
    } else if (value == "2") {
      startI = 152;
      endI = 162;
    } else if (value == "3") {
      startI = 252;
      endI = 262;
      // endI = 386;
    } else if (value == "4") {
      startI = 387;
      endI = 397;
      //endI = 493;
    } else if (value == "5") {
      startI = 494;
      endI = 504;
      //endI = 649;
    } else if (value == "6") {
      startI = 650;
      endI = 660;
      //endI =  650 a 721
    } else if (value == "7") {
      startI = 722;
      endI = 732;
      //endI = 722 a 809.
    }else if (value == "8") {
      startI = 810;
      endI = 820;
      //endI = 810 - 
    }

    setIsLoading(true);
    try {
      const newData = await fetchPokemon(startI, endI);
      setDataPokemones(newData);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterType = async (value) => {
    console.log(value, dataPokemones);

    const pokefilter = dataPokemones.filter(poke => poke.types.some(type => type.type.name === value))
    
    setDataPokemones(pokefilter)

   /*  const resp = await fetch('https://pokeapi.co/api/v2/type/' + value );
    const data = await resp.json();
    console.log(data); */

  };

  const PokemonList = ({ data, onClick }) => (
    <InfiniteScroll
      dataLength={dataPokemones.length}
      next={fetchMorePokemon}
      className="grid grid-cols-1 pt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-h-screen items-center justify-center  gap-4 py-6 w-full"
      hasMore={hasMore}
      loader={
        <div className="col-span-1 sm:col-span-2 xl:col-span-3 2xl:col-span-4 items-center flex justify-center">
          <img
            className="animate-spin w-20 col-span-4"
            src="https://js-pokedex-virid.vercel.app/src/pokeball-icon.png"
            alt=""
          />
        </div>
      }
    >
      {dataPokemones.map((data, index) => {
        const imgD = data.sprites.front_default;
        const imgDW = data.sprites.other.dream_world.front_default;
        const poke = {
          name: data.name,
          sprite: imgDW === null ? imgD : imgDW,
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

  const click = () => {
    setDataPokeInfo([])
  }

  return (
    <main className="flex px-20 sm:px-32 xl:px-50 min-w-[310px]">
      <div className="w-full  gap-4 lg:mr-[390px]  ">
        <Navigation onClickdata={handlePokeCardClick} />
        <div className="flex gap-6">
          <CustomSelect typeS={1} onChange={filterRegion} />
          <CustomSelect typeS={2} onChange={filterType} />
        </div>
        <PokeListNew onClick={handlePokeCardClick} />
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

        <Modal click={click} dataPokeInfo={dataPokeInfo}/>


        
      )}

      {isModalOpen && dataPokeInfo.length !== 0 ? (
        <>
          {/* <Modal onClose={closeModal}>
            <PokeInfo dataPoke={dataPokeInfo} />
          </Modal> */}
        </>
      ) : (
        <> </>
      )}
    </main>
  );
}
