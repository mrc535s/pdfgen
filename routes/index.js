var express = require('express');
var router = express.Router();
var fs = require('fs');
var wkhtmltopdf = require('wkhtmltopdf');


/* GET home page. */
router.get('/', function (req, res, next) {
  var data = [
    ["title", "1"]
  ];
  res.render('index', sampleData);
  // startup(data, res);
});

/* POST home page. */
router.post('/', function (req, res, next) {
  var sampleData = getSampleData(); // use this if you want to call directly.
  var response = JSON.parse(req.body.data);
  var dataJSON = JSON.stringify(response.data);
  var dataObj = {
    data: dataJSON
  };
  var data = mapObj(dataObj);
  startup(data, res, req);
});

router.get('/pdf/', function (req, res, next) {
  var data = sampleData;
  res.render('pdf', data);
});

router.post('/pdf/', function (req, res, next) {
  var data = JSON.parse(req.body.data);

  console.log(data);
  //var data = sampleData;
  res.render('pdf', data);
});

function startup(data, res, req) {
  var pdfGen = genPDF(data, req);
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
  return y.map(function (k) {
    if (typeof x[k] === "object") {
      return [k, reducer(x[k])];
    }
    return [k, x[k]]
  });
}

function genPDF(data, req) {
  var url = req.protocol + '://' + req.get('host') + req.originalUrl;
  var write = fs.createWriteStream('BriefSummary.pdf');
  // URL
  wkhtmltopdf(fullUrl + 'pdf', {
      pageSize: 'letter',
      orientation: 'landscape',
      printMediaType: true,
      post: data
    })
    .pipe(write);

  return write;
}

