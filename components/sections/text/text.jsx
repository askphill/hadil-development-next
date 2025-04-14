import { RichText } from 'components/shared';

const Text = ({ data }) => {
  const { textTitle, textContent } = data;
  return (
    <section className="px-8 bg-black text-white flex items-center w-full lg:px-0 lg:py-24 py-12 relative">
      <div className="flex flex-col gap-y-9 lg:flex-row lg:gap-x-32 justify-between w-full lg:max-w-6xl mx-auto">
        {textTitle && <h2 className="font-bold text-4xl lg:text-7xl">{textTitle}</h2>}
        <div className="lg:max-w-xl [&>p]:text-xl [&>p]:md:text-2xl ">
          <RichText text={textContent.json} />
        </div>
      </div>
    </section>
  );
};

export default Text;
