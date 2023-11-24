export function PokeCard({
  name,
  sprite,
  id,
  types,
  onClick,
  height,
  weight,
  abilities,
  stats,
  species
}) {
  /* console.log(name); */
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

  function capitalizeFirts(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  return (
    <section
      key={id}
      onClick={() =>
        onClick({ name, sprite, id, types, height, weight, abilities, stats,
        species })
      }
      className="w-full h-44 group  relative font-mono  shadow-xl rounded-2xl mb-4"
    >
      <div className="w-full h-[140px] flex justify-end pb-4 items-center flex-col  group-hover:border-2 group-hover:border-gray-400 bg-white dark:bg-[#333333] absolute bottom-0 rounded-2xl transition-all duration-100 ease-in cursor-pointer">
        <span className="text-[#8F9396] text-xs font-bold">N° {id}</span>
        <span className="font-bold text-xl dark:text-white">{name.toUpperCase()}</span>
        <div className="flex gap-4 mt-2">
          {types.map(({ type }, index) => (
            <span
            key={index}
              style={{ backgroundColor: typeColors[type.name] }}
              className=" px-2 py-1 rounded-md text-white text-sm"
            >
              {capitalizeFirts(type.name)}
            </span>
          ))}
          {/* <span className="bg-[#78CD54] px-2 py-1 rounded-md text-white text-sm">
            Grass
          </span> */}
        </div>
        {/*  <div className="flex flex-col w-full items-center p-3 ">
            
          </div> */}
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
}
