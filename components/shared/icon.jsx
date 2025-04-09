const Icon = ({ type, className }) => {
  switch (type) {
    case 'dropdown':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
        </svg>
      );
    case 'hamburger':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
          <path d="M2 5v2h20V5H2zm0 6v2h20v-2H2zm0 6v2h20v-2H2z" />
        </svg>
      );
    case 'close':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
          <path d="M4.707 3.293L3.293 4.707 10.586 12l-7.293 7.293 1.414 1.414L12 13.414l7.293 7.293 1.414-1.414L13.414 12l7.293-7.293-1.414-1.414L12 10.586 4.707 3.293z" />
        </svg>
      );
    default:
      return null;
  }
};

export default Icon;
