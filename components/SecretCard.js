import {useRouter} from 'next/router';
import {motion} from 'framer-motion';

const SecretCard = ({name, noOfMessages, id}) => {
  const router = useRouter();
  const onCardClick = () => {
    router.push('/secrets/[secretID]', `/secrets/${id}`);
  };

  return (
    <motion.div layout transition={{duration: 0.5}} className='card'>
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
    </motion.div>
  );
};

export default SecretCard;
