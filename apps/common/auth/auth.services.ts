import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as mjml2html from 'mjml';

@Injectable()
export class AuthService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'harbajsinghwins@gmail.com',
        pass: 'voxl epqz jejp tcgh',
      },
    });
  }
  //send email
  async sendEmail(to: string, subject: string) {
    try {
      const { html } = await this.mjmlTemplateFun();
      const mailOptions = {
        from: 'mailto:your-gmail-email@gmail.com',
        to,
        subject,
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      return info.response;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
  //template to send email
  async mjmlTemplateFun() {
    const mjmlTemplate = `<mjml>
    <mj-head>
      <mj-title>Welcome to Our Platform</mj-title>
      <mj-font name="Roboto" href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500"></mj-font>
      <mj-attributes>
        <mj-all font-family="Montserrat, Helvetica, Arial, sans-serif"></mj-all>
        <mj-text font-weight="400" font-size="16px" color="#000000" line-height="24px"></mj-text>
        <mj-section padding="0px"></mj-section>
      </mj-attributes>
    </mj-head>
    <mj-body background-color="#F2F2F2">
      <mj-section padding="10px 0 20px 0">
        <mj-column>
          <mj-text align="center" color="#9B9B9B" font-size="11px">Welcome to Our Platform</mj-text>
        </mj-column>
      </mj-section>
      <mj-section padding="20px 20px 0 20px" background-color="#FFFFFF">
        <mj-column width="35%">
          <mj-text align="left" font-size="20px" font-weight="500">Welcome,</mj-text>
        </mj-column>
        <mj-column width="65%">
          <mj-text align="right" font-size="11px">HOME / SERVICE / THIRD</mj-text>
        </mj-column>
      </mj-section>
      <mj-section padding="20px 20px 0 20px" background-color="#FFFFFF">
        <mj-column>
          <mj-text align="center" font-weight="300" padding="30px 40px 10px 40px" font-size="32px" line-height="40px" color="#5FA91D">Welcome to Our Platform</mj-text>
        </mj-column>
      </mj-section>
      <mj-section padding="10px 20px" background-color="#FFFFFF">
        <mj-column>
          <mj-divider width="30px" border-width="3px" border-color="#9B9B9B"></mj-divider>
        </mj-column>
      </mj-section>
      <mj-section padding="0 20px 20px 20px" background-color="#FFFFFF">
        <mj-column width="80%">
          <mj-text align="center" padding-top="10px" font-weight="500" padding="0px">We're thrilled to have you on board.</mj-text>
        </mj-column>
      </mj-section>
      <mj-section background-url="http://nimus.de/share/tpl-card/bg.jpg" vertical-align="middle" background-size="cover" background-repeat="no-repeat">
        <mj-column width="100%">
          <mj-image src="http://nimus.de/share/tpl-card/lineshadow.png" alt="" align="center" border="none" padding="0px"></mj-image>
          <mj-text align="center" padding="50px 40px 0 40px" font-weight="300">Thank you for joining us. We're excited to help you succeed on our platform.</mj-text>
          <mj-button align="center" background-color="#5FA91D" color="#FFFFFF" border-radius="2px" href="#" inner-padding="15px 30px" padding-bottom="100px" padding-top="20px">Explore Our Platform</mj-button>
        </mj-column>
      </mj-section>
      <mj-section padding="50px 0 0 0" background-color="#FFFFFF">
        <mj-column>
          <mj-image src="http://nimus.de/share/tpl-card/bottom.png" alt="bottom border" align="center" border="none" padding="0px"></mj-image>
        </mj-column>
      </mj-section>
      <mj-section padding="10px 0 20px 0">
        <mj-column>
          <mj-text align="center" color="#9B9B9B" font-size="11px"><a href="#" style="color: #9B9B9B;">Unsubscribe</a> from this newsletter<br />52 Edison Court Suite 259 / East Aidabury / Cambodi<br /> <a href="#" style="color: #9B9B9B; text-decoration:none;">Made by svenhaustein.de</a></mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>`;
    return mjml2html(mjmlTemplate);
  }
}
