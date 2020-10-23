import {motion} from 'framer-motion';
import Link from 'next/link';

const SecretCard = ({name, noOfMessages, id}) => {
  return (
    <motion.div layout transition={{duration: 0.5}} className='card'>
      <div className='card__icon'>
        <img src='/lock.svg' />
      </div>
      <Link href='/secrets/[secretID]' as={`/secrets/${id}`}>
        <div className='card__title'>
          <h2>{name}</h2>
          <p>{noOfMessages} messages</p>
        </div>
      </Link>
      <div className='card__right-icon'>
        <img src='share.svg' />
      </div>
    </motion.div>
  );
};

export default SecretCard;
