import { useState, useEffect } from "react";

import { PokeInfo } from "./pokeinfo";

export function Modal({ click, dataPokeInfo, children, onClose }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Agrega y quita el listener de resize al montar y desmontar el componente

  // Define el ancho mínimo para mostrar el modal
  const minWidthToShowModal = 1024;

  const shouldRenderModal = width <= minWidthToShowModal;

  return (
    <div
      className={shouldRenderModal ? "modalOverlay" : ""}
      onClick={() => shouldRenderModal ? click() : '' }
    >
      <div onClick={(e) => e.stopPropagation()} className="fixed lg:flex mt-24 lg:mt-44 bg-white dark:bg-[#333333]  lg:right-32 xl:right-32 mx-32 lg:mx-0 right-0  lg:w-[23rem]  rounded-2xl shadow-xl  flex-col items-center px-4  gap-2  lg:bottom-10">
        <PokeInfo dataPoke={dataPokeInfo} />
      </div>
    </div>
  );

  /* return (
    <>
      {shouldRenderModal && (
        <div className="modalOverlay lg:hidden " onClick={onClose}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </>
  ); */
}
