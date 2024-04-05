import mail from '@sendgrid/mail';
import { NextResponse } from 'next/server';

// Create an api key in sendgrid and store someplace safe
mail.setApiKey("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");

type ResponseData = {
  status?: string;
  message?: string;
};

export async function POST(request: Request) {
  let response: ResponseData = {};
  const body = await request.json();
  // I know the formData I sent in my request has name, email, and message fields so I'm just manually grabbing them to format a message
  const message = `
    Name: ${body.firstName} ${body.lastName}\r\n
    Email: ${body.email}\r\n
    Message: ${body.message}\r\n
    Phone: ${body.phone}
  `;
  const data = {
    to: 'mfcronin@nic.edu',
    from: 'mcronin2@outlook.com',
    subject: `Website message from ${body.firstName} ${body.lastName}`,
    text: message,
    html: message.replace(/\r\n/g, '<br>'),
  };

  // Send the data and create a response object. I'm using status and message to display a success or fail notification in the UI
  await mail
    .send(data)
    .then(() => {
      response = {
        status: 'success',
        message: "Your message was sent. I'll be in contact shortly.",
      };
    })
    .catch((error) => {
      response = {
        status: 'error',
        message: `Message failed to send with error, ${error}`,
      };
    });

  return NextResponse.json(response);
}