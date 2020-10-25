import {useAuth} from 'context/AuthContext';
import {motion} from 'framer-motion';
import Link from 'next/link';
import CopyToClipboard from 'utils/copyToClipboard';
import {deleteSecret} from 'utils/deleteDoc';

const SecretCard = ({name, noOfMessages, id}) => {
  const {showAlert} = useAuth();
  const handleDelete = () => {
    deleteSecret(id);
    showAlert({msg: 'Deleted secret'});
  };
  if (name.length > 16) name = name.slice(0, 16) + '...';

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
        <img
          src='share.svg'
          alt='share icon'
          onClick={() => {
            CopyToClipboard(`messages/${id}`);
            showAlert({msg: 'Copied URL to clipboard'});
          }}
        />
        <img src='delete.svg' alt='delete icon' onClick={handleDelete} />
      </div>
    </motion.div>
  );
};

export default SecretCard;
