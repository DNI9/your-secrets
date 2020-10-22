import Head from 'next/head';
import {useRouter} from 'next/router';

const login = () => {
  const router = useRouter();
  const handleClick = () => {
    console.log('well hello');
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Login to Your secrets</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='login'>
        <div className='login__button' onClick={handleClick}>
          <img src='/google-icon.svg' alt='google icon svg' />
          <h3>Login with Google</h3>
        </div>
      </div>
    </>
  );
};

export default login;
