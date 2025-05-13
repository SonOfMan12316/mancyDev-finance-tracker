import { ReactNode, ReactElement, useRef } from "react";
import { createPortal } from "react-dom";
import CancelIcon from "../icons/CancelIcon";
import classname from "classnames";

interface ModalProps {
  isOpen: boolean;
  className?: string;
  children: ReactNode;
  title: string | ReactElement;
  onClose: () => void;
  zIndex?: 30 | 40;
  modalHeader: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  zIndex = 30,
  children,
  onClose,
  isOpen = false,
  className,
  modalHeader,
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
            className={classname(
              className,
              `fixed w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-ch-modal transition-all duration-300 ease-in-out z-${zIndex}`,
              { "animate-slideUp": isOpen },
              { "animate-slideDown": !isOpen }
            )}
          >
            <section
              className={classname(
                className,
                "bg-white max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl lg:w-35 rounded-xl px-4 pt-6 md:pb-4 md:px-8 lg:pt-7"
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
              {modalHeader && (
                <div className="mt-4 mb-3">
                  <h1 className="text-ch-grey text-sm">{modalHeader}</h1>
                </div>
              )}
              {children}
            </section>
          </dialog>,
          document.body
        )}
    </>
  );
};

export default Modal;
