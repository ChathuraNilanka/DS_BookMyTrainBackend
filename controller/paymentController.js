Payment = require('../model/paymentModel');

//import nodemailer
const nodeMailer = require('nodemailer');


//twilio configurations
const twilio = require('twilio');
const accountSid = 'ACdaf97c9c801ca1b4a2f370b6bcba9baf';
const authToken  = 'e27fc275722b6857ad477ca4c9a5dc0d';
const client = new twilio(accountSid, authToken);
const twilioNumber = '+12063507203';


// Handle card payments
exports.card = function (req, res) {
    //create an object in Payment model
    var payment = new Payment();
    //get the data from request body and assign to variables
    payment.userId = req.body.uId ? req.body.uId : payment.uId;
    payment.trainRoute = req.body.route;
    payment.numberOfTickets = req.body.nTickets;
    payment.amount = req.body.amount;
    payment.paymentType = req.body.type;
    payment.date = req.body.date;
    payment.time = req.body.time;
    var mail = req.body.mail;
    var phone = req.body.phone;
    var cardNumber = req.body.cardNuumber;
    
    //var cString = cardNumber.substr(0, 4)
    //verify the card details
    if(true){
        // save the payment and check for errors
        payment.save(function (err) {
            sendSMS(phone, payment); //call sms sending function
            sendEmail(mail, payment);  // call mail sending function

            res.json({
                    message: 'New payment added!', //send the response to frontend
                    data: payment
                });
        });
    }else{ // send the faild status if details are invalid
        res.json({
            message: 'failed!'
        });
    }
};


// Handle dialog payments
exports.dialog = function (req, res) {
    //create an object in Payment model
    var payment = new Payment();
    //get the data from request body and assign to variables
    payment.userId = req.body.uId ? req.body.uId : payment.uId;
    payment.trainRoute = req.body.route;
    payment.numberOfTickets = req.body.nTickets;
    payment.amount = req.body.amount;
    payment.paymentType = req.body.type;
    payment.date = req.body.date;
    var mail = req.body.mail;
    var phone = req.body.phone;
    var dialogNumber = req.body.dialogNumber;

    //var dString = dialogNumber.substr(0, 3)

    //verify the dialog details
    if(true){
        // save the payment and check for errors
        payment.save(function (err) {
            sendSMS(phone, payment); //call sms sending function
            sendEmail(mail, payment);  // call mail sending function

            res.json({
                message: 'New payment added!', //send the response to frontend
                data: payment
            });
        });
    }else{ // send the faild status if details are invalid
        res.json({
            message: 'failed!'
        });
    }

};


//SMS Sending function
function sendSMS(number, details){
    //define the message body
    let msg = 'Thank You for using BookMyTrain. Your payment receipt has been sent to Your Email.\nTrain Route :'+details.trainRoute+'. \nNumber of Tickets :'+details.numberOfTickets+'. \nTotal Amount :'+details.amount+'. \nPaid by : '+details.paymentType+'.'
    

    const textMessage = {
        body: msg, // message body
        to: number,  // to reciver's number
        from: twilioNumber // From a valid Twilio number
    }

    return client.messages.create(textMessage) 
        .then(() => console.log('sms success'))
        .catch((error) => console.error('There was an error while sending the sms:', error))
}

//email sending function
function sendEmail(email, details){
    //create transporter object
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'booklktrain@gmail.com',
            pass: 'bookmytrain@123'
        }
    });
    let mailOptions = {
        from: '"BookMyTrain" <booklktrain@gmail.com>', // sender address
        to: email, // receiver email
        subject: "Ticket Booking Information", // Subject line
        text: 'Thank You for using BookMyTrain. Your payment receipt has been sent to Your Email.\nTrain Route :'+details.trainRoute+'. \nNumber of Tickets :'+details.numberOfTickets+'. \nTotal Amount :'+details.amount+'. \nPaid by : '+details.paymentType+'.', // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => { 
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
            res.render('index');
    });
}