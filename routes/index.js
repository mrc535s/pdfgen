var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = [["title", "1"]];
  startup(data, res);
});

/* POST home page. */
router.post('/', function(req, res, next) {
  var dataJSON = JSON.stringify(req.body);
  var dataObj = {data: dataJSON};
  var data = mapObj(dataObj);
  console.log(data);
  startup(data, res);
});

// router.get('/pdf/', function(req, res, next) {
//   res.render('index', { title: 1});
// });

router.post('/pdf/', function(req, res, next) {
  console.log(req.body.data);
  var data = JSON.parse(req.body.data);
  res.render('index', data);
});

function startup(data, res) {
  var pdfGen= genPDF(data);
  console.log('Data: ' + data);
  pdfGen.on('finish', function () {
    res.download('BriefSummary.pdf', 'BriefSummary.pdf');
  });
}

function mapObj(o) {
  return reducer(o);
}

function reducer(x) {
	var keys = getKeys(x);
	return mapper(keys, x);
}

function getKeys(obj) {
	return Object.keys(obj);
}

function mapper(y, x) {
	return y.map(function(k) {
  	if(typeof x[k] === "object") {
    	return [k, reducer(x[k])];
    }
  	return [k, x[k]]
  });
}

function genPDF(data) {
  var fs = require('fs');
  //var customHeader = {'Content-Type': 'application/x-www-form-urlencoded'}
  var wkhtmltopdf = require('wkhtmltopdf');
  var url = 'https://immense-springs-99065.herokuapp.com/';
  //var url = 'http://localhost:3000/'

  var write = fs.createWriteStream('BriefSummary.pdf');
  // URL
  wkhtmltopdf(url + 'pdf', { pageSize: 'letter' ,
    orientation: 'landscape', printMediaType: true, post: data})
    .pipe(write);

  return write;
}

module.exports = router;
