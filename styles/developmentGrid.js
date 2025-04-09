export const columns = 20;
export const columnsMobile = 24 / 3;

const developmentGrid = () => {
  if (process.env.NODE_ENV === 'development') {
    const offset = 0;
    const offsetUnit = 'px';
    const lineThickness = '1px';
    const gutter = '0px';
    const color = 'rgba(255,0,0,.05)';

    const repeatingWidth = `calc(100% / ${columns})`;
    const columnWidth = `calc((100% / ${columns}) - ${gutter})`;
    const backgroundWidth = `calc(100% + ${gutter})`;

    const repeatingWidthMobile = `calc(100% / ${columnsMobile})`;
    const columnWidthMobile = `calc((100% / ${columnsMobile}) - ${gutter})`;

    const backgroundColumns = `repeating-linear-gradient(
      to right,
      ${color},
      ${color} ${lineThickness},
      transparent ${lineThickness},
      transparent calc(${columnWidth} - ${lineThickness}),
      ${color} calc(${columnWidth} - ${lineThickness}),
      ${color} ${columnWidth},
      transparent ${columnWidth},
      transparent ${repeatingWidth}
    )`;

    const backgroundColumnsMobile = `repeating-linear-gradient(
      to right,
      ${color},
      ${color} ${lineThickness},
      transparent ${lineThickness},
      transparent calc(${columnWidth} - ${lineThickness}),
      ${color} calc(${columnWidthMobile} - ${lineThickness}),
      ${color} ${columnWidthMobile},
      transparent ${columnWidthMobile},
      transparent ${repeatingWidthMobile}
    )`;

    return `
    body::before {
        position: fixed;
        display: block;
        z-index: 10000;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: 0 auto;
        background-image: ${backgroundColumnsMobile};
        z-index: 10000;
        pointer-events: none;
        display: block;
        width: calc(100% - ${2 * offset}${offsetUnit});
        min-height: 100vh;
      }
      @media (min-width: 900px) {
        body::before {
          background-image: ${backgroundColumns};
          background-size: ${backgroundWidth} 100%;

        }
      }
    `;
  }
  return '';
};

export default developmentGrid;
