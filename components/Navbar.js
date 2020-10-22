import {useAuth} from 'context/AuthContext';

const Navbar = ({title, showUserAvatar}) => {
  const {currentUser, loading} = useAuth();
  return (
    <div className='navbar'>
      <div className='navbar__title'>{title || 'Secrets'}</div>
      {showUserAvatar && (
        <div className='navbar__user-avatar'>
          {loading && <img src='/user.svg' alt='user avatar icon' />}
          {!loading && (
            <img
              src={currentUser.photoURL}
              className='avatar-img'
              alt='user avatar icon'
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
