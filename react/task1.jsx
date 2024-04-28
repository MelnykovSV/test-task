// Інлайн стилі лише для того, щоб весь код завдання був в одному файлі, в іншому випадку викристовував би CSS модулі, CSS-in-JS або Tailwind
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

const Modal = ({ open, disableGlobalScroll, closeHandler, children }) => {
  const [modalOpen, setModalOpen] = useState(open);
  const ref = useRef(null);
  const closeHandlerRef = useRef(closeHandler); //Використав цей підхід, щоб запобігти зайвим ререндерам через closeHandler в масиві залежностей

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

  useEffect(() => {
    setModalOpen(open);
    if (disableGlobalScroll) {
      document.body.style.overflow = open ? "hidden" : "auto";
    }
  }, [open, disableGlobalScroll]);

  return (
    modalOpen &&
    ReactDOM.createPortal(
      <div
        style={modalOverlayStyle}
        onClick={(e) => {
          if (ref.current === e.target) {
            closeHandler();
          }
        }}
        ref={ref}>
        <div style={modalContentStyle}>{children}</div>
      </div>,
      document.body
    )
  );
};
