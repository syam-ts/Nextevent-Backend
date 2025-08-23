import nodemailer from "nodemailer";

type MailOptions = {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
};

const gmailPassword: string = process.env.GMAIL_APP_PASSWORD as string;

!gmailPassword && new Error("gamil password missing!");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "syamnandhu3@gmail.com",
    pass: gmailPassword,
  },
});

export const sendMail = (
  to: string,
  name: string,
  subject: string,
  text: string
): void => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Awesome Email</title>
</head>
<body>
    <h1>${subject}</h1>
    <p>Hello ${name}!</p>
    <p>${text}</p>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7TbpKwlHHtCgl7aQ5Qz2MHFPWWbzDKlnRqR8ZA2IxPxf4MHWgb2jhPXxJGrsuEOPmVLc&usqp=CAU"
    style="width: 50px; height: 50px;"
    alt="Embedded Image">
    <p>Nextevent Pvt Ltd!</p>
</body>
</html>`;

  const mailOptions: Required<MailOptions> = {
    from: "symanandhu3@gmail.com",
    to,
    subject,
    html,
    text,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      console.log("Email send: " + info.response);
    }
  });
};
