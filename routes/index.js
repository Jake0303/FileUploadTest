'use strict';
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

/*POST for handling file uploads*/
router.post('/upload', function (req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../public/images');
    form.parse(req, function (err, fields, files) {
        //Update the filename
        files.upload.name = fields.title + '.' + files.upload.name.split('.')[1];
        //Upload file to our server
        fs.rename(files.upload.path, path.join(form.uploadDir, files.upload.name), function (err) {
            if (err) console.log(err);
            else console.log("Successful upload");
            return res.render('index', { "image": '/images/' + files.upload.name });
        });
    });
    form.on('end', function (err) {
        if (err) console.log(err);
    });
});

module.exports = router;
