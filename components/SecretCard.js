const SecretCard = ({name, noOfMessages}) => {
  return (
    <div className='card'>
      <div className='card__icon'>
        <img src='/lock.svg' />
      </div>
      <div className='card__title'>
        <h2>{name}</h2>
        <p>{noOfMessages} messages</p>
      </div>
      <div className='card__right-icon'>
        <img src='share.svg' />
      </div>
    </div>
  );
};

export default SecretCard;
