import nodemailer from 'nodemailer'

const from ="Bookworm <info@bookworm.com>";

function setup(){

    return nodemailer.createTransport({
        host:"smtp.mailtrap.io",
        port:2525,
        auth:{
          user:	"d3d377bd424cf9",
          pass:	"d30865cbabe295"
        }

    });

};

export  function sendConfirmationEmail(user){

    const transport= setup();
    const email ={
      from,
      to: user.email,
      subject: "Welcome to Bookworm",
      text: `
      Welcome to Bookworm. Please, confirm your email.
      ${user.generateConfirmationUrl()}
      `
    };

    transport.sendMail(email);
}

export  function sendResetPasswordEmail(user){

    const transport= setup();
    const email ={
      from,
      to: user.email,
      subject: "Reset password",
      text: `
      To reset password, followthis link
      ${user.generateResetPasswordLink()}
      `
    };

    transport.sendMail(email);
}
