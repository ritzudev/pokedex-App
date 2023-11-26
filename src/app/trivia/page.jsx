"use client";

import { useEffect, useState } from "react";

export default function Trivia() {
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPokemon, setCurrentPokemon] = useState({});

  const filterImage = isCorrect ? "brightness-1" : "brightness-0";

  const validAnswerd = (value) => {
    console.log("hola", value);
    setIsCorrect(true);
    if (currentPokemon.id === value.id) {
      setMessage(`Correcto, ${ currentPokemon.name.toUpperCase() }`);
    } else {
      setMessage(`Opps, era ${ currentPokemon.name.toUpperCase() }`);
    }
  };

  const getImagePokemon = async () => {
    const randomIndex = Math.floor(Math.random() * 4);
    const randomPokemon = options[randomIndex];
    setCurrentPokemon(randomPokemon);
    console.log(currentPokemon);
    setIsLoading(false);
  };

  const getOptionsPokemon = async () => {
    setIsLoading(true);
    const optionsList = [];
    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.floor(Math.random() * 600) + 1;
      const resp = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + randomNumber
      );
      const data = await resp.json();
      const imgsprite = data.sprites.other.dream_world.front_default === null ? data.sprites.front_default :  data.sprites.other.dream_world.front_default

      const pokemon = { name: data.name, id: data.id, sprite: imgsprite };

      optionsList.push(pokemon);
    }

    setOptions(optionsList);
    
  };

  useEffect(() => {
    getOptionsPokemon();
    //getImagePokemon()
  }, []);

  useEffect(() => {
    console.log(options);
    if (options.length === 4) {
      getImagePokemon();
    }
  }, [options]);

  const newGame = () => {
    console.log("holi");
    getOptionsPokemon();
    setMessage('');
    setIsCorrect(false);
  };

  return (
    <div className="w-full justify-center flex flex-col items-center gap-10 filte text-white bg-red-500 h-full min-h-screen">
      {isLoading ? (
        <div>
          <img src="https://i.pinimg.com/originals/ab/be/28/abbe28a943ed44fcd98452687f7c46c9.gif" alt="" />
        </div>
      ) : (
        <>
          <h1 className="text-5xl">Quién es este Pokemon?</h1>
          <img
            className={`${filterImage} h-80`}
            src={currentPokemon.sprite}
            alt=""
          />
          {/* <div className="mi-elemento"></div> */}
          <ul className="flex flex-col gap-4 justify-center ">
            {options.map((option, index) => {
              return (
                <li
                  onClick={() => validAnswerd(option)}
                  key={index}
                  className="w-64 text-xl bg-white text-center rounded-md hover:bg-yellow-300 cursor-pointer py-1 text-black"
                >
                  {option.name}
                </li>
              );
            })}
          </ul>
          {isCorrect ? (
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-xl py-4">{message}</h1>

              <button onClick={newGame}>
                <span>
                  <img
                    className="w-6"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/640px-Pok%C3%A9_Ball_icon.svg.png"
                    alt=""
                  />
                  Nuevo Juego
                  <img
                    className="w-6"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/640px-Pok%C3%A9_Ball_icon.svg.png"
                    alt=""
                  />
                </span>
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </>
      )}
    </div>
  );
}
