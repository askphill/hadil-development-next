import { useState } from 'react';
import cn from 'classnames';
import { RichText, Image } from 'components/shared';
// import s from './cta.module.scss';

const Cta = ({ data }) => {
  const { title, image } = data;
  const [green, setGreen] = useState(false);

  return (
    <div
      className={cn('p-8 transition-colors duration-300', {
        'bg-green-500': green,
        'bg-red-500': !green,
      })}
    >
      <div>
        <div className="[&>p]:text-bold [&>p]:text-2xl [&>p]:mb-4">
          <RichText text={title.json} />
        </div>
        <Image
          src={image}
          className="w-80 h-80 relative rounded-full overflow-hidden"
          layout="fill"
          loading="eager"
          priority
        />

        <button
          onClick={() => setGreen(!green)}
          type="button"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          COLOR CHANGE
        </button>
      </div>
    </div>
  );
};

export default Cta;
