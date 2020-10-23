import EmptyMessage from 'components/EmptyMessage';
import MessageCard from 'components/MessageCard';
import Navbar from 'components/Navbar';
import Head from 'next/head';
import {getAllDocs, isSecretOwner} from 'utils/getDocs';
import {format} from 'timeago.js';
import useMessages from 'hooks/useMessages';
import {useAuth} from 'context/AuthContext';
import {useRouter} from 'next/router';

// this private route is to show messages for a secret in realtime
const Secret = ({id}) => {
  const docs = useMessages(id);
  const {currentUser, loading} = useAuth();
  const route = useRouter();
  if (!currentUser && !loading) {
    route.push('/login');
  }
  if (currentUser)
    isSecretOwner(id, currentUser.uid).then(res => !res && route.push('/'));

  return (
    <div style={{overflow: 'hidden'}}>
      <Head>
        <title>Messages</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar title='Messages' />
      {docs.length === 0 && <EmptyMessage message='No messages yet' />}
      <div className='card-container'>
        {currentUser &&
          docs.map(({id, msg, createdAt}) => {
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
