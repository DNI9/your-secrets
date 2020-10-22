const FAB = ({onclick, isOpen}) => {
  return (
    <div disabled={isOpen} className='FAB' onClick={onclick}>
      <img src='/add.svg' alt='FAB icon' />
    </div>
  );
};

export default FAB;
