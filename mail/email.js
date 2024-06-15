import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env'});

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendActivationEmail = async (email, token) => {
  
  const activationLink = `${process.env.BASE_URL}/activate?token=${token}`;
  //const mailOptions = ;

  await transporter.sendMail({
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Account Activation',
    html: `<p>Please click the following link to activate your account: <a href="${activationLink}">Activate</a></p>`
  }).catch(err => console.log(err));
};
