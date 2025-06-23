interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  const modalStyles = {
    backgroundColor: 'rgba(255 255 255, 0.9)',
  };

  return (
    <div
      className={`modal ${modalOpen ? 'modal-open' : ''}`}
      style={modalStyles}
    >
      <div className='modal-box relative bg-zinc-100 p-12'>
        <label
          onClick={() => setModalOpen(false)}
          className='btn absolute left-2 top-2 border-none  bg-zinc-100 text-black hover:bg-white'
        >
          ✕
        </label>
        {children}
      </div>
    </div>
  );
};

export default Modal;
