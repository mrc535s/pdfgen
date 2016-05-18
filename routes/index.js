var express = require('express');
var router = express.Router();
var fs = require('fs');
var wkhtmltopdf = require('wkhtmltopdf');
var appRoot = require('app-root-path');
var rk = require('randomkey');
var base = appRoot + '/public';
var genKey = rk(16, rk.safe); // so users won't clash image creation.
var pdf = 'BriefSummary_' + genKey + '.pdf';


/* POST home page. */
router.post('/', function (req, res, next) {
  var pdfGen = genPDF(req.body.data);
  pdfGen.on('finish', function () {
    res.download(pdf, pdf);
  });
});



function genPDF(data) {
  var write = fs.createWriteStream(pdf);
  wkhtmltopdf(data, {
      pageSize: 'letter',
      orientation: 'landscape',
      printMediaType: true,
      footerHtml: base + '/footer.html'
    })
    .pipe(write);

  return write;
}


module.exports = router;
