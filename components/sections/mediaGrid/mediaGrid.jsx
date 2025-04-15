import { Image } from 'components/shared';

const MediaGrid = ({ data }) => {
  const { media } = data;

  return (
    <section className="px-8 bg-black flex items-center w-full lg:px-0 lg:py-24 py-12 relative">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-12 gap-6 g:gap-14">
        {media.map((item, index) => {
          const mod = index % 3;
          let colSpan = '';
          if (mod === 0) colSpan = 'col-span-5';
          if (mod === 1) colSpan = 'col-span-7';
          if (mod === 2) colSpan = 'col-span-12';

          return (
            <div key={item.title} className={`${colSpan} flex justify-center`}>
              <Image
                src={item}
                className="aspect-[16/9] w-full"
                alt={item.title}
                layout="fill"
                objectFit="cover"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MediaGrid;
