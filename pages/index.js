import FAB from 'components/FAB';
import Navbar from 'components/Navbar';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Your Secrets</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar title='Secrets' showUserAvatar />
      <div>
        <h1>Your Secret Home</h1>
      </div>
      <FAB />
    </div>
  );
}
