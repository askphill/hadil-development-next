import { RichText, Image } from 'components/shared';

const Cta = ({ data }) => {
  const { title, image, subtitle, description, button } = data;
  const link = button?.link?.externalLink || '';

  return (
    <div className="px-7 bg-black text-white h-[80vh] flex items-center w-full lg:px-44 relative">
      <div className="flex flex-col gap-y-44 lg:gap-y-16 w-full">
        {image && (
          <div className="absolute -top-12 hidden lg:block right-32">
            <Image
              src={image}
              className="w-96 h-96 rounded-full overflow-hidden"
              layout="fill"
              loading="eager"
              priority
            />
          </div>
        )}
        <div className="flex flex-col gap-y-7 lg:gap-y-16 w-full">
          {subtitle && <p className="text-2xl lg:text-5xl uppercase">{subtitle}</p>}
          <div className="[&>p]:font-bold [&>p]:text-7xl [&>p]:lg:text-[10rem] ">
            <RichText text={title.json} />
          </div>
          {description && <p className="text-2xl lg:text-3xl uppercase">{description}</p>}
        </div>

        {button && link && (
          <div className="rounded-full p-[2px] w-full lg:w-fit bg-[linear-gradient(to_right,_#622888,_#BC5548,_#EBC286,_#F6F0DA)] inline-block mx-2 lg:mx-0">
            <a
              type="button"
              alt={button.buttonText}
              aria-label={button.buttonText}
              href={link}
              className="py-5 px-12 text-white text-center block text-lg rounded-full bg-black lg:bg-[linear-gradient(to_right,_#622888,_#BC5548,_#EBC286,_#F6F0DA)]"
            >
              {button.buttonText}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cta;
