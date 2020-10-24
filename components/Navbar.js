import {useAuth} from 'context/AuthContext';
import {useRouter} from 'next/router';
import Avatar from './Avatar';

const Navbar = ({title, showUserAvatar}) => {
  const {currentUser, logout} = useAuth();
  const router = useRouter();

  // TODO: handle logout for now, use short modal later
  const handleLogout = () => {
    logout()
      .then(() => {
        router.push('/login');
      })
      .catch(err => console.error(err));
  };
  return (
    <div className='navbar'>
      <div className='navbar__title'>{title || 'Secrets'}</div>
      {showUserAvatar && (
        <div className='navbar__user-avatar' onClick={handleLogout}>
          <Avatar photoURL={currentUser?.photoURL} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
