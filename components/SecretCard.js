import {useRouter} from 'next/router';

const SecretCard = ({name, noOfMessages, id}) => {
  const router = useRouter();
  const onCardClick = () => {
    router.push(`/secrets/${id}`);
  };

  return (
    <div className='card'>
      <div className='card__icon'>
        <img src='/lock.svg' />
      </div>
      <div className='card__title' onClick={onCardClick}>
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
