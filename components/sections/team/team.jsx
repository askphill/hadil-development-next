/* eslint-disable no-underscore-dangle */
import { Image } from 'components/shared';

const Team = ({ data }) => {
  const { membersTitle, members } = data;

  return (
    <section className="px-8 bg-black text-white flex items-center w-full lg:px-0 lg:py-24 py-12 relative">
      <div className="flex flex-col lg:gap-16 gap-9 justify-between w-full lg:max-w-6xl mx-auto">
        {membersTitle && <h2 className="font-bold text-4xl lg:text-6xl">{membersTitle}</h2>}
        {members.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-14 gap-9">
            {members.map(member => (
              <div key={member._id} className="flex flex-col items-center">
                <Image
                  src={member.memberPhoto}
                  className="w-36 h-36 lg:w-56 lg:h-56 rounded-full overflow-hidden"
                  layout="fill"
                  loading="lazy"
                />
                <h3 className="lg:text-xl mt-4 lg:mt-7">{member.memberName}</h3>
                <p className="lg:text-xl lg:mt-2 mt-1">{member.company}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;
