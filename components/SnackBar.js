import {useAuth} from 'context/AuthContext';
import {motion} from 'framer-motion';
const SnackBar = () => {
  const {
    alert: {msg, actionText, onActionClick, icon},
  } = useAuth();

  return (
    <motion.div
      initial={{opacity: 0, y: '20px'}}
      animate={{opacity: 1, y: 0}}
      className='snackbar'>
      {icon && (
        <div className='snackbar__icon semi-transparent-bg-with-icon'>
          <img src={icon} />
        </div>
      )}
      <p className='snackbar__msg'>{msg}</p>
      {onActionClick && (
        <p className='snackbar__action-text' onClick={onActionClick}>
          {actionText.toUpperCase() || 'CLICK'}
        </p>
      )}
    </motion.div>
  );
};

export default SnackBar;
