import SnackBar from 'components/SnackBar';
import Spinner from 'components/Spinner';
import {db, fieldValue, now} from 'config/firebase';
import {useAuth} from 'context/AuthContext';
import {motion} from 'framer-motion';
import useSingleDoc from 'hooks/useSingleDoc';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useRef} from 'react';
import {getAllDocs} from 'utils/getDocs';

// This route is to let other user create message
const AddMessage = ({id}) => {
  const router = useRouter();
  const msgRef = useRef();
  const {currentUser, showAlert, alert} = useAuth();

  const {doc} = useSingleDoc(id);
  if (!doc) return <Spinner />;
  const {uid, username} = doc;

  // user can't send message to his own secret
  if (currentUser && uid === currentUser.uid) router.push('/');

  const handleSubmit = async e => {
    e.preventDefault();
    const msg = msgRef.current.value.trim();
    if (msg) {
      await db.collection('messages').add({
        msg,
        secretID: id,
        createdAt: now(),
      });
      showAlert({msg: 'Ah yes, message sent'});

      // increment msgCount for index page
      await db.doc(`secrets/${id}`).update({
        msgCount: fieldValue.increment(1),
      });
    }

    msgRef.current.value = '';
  };

  return (
    <>
      <Head>
        <title>Add a message</title>
        <link rel='icon' href='/favicon.ico' />
		<meta name="description" content="Send messages anonymously to a friend."/>
      </Head>

      <div className='message'>
        <div className='message__title'>
          <span>Write something</span>
          <div>to {username.split(' ')[0]}</div>
        </div>
        <div className='message__form'>
          <form onSubmit={handleSubmit}>
            <textarea
              autoFocus
              ref={msgRef}
              placeholder='Write your message here'
              name='message'
              id='message'
              cols='50'
              rows='10'
            />
            <div className='fixed-footer'>
              Wanna create your own?{' '}
              <span onClick={() => router.push('/login')}>yes?</span>
            </div>
            <button type='submit'>Send</button>
          </form>
        </div>
      </div>
      {alert && <SnackBar />}
    </>
  );
};

export async function getStaticPaths() {
  const docs = await getAllDocs('secrets');
  const paths = docs.map(doc => {
    return {
      params: {
        id: doc.id,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({params}) {
  return {
    props: {
      id: params.id,
    },
  };
}

export default AddMessage;
