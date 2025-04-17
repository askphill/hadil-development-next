/* eslint-disable import/no-extraneous-dependencies */

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { mail, firstName, lastName, company, job } = req.body;
  const sanitize = str =>
    String(str || '')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  try {
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'hadil@askphill.com',
      subject: 'New Contact Form Submission',
      html: `
        <h2>Form Submission</h2>
        <p><strong>Email:</strong> ${sanitize(mail)}</p>
        <p><strong>Name:</strong> ${sanitize(firstName)} ${sanitize(lastName)}</p>
        <p><strong>Company:</strong> ${sanitize(company)}</p>
        <p><strong>Job Title:</strong> ${sanitize(job)}</p>
      `,
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ message: 'Failed to send email' });
  }
}
