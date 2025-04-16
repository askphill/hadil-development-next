/* eslint-disable no-underscore-dangle */
import { Image } from 'components/shared';

const Team = ({ data }) => {
  const { membersTitle, members } = data;
  if (!members.length) return null;

  return (
    <section
      className="px-8 bg-black text-white flex items-center w-full lg:px-0 lg:py-24 py-12 relative"
      aria-labelledby="team-section-title"
    >
      <div className="flex flex-col lg:gap-16 gap-9 justify-between w-full lg:max-w-6xl mx-auto">
        {membersTitle && (
          <h2 id="team-section-title" className="font-bold text-4xl lg:text-6xl">
            {membersTitle}
          </h2>
        )}

        {members.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-14 gap-9">
            {members.map((member, index) => (
              <div key={member._id || index} className="flex flex-col items-center text-center">
                {member.memberPhoto && (
                  <div className="relative rounded-full overflow-hidden">
                    <Image
                      src={member.memberPhoto}
                      alt={member.memberName}
                      className="w-36 h-36 lg:w-56 lg:h-56"
                      layout="fill"
                      loading="lazy"
                    />
                  </div>
                )}

                {member.memberName && (
                  <h3 className="lg:text-xl mt-4 lg:mt-7">{member.memberName}</h3>
                )}
                {member.company && (
                  <p className="lg:text-xl lg:mt-2 mt-1">{member.company || 'Company Unknown'}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;
