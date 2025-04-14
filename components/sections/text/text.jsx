import { RichText } from 'components/shared';

const Text = ({ data }) => {
  const { textTitle, textContent } = data;
  return (
    <section className="px-8 bg-black text-white flex items-center w-full lg:px-44 relative">
      {textTitle && <h2>{textTitle}</h2>}
      <div className="max-w-4xl">
        <RichText text={textContent.json} />
      </div>
    </section>
  );
};

export default Text;
