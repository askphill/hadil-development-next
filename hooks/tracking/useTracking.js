export function useTracking() {
  function track(props) {
    const { type, event, name, data } = props;

    if (typeof window !== 'undefined' && window.analytics) {
      switch (type) {
        case 'track':
          return window.analytics.track(event, {
            name,
            ...data,
          });
        case 'page':
          return window.analytics.page(name, { name, ...data });

        default:
          return '';
      }
    }
    return '';
  }
  return track;
}

export default useTracking;
