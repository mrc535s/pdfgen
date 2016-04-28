var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.send('id: ' + req.query.id);
  var pdfGen= genPDF();

  pdfGen.on('finish', function () {
    res.download('BriefSummary.pdf');
  });
});

router.get('/pdf/', function(req, res, next) {
  //res.send('id: ' + req.query.id);
  res.render('index', { title: 1});
});

function genPDF() {
  var fs = require('fs');
  var wkhtmltopdf = require('wkhtmltopdf');

  var write = fs.createWriteStream('BriefSummary.pdf');

  // URL
  wkhtmltopdf('https://immense-springs-99065.herokuapp.com/pdf', { pageSize: 'letter' , orientation: 'landscape', printMediaType: true})
    .pipe(write);

  return write;
}

module.exports = router;
