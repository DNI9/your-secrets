import Link from 'next/link';
const about = () => {
  return (
    <div id='about'>
      <img src='/loading_doge.gif' alt='' />
      <h2>Yahallo 👋</h2>
      <p>
        Wow, you actually found this page, nice! <br />
        If you're using this you already know me as{' '}
        <Link href='https://github.com/dni9'>DNI9</Link> or if you don't, here
        is my <Link href='https://github.com/dni9'>Github</Link>.
      </p>

      <Link href='/'>
        <button>back /home</button>
      </Link>
    </div>
  );
};

export default about;
