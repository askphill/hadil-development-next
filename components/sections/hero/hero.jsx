import { SiteLink, Image } from 'components/shared';

import s from './hero.module.scss';

const Hero = ({ data }) => {
  const { title, image, cta } = data;
  return (
    <section>
      <Image src={image} className={s.image} layout="fill" loading="eager" priority />
      <div className={s.flex}>
        <h1 className={s.title}>{title}</h1>
        <div className={s.cta}>
          <SiteLink
            href={cta.link.slug}
            tracking={{ event: 'Collection Clicked', title: cta.text }}
          >
            {cta.text}
          </SiteLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;
