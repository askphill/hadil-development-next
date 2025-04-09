import React from 'react';
import { SiteLink } from 'components/shared';

export default function FourOhFour() {
  return (
    <div>
      <SiteLink href="/">
        <p
          style={{
            padding: '20rem 5rem 1rem',
            fontSize: '4rem',
            textDecoration: 'underline',
            textAlign: 'center',
            width: '100vw',
          }}
        >
          404 - Click here to get home
        </p>
      </SiteLink>
      <img
        load="lazy"
        alt="404"
        style={{ width: '100vw', paddingTop: '10rem' }}
        src="https://media1.giphy.com/media/9J7tdYltWyXIY/giphy.gif"
      />
    </div>
  );
}
