var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');



//Get about
router.get('/about', function(req,res){
    res.render('about');
});

//Get services
router.get('/services', function(req,res){
    res.render('services');
});

//Get packages
router.get('/packages', function(req,res){
    res.render('packages');
});

//Get incentives
router.get('/incentives', function(req,res){
    res.render('incentives');
});

//Get contact
router.get('/contact', function(req,res){
    res.render('contact');
});

router.post('/send', function(req, res) {
    console.log(req.body);
    const output = `
        <p>You have a new cleaning request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
            <li>Subject: ${req.body.subject}</li>
            <li>Message: ${req.body.message}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;


    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            clientId: '398402135384-rpcl9lqhkgbl858t3ftjp0n98oph06rf.apps.googleusercontent.com',
            user: 'timesaversatl@gmail.com', // generated ethereal user
            pass: 'Tom$harpe123' // generated ethereal password
        },
        // tls:{
        //     rejectUnauthorized:false
        // }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"TimeSaversCleaning" <timesaversatl@gmail.com>', // sender address
        to: 'timesaversatl@gmail.com', // list of receivers
        subject: 'Cleaning Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('contact', { msg: 'Email has been sent' });
    });
});



module.exports = router;