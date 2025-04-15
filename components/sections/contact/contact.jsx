/* eslint-disable react/jsx-props-no-spreading */
import { RichText } from 'components/shared';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';

const Text = ({ data }) => {
  const { formText, formTitle, formButton } = data;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = formData => console.log(formData);

  return (
    <section className="px-8 bg-black text-white flex items-center w-full lg:px-0 lg:py-24 py-12 relative">
      <div className="flex flex-col gap-y-9 lg:max-w-5xl lg:gap-y-20  mx-auto items-center">
        {formTitle && (
          <div className="[&>p]:font-bold [&>p]:text-4xl [&>p]:text-center lg:[&>p]:text-7xl">
            <RichText text={formTitle.json} />
          </div>
        )}
        <div className="flex flex-col gap-y-6 lg:gap-y-9 lg:max-w-96">
          <form className="flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('mail', { required: 'Email Address is required' })}
              aria-invalid={errors.mail ? 'true' : 'false'}
              placeholder="Email Address"
              type="email"
              className="px-7 py-6 rounded-full bg-white text-black placeholder:text-black/20"
            />
            {errors.mail && (
              <p role="alert" className="text-warning">
                {errors.mail.message}
              </p>
            )}
            <input
              {...register('firstName', { required: 'First name is required', maxLength: 20 })}
              aria-invalid={errors.firstName ? 'true' : 'false'}
              placeholder="First Name"
              type="text"
              className="px-7 py-6 rounded-full bg-white text-black placeholder:text-black/20"
            />
            {errors.firstName?.type === 'required' && (
              <p role="alert" className="text-warning">
                {errors.firstName.message}
              </p>
            )}
            <input
              {...register('lastName', { pattern: /^[A-Za-z]+$/i })}
              placeholder="Last Name"
              type="text"
              className="px-7 py-6 rounded-full bg-white text-black placeholder:text-black/20"
            />
            <input
              {...register('company')}
              placeholder="Company"
              type="text"
              className="px-7 py-6 rounded-full bg-white text-black placeholder:text-black/20"
            />
            <input
              {...register('job', { pattern: /^[A-Za-z]+$/i })}
              placeholder="Job Title"
              type="text"
              className="px-7 py-6 rounded-full bg-white text-black placeholder:text-black/20"
            />
            {formText && (
              <div className="[&>p]:text-sm px-7">
                <RichText text={formText.json} />
              </div>
            )}

            {formButton && (
              <div className="rounded-full p-[2px] bg-[linear-gradient(to_right,_#622888,_#BC5548,_#EBC286,_#F6F0DA)]">
                <button
                  type="submit"
                  aria-label={formButton.buttonText}
                  className="p-5 w-full text-white text-center block text-lg rounded-full bg-black "
                >
                  {formButton.buttonText}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Text;
