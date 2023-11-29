export function CustomSelect({ typeS, onChange }) {
  const listRegion = [
    {
      name: "Kanto",
      value: "1",
    },
    {
      name: "Johto",
      value: "2",
    },
    {
      name: "Hoenn",
      value: "3",
    },
    {
      name: "Sinnoh",
      value: "4",
    },
    {
      name: "Teselia",
      value: "5",
    },
  ];
  const tiposPokemon = [
    "grass",
    "fire",
    "Planta",
    "Eléctrico",
    "Hielo",
    "Tierra",
    "Volador",
    "Veneno",
    "Psíquico",
    "Lucha",
    "Bicho",
    "Roca",
    "Fantasma",
    "Acero",
    "Siniestro",
    "Hada",
  ];

  return (
    <div className="flex flex-row items-center rounded-xl cursor-pointer bg-white dark:bg-[#333333] dark:text-white w-max relative">
      <img
        className="absolute left-2 w-5 "
        src="https://js-pokedex-virid.vercel.app/src/pokeball-icon.png"
        alt=""
      />
      <select
        className="w-40 appearance-none cursor-pointer  p-2 bg-white dark:bg-[#333333] pl-10 rounded-xl  "
        onChange={(e) => onChange(e.target.value)}
      >
        {typeS == 1
          ? listRegion.map((data, index) => {
              return <option value={data.value}>{data.name}</option>;
            })
          : tiposPokemon.map((data, index) => {
              return <option value={data}>{data}</option>;
            })}
      </select>
      {/*  <img className="w-5" src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Arrow-down.svg" alt="" />
       */}
      <svg
        className="mt-2 absolute right-2"
        xmlns="http://www.w3.org/2000/svg"
        width="0.9em"
        height="1em"
        viewBox="0 0 630 700"
      >
        <path
          fill="currentColor"
          d="M622 106L311 417L0 106l65-65l246 245L556 41z"
        />
      </svg>
    </div>
  );
}
