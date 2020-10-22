const Navbar = ({title, showUserAvatar}) => {
  return (
    <div className='navbar'>
      <div className='navbar__title'>{title || 'Secrets'}</div>
      {showUserAvatar && (
        <div className='navbar__user-avatar'>
          <img src='/user.svg' alt='user avatar icon' />
        </div>
      )}
    </div>
  );
};

export default Navbar;
