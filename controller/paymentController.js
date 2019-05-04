Payment = require('../model/paymentModel');
const twilio = require('twilio');
const request = require('request');
const nodemailer = require('nodemailer');
const postmarkTransport = require('nodemailer-postmark-transport');

const accountSid = 'ACdaf97c9c801ca1b4a2f370b6bcba9baf';
const authToken  = 'e27fc275722b6857ad477ca4c9a5dc0d';
const client = new twilio(accountSid, authToken);
const twilioNumber = '+12063507203';


// Handle card payments
exports.card = function (req, res) {
    var payment = new Payment();
    payment.userId = req.body.uId ? req.body.uId : payment.uId;
    payment.trainRoute = req.body.route;
    payment.numberOfTickets = req.body.nTickets;
    payment.amount = req.body.amount;
    payment.paymentType = req.body.type;
    payment.date = req.body.date;
    payment.time = req.body.time;
    var mail = req.body.mail;
    var phone = req.body.phone;
// save the payment and check for errors
payment.save(function (err) {
    sendSMS(phone, payment);

res.json({
            message: 'New payment added!',
            data: payment
        });
    });
};


// Handle dialog payments
exports.dialog = function (req, res) {
    var payment = new Payment();
    payment.userId = req.body.uId ? req.body.uId : payment.uId;
    payment.trainRoute = req.body.route;
    payment.numberOfTickets = req.body.nTickets;
    payment.amount = req.body.amount;
    payment.paymentType = req.body.type;
    payment.date = req.body.date;
    var mail = req.body.mail;
    var phone = req.body.phone;
// save the payment and check for errors
payment.save(function (err) {
    sendSMS(phone, payment);
        
res.json({
    message: 'New payment added!',
    data: payment
        });
    });
};

function sendSMS(number, details){

    let msg = 'Thank You for using BookMyTrain. Your payment receipt has been sent to Your Email.\nTrain Route :'+details.trainRoute+'. \nNumber of Tickets :'+details.numberOfTickets+'. \nTotal Amount :'+details.amount+'. \nPaid by :'+details.paymentType+'.'
    

    const textMessage = {
        body: msg,
        to: number,  // Text to this number
        from: twilioNumber // From a valid Twilio number
    }

    return client.messages.create(textMessage)
        .then(() => console.log('sms success'))
        .catch((error) => console.error('There was an error while sending the sms:', error))
}