import { useEffect } from 'react';
import { useTracking } from 'hooks';

export const useInViewTracking = props => {
  const {
    ref,
    num,
    data: { type, name },
  } = props;

  const track = useTracking();

  useEffect(() => {
    const sectionRef = ref?.current;
    const observer = new IntersectionObserver(
      entries => {
        if (entries && entries[0]?.isIntersecting) {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          track({
            type: 'track',
            event: 'Section viewed',
            name,
            data: {
              type,
              order: num,
            },
          });
          observer.unobserve(sectionRef);
        }
      },
      {
        rootMargin: '0% 0% -10% 0%', // isIntersecting when target element reaches bottom 10% of the viewport height
      }
    );

    if (sectionRef) {
      observer.observe(sectionRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
};

export default useInViewTracking;
