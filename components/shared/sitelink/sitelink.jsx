import Link from 'next/link';
import { useRouter } from 'next/router';

import { useTracking } from 'hooks';

// eslint-disable-next-line no-unused-vars
import s from './sitelink.module.scss';

const SiteLink = ({ href, className, external, onClick, tracking, children }) => {
  const router = useRouter();

  const track = useTracking();

  const trackLinkClick = () => {
    // eslint-disable-next-line no-unused-expressions
    onClick && onClick();

    const { event, title, ...trackingData } = { ...tracking }; // exclude "event" and "title"

    track({
      type: 'track',
      event: tracking?.event || 'Link Clicked',
      name: tracking?.title || '',
      data: {
        title: tracking?.title || '',
        destination: href ? `/${router.locale}/${href}/` : external || '',
        slug: `/${router.locale}${router.asPath}`,
        ...trackingData,
      },
    });
  };

  const renderButton = () => {
    if (external) {
      return (
        <a
          href={external}
          className={className}
          onClick={trackLinkClick}
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={
          /* eslint-disable no-nested-ternary */
          href === '/'
            ? '/'
            : href?.slice(0, 1) === '/' && href?.slice(-1) === '/'
            ? href
            : href?.slice(0, 1) === '/'
            ? `${href}/`
            : href?.slice(-1) === '/'
            ? `/${href}`
            : `/${href}/` // <----- result
          /* eslint-enable */
        }
      >
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          className={className}
          onClick={trackLinkClick}
          onKeyDown={trackLinkClick}
          role="button"
          tabIndex={0}
        >
          {children}
        </a>
      </Link>
    );
  };

  return renderButton();
};

export default SiteLink;
