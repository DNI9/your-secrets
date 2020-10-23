import {db, fieldValue, now} from 'config/firebase';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useRef} from 'react';
import {getAllDocs, getSingleDoc} from 'utils/getDocs';

// This route is to let other user create message
const AddMessage = ({secretData}) => {
  const router = useRouter();
  const msgRef = useRef();
  const {username, id} = secretData;

  const handleSubmit = async e => {
    e.preventDefault();
    const msg = msgRef.current.value.trim();
    await db.collection('messages').add({
      msg,
      secretID: id,
      createdAt: now(),
    });

    // increment msgCount for index page
    await db.doc(`secrets/${id}`).update({
      msgCount: fieldValue.increment(1),
    });
  };

  return (
    <>
      <Head>
        <title>Add a message</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='message'>
        <div className='message__title'>
          <span>Write something</span>
          <div>to {username.split(' ')[0]}</div>
        </div>
        <div className='message__form'>
          <form onSubmit={handleSubmit}>
            <textarea
              ref={msgRef}
              placeholder='Write your message here'
              name='message'
              id='message'
              cols='50'
              rows='10'></textarea>
            <button type='submit'>Submit</button>
          </form>
        </div>
        <div className='fixed-footer'>
          Wanna create your own?{' '}
          <span onClick={() => router.push('/login')}>yes?</span>
        </div>
      </div>
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
    fallback: false,
  };
}

export async function getStaticProps({params}) {
  const secretData = await getSingleDoc(params.id);
  return {
    props: {
      secretData: {
        ...secretData,
        createdAt: `${secretData.createdAt.toDate()}`,
      },
    },
  };
}

export default AddMessage;
