import Env from '../env';
import logger from '../logger';
import { NotFoundError } from '../utils/errors/http.error';
import SectorService from './sector.service';
import * as nodemailer from 'nodemailer';

class EmailService {
  private emailFrom: string;
  private passwordFrom: string;
  constructor() {
    this.emailFrom = Env.EMAIL_FROM;
    this.passwordFrom = Env.PASSWORD_FROM;
  }
  public async sendEmail(emailTo: string, title: string, msg: string): Promise<void> {
    const infomations = {
      service: 'gmail',
      auth: {
        user: this.emailFrom,
        pass: this.passwordFrom
      }
    }
    const transporter = nodemailer.createTransport(infomations);
    const mailOptions = {
      from: this.emailFrom,
      to: emailTo,
      subject: title,
      text: msg
    };
    transporter.sendMail(mailOptions, function(error: any, info: any){
      if (error) {
        logger.error(
          `[EmailService][sendMail] Error while sending the email`,
          error
        );
        console.log(error);
      } else {
        console.log('Sent Email : ' + info.response);
      }
    });
  }
}

export default EmailService;
