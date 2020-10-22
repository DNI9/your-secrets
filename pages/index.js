import SecretCard from 'components/SecretCard';
import EmptyMessage from 'components/EmptyMessage';
import FAB from 'components/FAB';
import Navbar from 'components/Navbar';
import Head from 'next/head';
import {useAuth} from 'context/AuthContext';
import {useRouter} from 'next/router';
import {useRef, useState} from 'react';
import Modal from 'components/Modal';

export default function Home() {
  const isSecretEmpty = true; // TODO
  const {currentUser, loading} = useAuth();
  const router = useRouter();
  const [isOpen, setModalOpen] = useState(false);

  if (!loading && currentUser === null) {
    router.push('/login');
  }

  const secretRef = useRef();
  const handleSubmit = e => {
    e.preventDefault();
    console.log(secretRef.current.value);
  };

  return (
    <div>
      <Head>
        <title>Your Secrets</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar title='Secrets' showUserAvatar />
      {!isSecretEmpty && <EmptyMessage message='No secrets there' />}
      <div className='card-container'>
        <SecretCard name='New secret' noOfMessages='12' />
        <SecretCard name='Another secret' noOfMessages='5' />
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
    </div>
  );
}
