var express = require('express');
var router = express.Router();


/* POST home page. */
router.post('/', function (req, res, next) {   
  var conversion = require("phantom-html-to-pdf")();
    conversion({ 
      html: req.body.html,
      paperSize: {
        orientation: 'landscape',
        footerHeight: '20px'
      },
      footer: "<div style='font-size: 6.5px; margin-top: 20px;'> <span style='float: left;'> For non-spatial data, comparisons are based on the number of locations. For spatial data, comparisons are based on the number of unique location by soild type combinations. SSURGO is used to assign soil attributes to spatial trials </span> <span style='float: right'>Page {#pageNum} of {#numPages} </span>"
    }, function(err, pdf) {
      //console.log(pdf.logs);
      //console.log(pdf.numberOfPages);
      pdf.stream.pipe(res);
    });
});


module.exports = router;
