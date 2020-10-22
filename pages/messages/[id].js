import Head from 'next/head';
import {useRouter} from 'next/router';

const AddMessage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Add a message</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='message'>
        <div className='message__title'>
          <span>Write something</span>
          <div>to Indrajit</div>
        </div>
        <div className='message__form'>
          <form>
            <textarea
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

export default AddMessage;
