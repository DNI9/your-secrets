import {motion} from 'framer-motion';

const MessageCard = ({message, timePassed}) => {
  return (
    <div className='card'>
      <motion.div layout className='message-card card__title'>
        <p>{message}</p>
        <p>{timePassed}</p>
      </motion.div>
    </div>
  );
};

export default MessageCard;
