import './PopUp.css';

const Popup = ({ isOpen, onClose, children }) => {
  // Si no está abierto, no renderizamos nada
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
};

export default Popup;