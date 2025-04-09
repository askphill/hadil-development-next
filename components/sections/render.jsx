import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useInViewTracking } from 'hooks';

// dynamically import components, otherwise unused sections will be loaded
const Hero = dynamic(() => import('components/sections/hero'));

const components = {
  Hero,
};

const Sections = ({ type, data, i }) => {
  const typeSection = type.replace('Section', '');

  const ref = useRef();
  useInViewTracking({ ref, num: i + 1, data });

  if (typeof components[typeSection] !== 'undefined') {
    const Component = components[typeSection];

    return (
      <section ref={ref}>
        <Component data={data} />
      </section>
    );
  }
  return <div>{`Can't find component: ${typeSection}`}</div>;
};

const renderSections = (sections, resources = {}) => {
  if (sections) {
    return sections?.map((data, i) => {
      const type = data?.type;
      // eslint-disable-next-line react/no-array-index-key
      return <Sections type={type} data={{ ...data, resources }} i={i} key={type + i} />;
    });
  }
  return null;
};

export default renderSections;
