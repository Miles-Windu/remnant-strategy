const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const path = require('path');
const MailMessage = require('nodemailer/lib/mailer/mail-message');

const app = express();

const PORT = process.env.PORT || 8080;

// ================ Linking Styles and Javascript ==============
app.use(express.static(__dirname + '/views'));
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/views'));
}


// Data Parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/send', (req, res) => {
    //send emal here
    console.log(req.body)
    const output = `
        <h3>You have a new Inquiry from Remnant Strategy</h3>

        <hr>

        <h2>Media Inquiry</h2>
        <ul>
            <li>Name: ${req.body.inquiryName}</li>
            <li>Publication: ${req.body.inquiryPublication}</li>
            <li>Role: ${req.body.inquiryRole}</li>
            <li>Email Address: ${req.body.inquiryEmail}</li>
            <li>Phone Number: ${req.body.inquiryPhone}</li>
            <li>Deadline: ${req.body.inquiryDeadline}</li>
            <li>Location: ${req.body.inquiryLocation}</li>
        </ul>
        <p>${req.body.inquiryDetails}</p>


        <hr>

        <h2>Let's Chat</h2>
        <ul>
            <li>Name: ${req.body.inquiryName}</li>
            <li>Email: ${req.body.inquiryEmail}</li>
            <li>Organization: ${req.body.chatPublication}</li>
            <li>Role: ${req.body.chatRole}</li>
        </ul>
        <p>${req.body.chatMessage}</p><br>


        <hr>
            <h2>Speaking Engagement</h2>
            <p>Event Name: ${req.body.eventName}</p>
            <p>Organization Name: ${req.body.orgName}</p>
            <p>Event Location: ${req.body.eventLocation}</p>
            <p>Event Date: ${req.body.eventDate}</p>
            <p>Event Size: ${req.body.eventSize}</p>
            <p>Event topic: ${req.body.eventTopic}</p>
            <h4>Event Details: ${req.body.eventDetails}</h4>

            <h5>Contact Info:</h5>
        <ul>
            <li>Primary Contact Name: ${req.body.inquiryName}</li>
            <li>Primary Contact Email: ${req.body.inquiryEmail}</li>
            <li>Phone Number: ${req.body.primaryPhone}</li>
        </ul>

        <p>Thank you!</p>

        <hr>
    `;

    // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'mail.hover.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'info@mileswindu.com', // generated ethereal user
                pass: 'Kenners4Keeps!'  // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false,
                secureProtocol: "TLSv1_method"
            }
        });

    // send mail with defined transport object
    let mailOptions = {
        from: `"${req.body.inquiryName}" <${req.body.inquiryEmail}>`, // sender address
        to: "info@remnantstrategy.com", // list of receivers
        subject: "Remnant Strategy Inquiry", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    });
    // res.json({ message: req.body})
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.listen(PORT, () => {
    console.log('server is starting on PORT, ', PORT)
});