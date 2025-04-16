/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { RichText } from 'components/shared';
import { useForm, Form } from 'react-hook-form';

const Contact = ({ data }) => {
  const { formText, formTitle, formButton } = data;
  const {
    register,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const [formMessage, setMessage] = useState(null); // success/error message
  const [loading, setLoading] = useState(false); // loading state

  const handleSuccess = () => {
    setMessage({ type: 'success', text: 'Your form was submitted!' });
    setLoading(false);
    reset(); // clear the form
  };

  const handleError = () => {
    setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    setLoading(false);
  };

  return (
    <section className="px-8 bg-black text-white flex items-center w-full lg:px-0 lg:py-24 py-12 relative">
      <div className="flex flex-col gap-y-9 lg:max-w-5xl lg:gap-y-20 mx-auto items-center">
        {formTitle && (
          <div className="[&>p]:font-bold [&>p]:text-4xl [&>p]:text-center lg:[&>p]:text-7xl">
            <RichText text={formTitle.json} />
          </div>
        )}
        <div className="flex flex-col gap-y-6 lg:gap-y-9 lg:max-w-96">
          <Form
            action="/api/subscribe"
            encType="application/json"
            control={control}
            onSubmit={() => setLoading(true)} // sets loading immediately
            onSuccess={handleSuccess}
            onError={handleError}
            className="flex flex-col gap-y-5"
          >
            <input
              {...register('mail', { required: 'Email Address is required' })}
              aria-invalid={errors.mail ? 'true' : 'false'}
              placeholder="Email Address"
              type="email"
              className="px-7 py-6 rounded-full bg-white text-black placeholder:text-black/20"
            />
            {errors.mail && (
              <p role="alert" className="text-danger">
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
            {errors.firstName && (
              <p role="alert" className="text-danger">
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
                  className="p-5 w-full text-white text-center block text-lg rounded-full bg-black disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : formButton.buttonText}
                </button>
              </div>
            )}

            {formMessage && (
              <p
                className={`text-center mt-4 ${
                  formMessage.type === 'success' ? 'text-success' : 'text-danger'
                }`}
              >
                {formMessage.text}
              </p>
            )}
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
