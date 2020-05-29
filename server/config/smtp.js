const nodemailer = require('nodemailer');

const DEFAULT_OPTIONS = {
  from: 'GradTrak <app@gradtrak.me>',
  replyTo: 'GradTrak <support@gradtrak.me>',
};

const WELCOME_EMAIL = {
  subject: 'Welcome to GradTrak!',
  text: `Placeholder text`, // FIXME Use actual text
};
module.exports.WELCOME_EMAIL = WELCOME_EMAIL;

let transporter;
if (process.env.SMTP_URL) {
  transporter = nodemailer.createTransport(process.env.SMTP_URL);
} else {
  transporter = nodemailer.createTransport({
    streamTransport: true,
  });
}

function sendMail(options) {
  return transporter.sendMail({ ...DEFAULT_OPTIONS, ...options }).then((info) => {
    if (!process.env.SMTP_URL) {
      console.log('No SMTP_URL environment variable found for message delivery:');
      console.log(options);
    }
    return info;
  });
}
module.exports.sendMail = sendMail;
