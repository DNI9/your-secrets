import EmptyMessage from 'components/EmptyMessage';
import MessageCard from 'components/MessageCard';
import Navbar from 'components/Navbar';
import Head from 'next/head';
import {getSingleDoc, getAllDocs} from 'utils/getDocs';
import {format} from 'timeago.js';

const Secret = ({secretData}) => {
  const {messages} = secretData;
  return (
    <div>
      <Head>
        <title>Messages</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar title='Messages' />
      {messages.length === 0 && <EmptyMessage message='No messages yet' />}
      <div className='card-container'>
        {messages.map(({msg, createdAt}) => {
          return (
            <MessageCard
              key={createdAt}
              message={msg}
              timePassed={format(createdAt)}
            />
          );
        })}
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const docs = await getAllDocs('secrets');
  const paths = docs.map(doc => {
    return {
      params: {
        secretID: doc.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({params}) {
  const secretData = await getSingleDoc(params.secretID);
  return {
    props: {
      secretData: {
        ...secretData,
        createdAt: `${secretData.createdAt.toDate()}`,
      },
    },
  };
}

export default Secret;
