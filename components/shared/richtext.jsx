import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

const RichText = ({ text }) => {
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: ({
        data: {
          target: {
            fields: { file, title },
          },
        },
      }) => <img alt={title.en} src={file.en.url} />,
    },
  };
  return documentToReactComponents(text, options);
};

export default RichText;
