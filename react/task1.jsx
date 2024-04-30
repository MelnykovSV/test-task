import { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
//Used inline styles for simplicity and to include all of the task's code in a single file

const modalOverlayStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  position: "fixed",
  top: "0",
  left: 0,
  width: "100vw",
  height: "100vh",
  zIndex: "100",
};

const modalContentStyle = {
  backgroundColor: "#fff",
  width: "600px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

// The closeHandler prop is necessary to close the modal either by clicking outside of it or by pressing the Escape key.

export const Modal = ({
  open,
  disableGlobalScroll,
  closeHandler,
  children,
}) => {
  const [modalOpen, setModalOpen] = useState(open);
  const ref = useRef(null);
  const closeHandlerRef = useRef(closeHandler); // Used this approach to prevent unnecessary re-renders caused by closeHandler being included in the useEffect's dependency array.

  useEffect(() => {
    setModalOpen(open);
    if (disableGlobalScroll) {
      document.body.style.overflow = open ? "hidden" : "auto";
    }
  }, [open, disableGlobalScroll]);

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === "Escape") {
        closeHandlerRef.current();
      }
    }
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [closeHandlerRef]);

  const outerClickHandler = (e) => {
    if (ref.current === e.target) {
      closeHandler();
    }
  };

  return (
    modalOpen &&
    ReactDOM.createPortal(
      <div
        style={modalOverlayStyle}
        onClick={outerClickHandler}
        ref={ref}
        aria-modal="true">
        <div style={modalContentStyle} role="dialog">
          {children}
        </div>
      </div>,
      document.body
    )
  );
};
