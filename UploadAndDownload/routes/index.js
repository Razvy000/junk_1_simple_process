var express = require('express');
var router = express.Router();
var fs = require('fs');

var util = require('util')
var sys = require('sys');
var exec = require('child_process').exec;
var child;

var config = require('../config');

var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: config.mail.user,
        pass: config.mail.pass
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});


//////////////// UPLOAD
router.post('/upload', function(req, res) {
    console.log("UPLOAD:", req.body)
    var path = require('path'); // add path module
    fs.readFile(req.files.image.path, function(err, data) { // readfilr from the given path
        var dirname = path.resolve(".") + '/uploads/'; // path.resolve(“.”) get application directory path
        var newPath = dirname + req.files.image.originalFilename; // add the file name
        fs.writeFile(newPath, data, function(err) { // write file in uploads folder
            if (err) {
                res.json("Failed to upload your file");
            } else {
                res.json("Successfully uploaded your file");

                // execute a shell script if upload complete
                cmd = util.format('python grayscale.py "%s" ', newPath);
                // cmd = "ls"
                child = exec(cmd, function(error, stdout, stderr) {
                    sys.print('stdout: ' + stdout);
                    sys.print('stderr: ' + stderr);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                });
            }
        });
    });
});

router.get('/uploads/:file', function(req, res) {
    var path = require('path');
    file = req.params.file;
    var dirname = path.resolve(".") + '/uploads/';
    var img = fs.readFileSync(dirname + file);
    res.writeHead(200, {
        'Content-Type': 'image/jpg'
    });
    res.end(img, 'binary');
});


/////////////// DOWNLOAD
router.get('/download', function(req, res) { // create download route
    var path = require('path'); // get path
    var dir = path.resolve(".") + '/uploads/'; // give path
    fs.readdir(dir, function(err, list) { // read directory return  error or list
        if (err) return res.json(err);
        else
            res.json(list);
    });
});


/////////// MAIL
router.get('/send', function(req, res) {
    console.log("calling mailfun")
    message = "<html>" +
    "<head><title>" + "A horse rode a pig" + "</title></head>" +
        "<body>" +
        "Click <a href=\"" + "http://localhost:3000/gray_DSC01575.JPG" + "\">here</a> to get your picture." +
        "</body>" +
        "</html>";

    var mailOptions = {
        from: "razvanel@acasa.org", //"razvy000@gmail.com",
        to: req.query.to,
        subject: req.query.subject ,
        //text: req.query.text,
        html: message
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});


// the FILE
router.get('/:file(*)', function(req, res, next) { // this routes all types of file
    var path = require('path');
    var file = req.params.file;
    var path = path.resolve(".") + '/uploads/' + file;
    res.download(path); // magic of download fuction
});






module.exports = router;