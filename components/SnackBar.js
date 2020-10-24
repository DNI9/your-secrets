import {useAuth} from 'context/AuthContext';
const SnackBar = () => {
  const {
    alert: {msg, actionText, onActionClick, icon},
  } = useAuth();

  return (
    <div className='snackbar'>
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
    </div>
  );
};

export default SnackBar;
