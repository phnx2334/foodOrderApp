import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

interface IBackdropProps {
  onClose?: () => void;
}

interface IModalProps extends IBackdropProps {
 
}

const Backdrop: React.FC<IBackdropProps> = (props) => {
  return <div className={styles.backdrop}  onClick={props.onClose}></div>;
};

const ModalOverlay: React.FC = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays")!;

const Modal: React.FC<IModalProps> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop  onClose={props.onClose}/>, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
