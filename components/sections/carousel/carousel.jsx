/* eslint-disable import/no-extraneous-dependencies */
import Marquee from 'react-fast-marquee';
import { Image } from 'components/shared';

const Carousel = ({ data }) => {
  const { logos } = data;

  return (
    <section className="w-full bg-black lg:py-24 py-12">
      <Marquee speed={60} gradient={false} pauseOnHover={false} direction="left">
        {logos.map(logo => (
          <div key={logo.title} className="py-8 px-10  lg:mx-7 lg:p-10 bg-black">
            <Image src={logo} className="w-40 lg:w-60 h-auto " layout="" loading="eager" priority />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default Carousel;
