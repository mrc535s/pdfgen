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
  // var options = {
  //     pageSize: 'letter',
  //     orientation: 'landscape',
  //     printMediaType: true,
  //     footerLeft: "For non-spatial data,comparisons are based on the number of locations. For spatial data,comparisons are based on the number of unique location by soild type combinations.SSURGO is used to assign soil attributes to spatial trials",
  //     footerRight: "Page [page] of [topage]",
  //     footerFontSize: 6,
  //     footerLine: true,
  //     footerFontName: "Helvetica",
  //     footerSpacing: 1
  //   };
    
  var options = req.body.options;
  var pdfGen = genPDF(req.body.html, options);
  pdfGen.on('finish', function () {
    res.download(pdf, pdf);
  });
});



function genPDF(html, options) {
  var write = fs.createWriteStream(pdf);
  wkhtmltopdf(html, options)
    .pipe(write);

  return write;
}


module.exports = router;
