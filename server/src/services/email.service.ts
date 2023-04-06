import Env from '../env';
import logger from '../logger';
import * as nodemailer from 'nodemailer';

export default class EmailService {
  public static async sendEmail(emailTo: string, title: string, msg: string): Promise<void> {
    const infomations = {
      service: 'gmail',
      auth: {
        user: Env.EMAIL_FROM,
        pass: Env.PASSWORD_FROM
      }
    }

    const transporter = nodemailer.createTransport(infomations);

    const mailOptions = {
      from: Env.EMAIL_FROM,
      to: emailTo,
      subject: title,
      text: msg
    };

    transporter.sendMail(mailOptions, function(error: any, info: any){
      if(error){
        logger.error(
          `[EmailService][sendMail]` + error);
      }
    });
  }
}
