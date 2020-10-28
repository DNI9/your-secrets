import Image from 'next/image';

const Spinner = () => (
  <div className='spinner'>
	<Image
        src="/loading_doge.gif"
        alt="Loading doge"
        width={80}
        height={80}
      />
  </div>
);

//TODO: use next/image
export default Spinner;
