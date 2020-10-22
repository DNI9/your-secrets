import EmptyMessage from 'components/EmptyMessage';
import MessageCard from 'components/MessageCard';
import Navbar from 'components/Navbar';
import Head from 'next/head';

const Secret = () => {
  const isSecretEmpty = true; // TODO
  return (
    <div>
      <Head>
        <title>Messages</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar title='Messages' />
      {!isSecretEmpty && <EmptyMessage message='No messages yet' />}
      <div className='card-container'>
        <MessageCard
          message='Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              consequatur.'
          timePassed='2hrs ago'
        />

        <MessageCard
          message='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic consectetur rem iusto illo ad sit!'
          timePassed='1hr ago'
        />
      </div>
    </div>
  );
};

export default Secret;
