const MessageCard = ({message, timePassed}) => {
  return (
    <div className='card'>
      <div className='message-card card__title'>
        <p>{message}</p>
        <p>{timePassed}</p>
      </div>
    </div>
  );
};

export default MessageCard;
