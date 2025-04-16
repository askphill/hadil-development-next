/* eslint-disable import/no-extraneous-dependencies */

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { mail, firstName, lastName, company, job } = req.body;

  if (!mail || !firstName) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Set up transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: mail,
      to: process.env.NODEMAILER_EMAIL,
      subject: 'New Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Email:</strong> ${mail}</p>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Job Title:</strong> ${job}</p>
      `,
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
