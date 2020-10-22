import Head from 'next/head';
import {useRouter} from 'next/router';
import {useAuth} from '../context/AuthContext';

const login = () => {
  const {signInWithGoogle} = useAuth();
  const router = useRouter();
  const handleClick = async () => {
    try {
      const res = await signInWithGoogle();
      router.push('/');
    } catch (err) {
      console.log(err.message);
    }
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
