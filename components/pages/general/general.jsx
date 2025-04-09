import renderSections from 'components/sections/render';

const PageGeneral = ({ data }) => {
  return <>{renderSections(data?.sections)}</>;
};

export default PageGeneral;
