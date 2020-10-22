const Avatar = ({photoURL}) => {
  return (
    <img
      src={photoURL || '/user.svg'}
      className={photoURL && 'avatar-img'}
      alt='user avatar icon'
    />
  );
};

export default Avatar;