function getSampleData() {
  return {
        "spatialFilter": {
          "src": "http://maps-t.monsanto.com/arcgis/rest/directories/arcgisoutput/Utilities/PrintingTools_GPServer/_ags_815ba20d2e9b46b0b1a7a0ef647192a3.png"
        },
        "criteria": [{
          "title": "Check Products",
          "value": "DKC60-67RIB, DKC61-16RIB, DKC61-54RIB, DKC62-98RIB, DKC62-78RIB, DKC63-87RIB"
        }, {
          "title": "Other Products",
          "value": "P0993AM1, P1151XR, P1690AM, P1365, P1271AM, P1324HR, P1151AM1, P0636AM1, P0407AMXT, P1197AM, P1197CHR, P1142AMX, P1257AM, P1768AMX, P0636HR, P0969AM, P0801AM, P0987AM1, P1625CHR, P0876CHR, P1555CHR, P0993XR, P1690CHR, 33D53 AM1, P1690HR, P1151AMX, P1498AM, P0636AM, P2088AM, P1498AM1, P1151AM, P0832AM1, P1365AMX, P1360HR, 33D42-INTRASECT, P1023AM-R, P1266AM, P1151HR, P1105AM, P0805AM"
        }, {
          "title": "Years Examined",
          "value": "2014"
        }, {
          "title": "Test Types",
          "value": "FTN"
        }],
        "legal": "/images/legal-Dekalb-Corn.jpg",
        "logo": "/images/dekalb-logo.jpg",
        "tableData": {
          "rows": [{
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P0636AM1",
            "compTraits": "AM1",
            "compRM": 106,
            "compPT": null,
            "winPercentage": "75.0",
            "comps": 3,
            "checkWins": 3,
            "years": "14",
            "isSummary": false,
            "Check_YIELD": "203.8",
            "Other_YIELD": 195.3,
            "Advantage_YIELD": "8.5",
            "Check_HARVEST MOISTURE": "16.1",
            "Other_HARVEST MOISTURE": 15.3,
            "Advantage_HARVEST MOISTURE": "-0.9",
            "Check_GROSS INCOME": "754.93",
            "Other_GROSS INCOME": 730.16,
            "Advantage_GROSS INCOME": "24.77",
            "$$hashKey": "object:8787"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P1151AMX",
            "compTraits": "AMX",
            "compRM": 111,
            "compPT": null,
            "winPercentage": "44.0",
            "comps": 19,
            "checkWins": 11,
            "years": "14",
            "isSummary": false,
            "Check_YIELD": "229.1",
            "Other_YIELD": 226.8,
            "Advantage_YIELD": "2.2",
            "Check_HARVEST MOISTURE": "17.2",
            "Other_HARVEST MOISTURE": 17.4,
            "Advantage_HARVEST MOISTURE": "0.2",
            "Check_GROSS INCOME": "838.74",
            "Other_GROSS INCOME": 828.84,
            "Advantage_GROSS INCOME": "9.90",
            "$$hashKey": "object:8788"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P0407AMXT",
            "compTraits": "AMXT",
            "compRM": 104,
            "compPT": null,
            "winPercentage": "75.0",
            "comps": 3,
            "checkWins": 3,
            "years": "14",
            "isSummary": false,
            "Check_YIELD": "214.6",
            "Other_YIELD": 182.6,
            "Advantage_YIELD": "32.0",
            "Check_HARVEST MOISTURE": "18.2",
            "Other_HARVEST MOISTURE": 16.5,
            "Advantage_HARVEST MOISTURE": "-1.7",
            "Check_GROSS INCOME": "777.48",
            "Other_GROSS INCOME": 673.72,
            "Advantage_GROSS INCOME": "103.76",
            "$$hashKey": "object:8789"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "33D53 AM1",
            "compTraits": "AM1",
            "compRM": 115,
            "compPT": null,
            "winPercentage": "75.0",
            "comps": 3,
            "checkWins": 3,
            "years": "14",
            "isSummary": false,
            "Check_YIELD": "233.4",
            "Other_YIELD": 221.7,
            "Advantage_YIELD": "11.8",
            "Check_HARVEST MOISTURE": "14.9",
            "Other_HARVEST MOISTURE": 15.2,
            "Advantage_HARVEST MOISTURE": "0.3",
            "Check_GROSS INCOME": "875.30",
            "Other_GROSS INCOME": 829.34,
            "Advantage_GROSS INCOME": "45.96",
            "$$hashKey": "object:8790"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P1690AM",
            "compTraits": "AM",
            "compRM": 116,
            "compPT": null,
            "winPercentage": "26.3",
            "comps": 13,
            "checkWins": 5,
            "years": "14",
            "isSummary": false,
            "Check_YIELD": "214.0",
            "Other_YIELD": 219.1,
            "Advantage_YIELD": "-5.2",
            "Check_HARVEST MOISTURE": "16.8",
            "Other_HARVEST MOISTURE": 18.1,
            "Advantage_HARVEST MOISTURE": "1.3",
            "Check_GROSS INCOME": "787.09",
            "Other_GROSS INCOME": 794.69,
            "Advantage_GROSS INCOME": "-7.60",
            "$$hashKey": "object:8791"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P1498AM",
            "compTraits": "AM",
            "compRM": 114,
            "compPT": null,
            "winPercentage": "63.2",
            "comps": 14,
            "checkWins": 12,
            "years": "14, 15",
            "isSummary": false,
            "Check_YIELD": "217.7",
            "Other_YIELD": 204.5,
            "Advantage_YIELD": "13.2",
            "Check_HARVEST MOISTURE": "18.4",
            "Other_HARVEST MOISTURE": 19.6,
            "Advantage_HARVEST MOISTURE": "1.2",
            "Check_GROSS INCOME": "786.71",
            "Other_GROSS INCOME": 729.17,
            "Advantage_GROSS INCOME": "57.54",
            "$$hashKey": "object:8792"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "33D42-INTRASECT",
            "compTraits": "INTRASECT",
            "compRM": 115,
            "compPT": null,
            "winPercentage": "57.1",
            "comps": 6,
            "checkWins": 4,
            "years": "14",
            "isSummary": false,
            "Check_YIELD": "208.5",
            "Other_YIELD": 207.3,
            "Advantage_YIELD": "1.3",
            "Check_HARVEST MOISTURE": "16.8",
            "Other_HARVEST MOISTURE": 17.8,
            "Advantage_HARVEST MOISTURE": "1.0",
            "Check_GROSS INCOME": "767.01",
            "Other_GROSS INCOME": 754.21,
            "Advantage_GROSS INCOME": "12.81"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P1690HR",
            "compTraits": "RR2/HX1/LL",
            "compRM": 116,
            "compPT": null,
            "winPercentage": 0,
            "comps": 3,
            "checkWins": 0,
            "years": "14",
            "isSummary": false,
            "Check_YIELD": "233.4",
            "Other_YIELD": 248.6,
            "Advantage_YIELD": "-15.2",
            "Check_HARVEST MOISTURE": "14.9",
            "Other_HARVEST MOISTURE": 16,
            "Advantage_HARVEST MOISTURE": "1.2",
            "Check_GROSS INCOME": "875.30",
            "Other_GROSS INCOME": 921.96,
            "Advantage_GROSS INCOME": "-46.65"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P1257AM",
            "compTraits": "AM",
            "compRM": 112,
            "compPT": null,
            "winPercentage": 0,
            "comps": 2,
            "checkWins": 0,
            "years": "15",
            "isSummary": false,
            "Check_YIELD": "201.7",
            "Other_YIELD": 222.7,
            "Advantage_YIELD": "-21.0",
            "Check_HARVEST MOISTURE": "18.3",
            "Other_HARVEST MOISTURE": 17.6,
            "Advantage_HARVEST MOISTURE": "-0.7",
            "Check_GROSS INCOME": "729.80",
            "Other_GROSS INCOME": 812.27,
            "Advantage_GROSS INCOME": "-82.47"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P1151AM1",
            "compTraits": "AM1",
            "compRM": 111,
            "compPT": null,
            "winPercentage": "41.7",
            "comps": 43,
            "checkWins": 25,
            "years": "14",
            "isSummary": false,
            "Check_YIELD": "292.8",
            "Other_YIELD": 286.9,
            "Advantage_YIELD": "6.0",
            "Check_HARVEST MOISTURE": "24.0",
            "Other_HARVEST MOISTURE": 23.9,
            "Advantage_HARVEST MOISTURE": "-0.1",
            "Check_GROSS INCOME": "992.76",
            "Other_GROSS INCOME": 974.05,
            "Advantage_GROSS INCOME": "18.71"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P1151AM",
            "compTraits": "AM",
            "compRM": 111,
            "compPT": null,
            "winPercentage": "31.7",
            "comps": 30,
            "checkWins": 13,
            "years": "14",
            "isSummary": false,
            "Check_YIELD": "221.8",
            "Other_YIELD": 225.3,
            "Advantage_YIELD": "-3.4",
            "Check_HARVEST MOISTURE": "17.7",
            "Other_HARVEST MOISTURE": 17.6,
            "Advantage_HARVEST MOISTURE": "-0.2",
            "Check_GROSS INCOME": "807.40",
            "Other_GROSS INCOME": 821.61,
            "Advantage_GROSS INCOME": "-14.20"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P1498AM1",
            "compTraits": "AM1",
            "compRM": 114,
            "compPT": null,
            "winPercentage": "50.0",
            "comps": 45,
            "checkWins": 31,
            "years": "14, 15",
            "isSummary": false,
            "Check_YIELD": "274.2",
            "Other_YIELD": 265.4,
            "Advantage_YIELD": "8.8",
            "Check_HARVEST MOISTURE": "22.9",
            "Other_HARVEST MOISTURE": 24.1,
            "Advantage_HARVEST MOISTURE": "1.2",
            "Check_GROSS INCOME": "941.80",
            "Other_GROSS INCOME": 898.69,
            "Advantage_GROSS INCOME": "43.11"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P1151HR",
            "compTraits": "RR2/HX1/LL",
            "compRM": 111,
            "compPT": null,
            "winPercentage": "75.0",
            "comps": 3,
            "checkWins": 3,
            "years": "14",
            "isSummary": false,
            "Check_YIELD": "205.6",
            "Other_YIELD": 204.5,
            "Advantage_YIELD": "1.1",
            "Check_HARVEST MOISTURE": "18.4",
            "Other_HARVEST MOISTURE": 17.7,
            "Advantage_HARVEST MOISTURE": "-0.7",
            "Check_GROSS INCOME": "743.10",
            "Other_GROSS INCOME": 744.81,
            "Advantage_GROSS INCOME": "-1.71"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P1365AMX",
            "compTraits": "AMXR",
            "compRM": 113,
            "compPT": null,
            "winPercentage": 0,
            "comps": 2,
            "checkWins": 0,
            "years": "14",
            "isSummary": false,
            "Check_YIELD": "242.5",
            "Other_YIELD": 243.9,
            "Advantage_YIELD": "-1.4",
            "Check_HARVEST MOISTURE": "16.2",
            "Other_HARVEST MOISTURE": 17.6,
            "Advantage_HARVEST MOISTURE": "1.4",
            "Check_GROSS INCOME": "897.52",
            "Other_GROSS INCOME": 889.17,
            "Advantage_GROSS INCOME": "8.35"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P1197CHR",
            "compTraits": "CHR",
            "compRM": 111,
            "compPT": null,
            "winPercentage": "16.7",
            "comps": 5,
            "checkWins": 1,
            "years": "15",
            "isSummary": false,
            "Check_YIELD": "237.7",
            "Other_YIELD": 252.8,
            "Advantage_YIELD": "-15.1",
            "Check_HARVEST MOISTURE": "19.6",
            "Other_HARVEST MOISTURE": 19.7,
            "Advantage_HARVEST MOISTURE": "0.1",
            "Check_GROSS INCOME": "848.04",
            "Other_GROSS INCOME": 900.91,
            "Advantage_GROSS INCOME": "-52.87"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P1324HR",
            "compTraits": "RR2/HX1/LL",
            "compRM": 113,
            "compPT": null,
            "winPercentage": "75.0",
            "comps": 3,
            "checkWins": 3,
            "years": "14",
            "isSummary": false,
            "Check_YIELD": "203.8",
            "Other_YIELD": 187.1,
            "Advantage_YIELD": "16.7",
            "Check_HARVEST MOISTURE": "16.1",
            "Other_HARVEST MOISTURE": 16,
            "Advantage_HARVEST MOISTURE": "-0.1",
            "Check_GROSS INCOME": "754.93",
            "Other_GROSS INCOME": 693.92,
            "Advantage_GROSS INCOME": "61.01"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P0805AM",
            "compTraits": "AM",
            "compRM": 108,
            "compPT": null,
            "winPercentage": 0,
            "comps": 2,
            "checkWins": 0,
            "years": "15",
            "isSummary": false,
            "Check_YIELD": "201.7",
            "Other_YIELD": 211.7,
            "Advantage_YIELD": "-10.0",
            "Check_HARVEST MOISTURE": "18.3",
            "Other_HARVEST MOISTURE": 17.5,
            "Advantage_HARVEST MOISTURE": "-0.7",
            "Check_GROSS INCOME": "729.80",
            "Other_GROSS INCOME": 772.2,
            "Advantage_GROSS INCOME": "-42.40"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P0636AM",
            "compTraits": "AM",
            "compRM": 106,
            "compPT": null,
            "winPercentage": "75.0",
            "comps": 3,
            "checkWins": 3,
            "years": "14",
            "isSummary": false,
            "Check_YIELD": "195.5",
            "Other_YIELD": 163.7,
            "Advantage_YIELD": "31.8",
            "Check_HARVEST MOISTURE": "16.5",
            "Other_HARVEST MOISTURE": 14.1,
            "Advantage_HARVEST MOISTURE": "-2.4",
            "Check_GROSS INCOME": "721.53",
            "Other_GROSS INCOME": 613.86,
            "Advantage_GROSS INCOME": "107.67"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P0993AM1",
            "compTraits": "AM1",
            "compRM": 109,
            "compPT": null,
            "winPercentage": "64.0",
            "comps": 19,
            "checkWins": 16,
            "years": "14",
            "isSummary": false,
            "Check_YIELD": "213.0",
            "Other_YIELD": 203.2,
            "Advantage_YIELD": "9.8",
            "Check_HARVEST MOISTURE": "17.8",
            "Other_HARVEST MOISTURE": 15.7,
            "Advantage_HARVEST MOISTURE": "-2.1",
            "Check_GROSS INCOME": "774.67",
            "Other_GROSS INCOME": 756.26,
            "Advantage_GROSS INCOME": "18.41"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P1365",
            "compTraits": "AMX",
            "compRM": 113,
            "compPT": null,
            "winPercentage": "50.0",
            "comps": 1,
            "checkWins": 1,
            "years": "14",
            "isSummary": false,
            "Check_YIELD": "230.1",
            "Other_YIELD": 220.3,
            "Advantage_YIELD": "9.7",
            "Check_HARVEST MOISTURE": "15.2",
            "Other_HARVEST MOISTURE": 16.1,
            "Advantage_HARVEST MOISTURE": "0.9",
            "Check_GROSS INCOME": "861.00",
            "Other_GROSS INCOME": 816.48,
            "Advantage_GROSS INCOME": "44.53"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P1266AM",
            "compTraits": "AM",
            "compRM": 112,
            "compPT": null,
            "winPercentage": "38.1",
            "comps": 69,
            "checkWins": 37,
            "years": "14, 15",
            "isSummary": false,
            "Check_YIELD": "297.4",
            "Other_YIELD": 297.3,
            "Advantage_YIELD": "0.2",
            "Check_HARVEST MOISTURE": "24.5",
            "Other_HARVEST MOISTURE": 24,
            "Advantage_HARVEST MOISTURE": "-0.6",
            "Check_GROSS INCOME": "1001.92",
            "Other_GROSS INCOME": 1008.08,
            "Advantage_GROSS INCOME": "-6.16"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P1690CHR",
            "compTraits": "CHR",
            "compRM": 116,
            "compPT": null,
            "winPercentage": "29.6",
            "comps": 59,
            "checkWins": 24,
            "years": "14",
            "isSummary": false,
            "Check_YIELD": "346.9",
            "Other_YIELD": 358.9,
            "Advantage_YIELD": "-12.0",
            "Check_HARVEST MOISTURE": "25.9",
            "Other_HARVEST MOISTURE": 28.9,
            "Advantage_HARVEST MOISTURE": "3.0",
            "Check_GROSS INCOME": "1149.93",
            "Other_GROSS INCOME": 1146.25,
            "Advantage_GROSS INCOME": "3.68"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P1197AM",
            "compTraits": "AM",
            "compRM": 111,
            "compPT": null,
            "winPercentage": 0,
            "comps": 2,
            "checkWins": 0,
            "years": "15",
            "isSummary": false,
            "Check_YIELD": "201.7",
            "Other_YIELD": 229.6,
            "Advantage_YIELD": "-27.9",
            "Check_HARVEST MOISTURE": "18.3",
            "Other_HARVEST MOISTURE": 18.2,
            "Advantage_HARVEST MOISTURE": "-0.1",
            "Check_GROSS INCOME": "729.80",
            "Other_GROSS INCOME": 831.54,
            "Advantage_GROSS INCOME": "-101.73"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P1271AM",
            "compTraits": "AM",
            "compRM": 112,
            "compPT": null,
            "winPercentage": 0,
            "comps": 2,
            "checkWins": 0,
            "years": "15",
            "isSummary": false,
            "Check_YIELD": "201.7",
            "Other_YIELD": 218.4,
            "Advantage_YIELD": "-16.7",
            "Check_HARVEST MOISTURE": "18.3",
            "Other_HARVEST MOISTURE": 19.1,
            "Advantage_HARVEST MOISTURE": "0.8",
            "Check_GROSS INCOME": "729.80",
            "Other_GROSS INCOME": 783.57,
            "Advantage_GROSS INCOME": "-53.77"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P1105AM",
            "compTraits": "AM",
            "compRM": 110,
            "compPT": null,
            "winPercentage": "7.4",
            "comps": 19,
            "checkWins": 2,
            "years": "14",
            "isSummary": false,
            "Check_YIELD": "336.0",
            "Other_YIELD": 353.6,
            "Advantage_YIELD": "-17.6",
            "Check_HARVEST MOISTURE": "23.6",
            "Other_HARVEST MOISTURE": 25.2,
            "Advantage_HARVEST MOISTURE": "1.6",
            "Check_GROSS INCOME": "1144.89",
            "Other_GROSS INCOME": 1182.27,
            "Advantage_GROSS INCOME": "-37.37"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P0801AM",
            "compTraits": "AM",
            "compRM": 108,
            "compPT": null,
            "winPercentage": 0,
            "comps": 2,
            "checkWins": 0,
            "years": "15",
            "isSummary": false,
            "Check_YIELD": "201.7",
            "Other_YIELD": 228,
            "Advantage_YIELD": "-26.3",
            "Check_HARVEST MOISTURE": "18.3",
            "Other_HARVEST MOISTURE": 17.4,
            "Advantage_HARVEST MOISTURE": "-0.9",
            "Check_GROSS INCOME": "729.80",
            "Other_GROSS INCOME": 833.1,
            "Advantage_GROSS INCOME": "-103.30"
          }, {
            "checkBrand": "DEKALB",
            "checkProdBrand": "DKC61-54RIB",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "BB",
            "compBrand": "PIONEER",
            "compProdBrand": "P1360HR",
            "compTraits": "RR/HX1/LL",
            "compRM": 113,
            "compPT": null,
            "winPercentage": 0,
            "comps": 2,
            "checkWins": 0,
            "years": "14",
            "isSummary": false,
            "Check_YIELD": "200.6",
            "Other_YIELD": 203.7,
            "Advantage_YIELD": "-3.1",
            "Check_HARVEST MOISTURE": "19.7",
            "Other_HARVEST MOISTURE": 20,
            "Advantage_HARVEST MOISTURE": "0.3",
            "Check_GROSS INCOME": "714.32",
            "Other_GROSS INCOME": 722.89,
            "Advantage_GROSS INCOME": "-8.56"
          }, {
            "Check_YIELD": "273.8",
            "Check_HARVEST MOISTURE": "21.8",
            "Check_GROSS INCOME": "946.04",
            "Other_YIELD": 274.22228116710875,
            "Other_HARVEST MOISTURE": 22.353580901856763,
            "Other_GROSS INCOME": 939.0934482758623,
            "Advantage_YIELD": "-0.4",
            "Advantage_HARVEST MOISTURE": "0.5",
            "Advantage_GROSS INCOME": "6.95",
            "comps": 377,
            "winPercentage": "38.8",
            "checkTraits": "GENSSRIB",
            "checkRM": 111,
            "checkPT": "",
            "compBrand": "",
            "compProdBrand": "",
            "compTraits": "",
            "compRM": "",
            "compPT": "",
            "years": "",
            "isSummary": true
          }],
          "columns": [{
            "title": "Business Brand",
            "name": "checkBrand",
            "dataKey": "checkBrand",
            "$$hashKey": "object:8698"
          }, {
            "title": "Product Brand",
            "name": "checkProdBrand",
            "dataKey": "checkProdBrand",
            "$$hashKey": "object:8699"
          }, {
            "title": "Traits",
            "name": "checkTraits",
            "dataKey": "checkTraits",
            "$$hashKey": "object:8700"
          }, {
            "title": "RM",
            "name": "checkRM",
            "dataKey": "checkRM",
            "$$hashKey": "object:8701"
          }, {
            "title": "Type",
            "name": "checkPT",
            "dataKey": "checkPT",
            "$$hashKey": "object:8702"
          }, {
            "title": "Business Brand",
            "name": "compBrand",
            "dataKey": "compBrand",
            "$$hashKey": "object:8703"
          }, {
            "title": "Product Brand",
            "name": "compProdBrand",
            "dataKey": "compProdBrand",
            "$$hashKey": "object:8704"
          }, {
            "title": "Traits",
            "name": "compTraits",
            "dataKey": "compTraits",
            "$$hashKey": "object:8705"
          }, {
            "title": "RM",
            "name": "compRM",
            "dataKey": "compRM",
            "$$hashKey": "object:8706"
          }, {
            "title": "Type",
            "name": "compPT",
            "dataKey": "compPT",
            "$$hashKey": "object:8707"
          }, {
            "title": "Comps",
            "name": "comps",
            "dataKey": "comps",
            "$$hashKey": "object:8708"
          }, {
            "title": "Years",
            "name": "years",
            "dataKey": "years",
            "$$hashKey": "object:8709"
          }, {
            "title": "Win %",
            "name": "winPercentage",
            "dataKey": "winPercentage",
            "$$hashKey": "object:8710"
          }, {
            "title": "Check",
            "name": "Check_YIELD",
            "dataKey": "Check_YIELD",
            "$$hashKey": "object:8711"
          }, {
            "title": "Other",
            "name": "Other_YIELD",
            "dataKey": "Other_YIELD",
            "$$hashKey": "object:8712"
          }, {
            "title": "Advantage",
            "name": "Advantage_YIELD",
            "dataKey": "Advantage_YIELD",
            "$$hashKey": "object:8713"
          }, {
            "title": "Check",
            "name": "Check_HARVEST MOISTURE",
            "dataKey": "Check_HARVEST MOISTURE",
            "$$hashKey": "object:8714"
          }, {
            "title": "Other",
            "name": "Other_HARVEST MOISTURE",
            "dataKey": "Other_HARVEST MOISTURE",
            "$$hashKey": "object:8715"
          }, {
            "title": "Advantage",
            "name": "Advantage_HARVEST MOISTURE",
            "dataKey": "Advantage_HARVEST MOISTURE",
            "$$hashKey": "object:8716"
          }, {
            "title": "Check",
            "name": "Check_GROSS INCOME",
            "dataKey": "Check_GROSS INCOME",
            "$$hashKey": "object:8717"
          }, {
            "title": "Other",
            "name": "Other_GROSS INCOME",
            "dataKey": "Other_GROSS INCOME",
            "$$hashKey": "object:8718"
          }, {
            "title": "Advantage",
            "name": "Advantage_GROSS INCOME",
            "dataKey": "Advantage_GROSS INCOME",
            "$$hashKey": "object:8719"
          }],
          "categories": [{
            "title": "CHECK PRODUCTS",
            "colspan": 5,
            "colspanpdf": 5,
            "padding": 75,
            "$$hashKey": "object:8669"
          }, {
            "title": "OTHER PRODUCTS",
            "colspan": 5,
            "colspanpdf": 5,
            "padding": 75,
            "$$hashKey": "object:8670"
          }, {
            "title": "PERFORMANCE",
            "colspan": 3,
            "colspanpdf": 3,
            "padding": 24,
            "$$hashKey": "object:8671"
          }, {
            "title": "YIELD",
            "colspan": 3,
            "colspanpdf": 3,
            "padding": 32,
            "unit": "BUSHELS(56#)/ACRE",
            "$$hashKey": "object:8672"
          }, {
            "title": "HARVEST MOISTURE",
            "colspan": 3,
            "colspanpdf": 3,
            "padding": 3,
            "unit": "%",
            "$$hashKey": "object:8673"
          }, {
            "title": "GROSS INCOME",
            "colspan": 3,
            "colspanpdf": 3,
            "padding": 12,
            "unit": "$",
            "$$hashKey": "object:8674"
          }]
        }
  };
}

module.exports = router;
