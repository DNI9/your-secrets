const Modal = ({isOpen, onClose, children}) => {
  return (
    <div className='modal' style={{display: isOpen ? 'block' : 'none'}}>
      <div onClick={onClose} className='modal__close'>
        <img src='/close.svg' />
      </div>
      <div className='modal__header'>
        <h3>Add a new secret</h3>
      </div>
      <div className='modal__body'>{children}</div>
    </div>
  );
};

export default Modal;
