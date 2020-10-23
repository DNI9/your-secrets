import EmptyMessage from 'components/EmptyMessage';
import MessageCard from 'components/MessageCard';
import Navbar from 'components/Navbar';
import Head from 'next/head';
import {getSingleDoc, getAllDocs} from 'utils/getDocs';
import {format} from 'timeago.js';
import useMessages from 'hooks/useMessages';

const Secret = ({id}) => {
  const docs = useMessages(id);
  console.log(docs);
  return (
    <div>
      <Head>
        <title>Messages</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar title='Messages' />
      {docs.length === 0 && <EmptyMessage message='No messages yet' />}
      <div className='card-container'>
        {docs.map(({id, msg, createdAt}) => {
          return (
            <MessageCard
              key={id}
              message={msg}
              timePassed={format(createdAt.toDate())}
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
  return {
    props: {id: params.secretID},
  };
}

export default Secret;
