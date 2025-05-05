import { ReactNode, ReactElement, useRef } from "react";
import { createPortal } from "react-dom";
import CancelIcon from "../icons/CancelIcon";
import classNames from "classnames";

interface ModalProps {
  isOpen?: boolean;
  children?: ReactNode;
  title?: string | ReactElement;
  onClose?: () => void;
  zIndex?: 30 | 40;
}

const Modal: React.FC<ModalProps> = ({
  title,
  zIndex = 30,
  children,
  onClose,
  isOpen,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      {isOpen &&
        createPortal(
          <dialog
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className={`fixed w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-ch-modal transition-all ease-in-out duration-300 z-${zIndex}`}
          >
            <section
              className={classNames(
                classNames,
                "bg-white max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl rounded-lg px-4 pt-6 md:pb-4 md:px-8 lg:pt-7"
              )}
            >
              <div className="flex items-center justify-between">
                {title && (
                  <h2 className="text-black text-xl md:text-3xl font-bold text-start">
                    {title}
                  </h2>
                )}
                <div className="cursor-pointer" onClick={onClose}>
                  <CancelIcon />
                </div>
              </div>
              {children}
            </section>
          </dialog>,
          document.body
        )}
    </>
  );
};

export default Modal;
