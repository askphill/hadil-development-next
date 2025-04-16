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

  const [formMessage, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSuccess = () => {
    setMessage({ type: 'success', text: 'Your form was submitted!' });
    setLoading(false);
    reset();
    setTimeout(() => setMessage(null), 5000);
  };

  const handleError = () => {
    setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    setLoading(false);
    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <section className="px-8 bg-black text-white flex items-center w-full lg:px-0 lg:py-24 py-12 relative">
      <div className="flex flex-col gap-y-9 lg:max-w-5xl lg:gap-y-20 mx-auto items-center">
        {formTitle && (
          <div className="[&>p]:font-bold [&>p]:text-4xl [&>p]:text-center lg:[&>p]:text-7xl">
            <RichText text={formTitle.json} />
          </div>
        )}
        <div className="flex flex-col gap-y-6 lg:gap-y-9 lg:max-w-96 w-full">
          <Form
            action="/api/subscribe"
            encType="application/json"
            control={control}
            onSubmit={() => setLoading(true)}
            onSuccess={handleSuccess}
            onError={handleError}
            className="flex flex-col gap-y-5"
          >
            <input
              id="mail"
              type="email"
              autoComplete="email"
              placeholder="Email Address"
              aria-invalid={errors.mail ? 'true' : 'false'}
              aria-describedby={errors.mail ? 'mail-error' : undefined}
              {...register('mail', { required: 'Email Address is required' })}
              className="px-7 py-6 rounded-full bg-white text-black placeholder:text-black/20"
            />
            {errors.mail && (
              <p id="mail-error" role="alert" className="text-danger">
                {errors.mail.message}
              </p>
            )}

            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              autoComplete="given-name"
              aria-invalid={errors.firstName ? 'true' : 'false'}
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
              {...register('firstName', {
                required: 'First name is required',
                maxLength: 20,
              })}
              className="px-7 py-6 rounded-full bg-white text-black placeholder:text-black/20"
            />
            {errors.firstName && (
              <p id="firstName-error" role="alert" className="text-danger">
                {errors.firstName.message}
              </p>
            )}

            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Last Name"
              aria-describedby="lastName-desc"
              {...register('lastName', { pattern: /^[A-Za-z]+$/i })}
              className="px-7 py-6 rounded-full bg-white text-black placeholder:text-black/20"
            />
            <div id="lastName-desc" className="sr-only">
              Only letters are allowed.
            </div>

            <input
              id="company"
              autoComplete="organization"
              type="text"
              placeholder="Company"
              {...register('company')}
              className="px-7 py-6 rounded-full bg-white text-black placeholder:text-black/20"
            />

            <input
              id="job"
              type="text"
              autoComplete="organization-title"
              placeholder="Job Title"
              aria-describedby="job-desc"
              {...register('job')}
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
                role="alert"
                aria-live="polite"
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
