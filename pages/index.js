import SecretCard from 'components/SecretCard';
import EmptyMessage from 'components/EmptyMessage';
import FAB from 'components/FAB';
import Navbar from 'components/Navbar';
import Head from 'next/head';
import {useAuth} from 'context/AuthContext';
import {useRouter} from 'next/router';
import {useRef, useState} from 'react';
import Modal from 'components/Modal';
import useFirestore from 'hooks/useFirestore';
import {db, now} from 'config/firebase';
import Spinner from 'components/Spinner';
import SnackBar from 'components/SnackBar';

export default function Home() {
  const {currentUser, loading, alert} = useAuth();
  const router = useRouter();
  const [isOpen, setModalOpen] = useState(false);
  const secretRef = useRef();
  let docs = useFirestore('secrets', currentUser?.uid);

  if (!loading && currentUser === null) {
    router.push('/login');
  }
  const handleSubmit = async e => {
    e.preventDefault();
    const secretName = secretRef.current.value.trim();
    if (secretName) {
      try {
        await db.collection('secrets').add({
          username: currentUser.displayName,
          secretName,
          uid: currentUser.uid,
          msgCount: 0,
          createdAt: now(),
        });
      } catch (err) {
        console.error(err.message);
      }
      setModalOpen(false);
    }
    secretRef.current.value = '';
  };

  return (
    <div>
      <Head>
        <title>Your Secrets</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar title='Secrets' showUserAvatar />
      {!loading && docs.length === 0 && (
        <EmptyMessage message='No secrets here' />
      )}
      {loading && <Spinner />}
      <div disabled={isOpen} className='card-container'>
        {docs &&
          docs.map(doc => (
            <SecretCard
              key={doc.id}
              id={doc.id}
              name={doc.secretName}
              noOfMessages={doc.msgCount}
            />
          ))}
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setModalOpen(false);
        }}>
        <form onSubmit={handleSubmit}>
          <input
            ref={secretRef}
            type='text'
            name='secret_name'
            id='secret_name'
            placeholder='Write name of the secret'
          />
          <button type='submit'>Create</button>
        </form>
      </Modal>
      <FAB
        isOpen={isOpen}
        onclick={() => {
          setModalOpen(true);
        }}
      />
      {alert && <SnackBar />}
    </div>
  );
}
