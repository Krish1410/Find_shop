const nodemailer = require('nodemailer');

async function sendEmail(to, subject, text) {
    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'Outlook', // e.g., 'Gmail', 'Outlook'
        auth: {
            user: 'krishmalaviya1401@outlook.com',
            pass: 'KrishSmart@12345&-+()/'
        }
    });

    // Define the email options
    const mailOptions = {
        from: 'krishmalaviya1401@outlook.com',
        to: to,
        subject: subject,
        text: text
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);
}

// Usage
sendEmail('bkmalaviya61@gmail.com', 'Test Email', 'This is a test email from Node.js');
