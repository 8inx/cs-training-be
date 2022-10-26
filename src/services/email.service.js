import nodemailer from 'nodemailer';
import config from 'config';
import Hogan from 'hogan.js';
import fs from 'fs';

const transporterConfig = {
  name: config.get('smtpName'),
  host: config.get('smtpHost'),
  port: config.get('smtpPort'),
  secure: false,
  auth: {
    user: config.get('smtpUser'),
    pass: config.get('smtpPass'),
  },
};
/**
 * Email Invite User
 * @param {string} email
 * @param {string} role
 * @param {string} accessLinkToken
 * @return
 */
export const sendEmailInvitation = async (email, role, registrationUrl) => {
  const template = fs.readFileSync(__dirname + '/../views/email.hjs', 'utf-8');
  const compiledTemplate = Hogan.compile(template);

  const transporter = nodemailer.createTransport(transporterConfig);

  const info = await transporter.sendMail({
    from: `"cs-training" <${transporterConfig.user}>`,
    to: email,
    subject: 'Welcome to CS-Training',
    html: compiledTemplate.render({ role, registrationUrl }),
  });

  return info;
};
