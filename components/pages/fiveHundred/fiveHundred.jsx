import { useState, useEffect } from 'react';
import s from './fiveHundred.module.scss';

const PageFiveHundred = ({ data }) => {
  const { errors, errorQuery } = data;
  const [isDevelopement, setIsDevelopement] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.origin === 'http://localhost:3000')
      setIsDevelopement(true);
  }, []);

  if (isDevelopement) {
    return (
      <div className={s.wrapper}>
        <h1 className={s.title}>500 internal error</h1>
        {errors.map(({ message }) => (
          <h2 key={message} className={s.errorMessage}>
            {message}
          </h2>
        ))}
        <h2 className={s.errorQuery}>{errorQuery}</h2>
      </div>
    );
  }

  // STYLE 500 PAGE AS THE 404 DESIGN
  return (
    <div className={s.wrapper}>
      <img src="https://i.redd.it/swcvl4m336f51.png" alt="500" />
    </div>
  );
};

export default PageFiveHundred;
