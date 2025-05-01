import React, { ReactElement } from "react";
import Modal from "./Modal";
import { Button } from "../ui/Button/Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string | ReactElement;
  zIndex?: 30 | 40;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onCancel?: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
  const { isOpen, zIndex, title, message, confirmText, onCancel, cancelText } =
    props;
  return (
    <Modal zIndex={zIndex ? zIndex : 30} isOpen={isOpen} title={title}>
      <div className="">
        <div className="my-3">
          <h1 className="text-ch-grey text-xs font-normal">{message}</h1>
        </div>
        <div className="flex flex-col items-center mt-5">
          <Button
            variant={"destroy"}
            size="xs"
            aria-label="cancel dialog"
            onClick={onCancel}
          >
            {cancelText}
          </Button>
          <Button size="xs" className="font-normal" aria-label="confirm dialog">
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
