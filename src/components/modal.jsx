import { useState, useEffect } from "react";

export function Modal({ children, onClose }) {
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
    <>
      {shouldRenderModal && (
        <div className="modalOverlay lg:hidden " onClick={onClose}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
