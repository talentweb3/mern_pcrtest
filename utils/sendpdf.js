import nodemailer from 'nodemailer';

import { convert } from 'html-to-text';

// new Email(user, url).sendWelcome();

export default class SendpdfEmail {
  
  constructor(user, url) {
    
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Doctor <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid 
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }
    
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async send(template, subject) {
    // Send the actual email

    const html = `
        <div style="margin: 40px">
          <p>${this.subject}</P>
          <p>If you want to download this, Click here.</p>
          <a href=${this.url}><button style="padding: 5px 10px; background-color: #1565c0; color: white; cursor: pointer">PCR_TEST</Button</a>
        <div>
      `

    const text = convert(html, {
      wordwrap: 130
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      html,
      text
    };
    
    // 3) create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }
  
  async sendWelcome() {
    await this.send("welcome", 'Welcome to the natours Family!');
  }

  async sendUrl() {
    await this.send("PCR Test Result", "This is your PCR test result.")
  }

}
