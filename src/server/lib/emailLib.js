import nodemailer from 'nodemailer';


// Use Gmail SMTP
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // upgrade later with STARTTLS
  // TODO: save creds in private config
  auth: {
    user: 'nambawanpakwan@gmail.com',
    pass: 'James1994!'
  }

});

async function verifyTransport(){
  return new Promise((resolve, reject)=>{
    transporter.verify( (err,success)=>{
      if(err){
        console.log('Transporter not verified');
        console.log({err});
        reject(err);
      }else{
        console.log('Transporter:');
        console.log(transporter);
        
        resolve(success);
      }
    } );
  });
}


async function sendEmail(){
  let emailData = {
    from: 'catalyst-api',
    to: 'metalvackal@gmail.com',
    subject: 'I\'m testing my App',
    text: 'This is my test message'
  };
  console.log('Sending Email...');
  let emailStatus = await transporter.sendMail(emailData);
  console.log('Email Sent!');

  return emailStatus;
}

async function sendAcctVeriCode({ userId, to, veriCode }={}){
  if( to && veriCode ){

    let emailData = {
      from: 'catalyst-api',
      to,
      subject: 'Cushy Trip Account Verification',
      text: `
      Your Verification Code is: ${veriCode}\n

      Go to this link to verify your account using the code provided: http://localhost:3000/app/profile/verify/${userId}
      `
    };
    
    console.log('Sending Email...');
    let emailStatus = await transporter.sendMail(emailData);
    console.log('Email Sent!');

    return emailStatus;
  }
  return false;
}
export const emailLib = {
  sendAcctVeriCode,
  verifyTransport,
  sendEmail
};