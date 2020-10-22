import SecretCard from 'components/SecretCard';
import EmptyMessage from 'components/EmptyMessage';
import FAB from 'components/FAB';
import Navbar from 'components/Navbar';
import Head from 'next/head';

export default function Home() {
  const isSecretEmpty = true; // TODO
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
      <FAB />
    </div>
  );
}
