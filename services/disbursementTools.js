/**
 * Created by lalitchawla on 10/03/15.
 */

var nodeExcel = require('excel-export');
var fs = require('fs');
var handlebars = require('handlebars');
//var phantom = require('phantom');
var path = require('path');
var asset_path = path.join(__dirname + '/../../assets/')


var generate_excel = function () {
  var conf = {};
  conf.stylesXmlFile = "./assets/styles/excel-styles.xml";
  conf.cols = [{
    caption: 'string',
    type: 'string',
    beforeCellWrite: function (row, cellData) {
      return cellData.toUpperCase();
    },
    width: 28.7109375
  }, {
    caption: 'date',
    type: 'date',
    beforeCellWrite: function () {
      var originDate = new Date(Date.UTC(1899, 11, 30));
      return function (row, cellData, eOpt) {
        if (eOpt.rowNum % 2) {
          eOpt.styleIndex = 1;
        }
        else {
          eOpt.styleIndex = 2;
        }
        if (cellData === null) {
          eOpt.cellType = 'string';
          return 'N/A';
        } else
          return (cellData - originDate) / (24 * 60 * 60 * 1000);
      }
    }()
  }, {
    caption: 'bool',
    type: 'bool'
  }, {
    caption: 'number',
    type: 'number'
  }];
  conf.rows = [
    ['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14],
    ["e", new Date(2012, 4, 1), false, 2.7182],
    ["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.61803],
    ["null date", null, true, 1.414]
  ];
  var result = nodeExcel.execute(conf);
  return result;
};

var generate_html = function (data, template, callback) {
  //data.data.full_nonprofit_address = data.data.nonprofit.address.address_line_1 + data.data.nonprofit.address.address_line_2;
  var _url = path.join(__dirname + '/../../assets/images/');
  var outputString = template({'data': data, 'assets': {'path': 'http://api.letzchange.org/'}});
  callback(outputString);
};

var compile_hbs_template = function (type, callback) {
  if (type == 'receipt') {
    var path = './assets/templates/receipt_template.hbs'
  }
  if (type == 'email') {
    var path = './assets/templates/email_template.hbs'
  }
  if (!path) {
    return;
  }
  fs.readFile(path, function (err, file) {
    if (err) {
      console.log('could not compile hbs because ' + err)
    }
    else {
      var source = file.toString();
      var template = handlebars.compile(source);
      callback(template);
    }
  });
};

var generate_pdf = function (html, data, callback) {
  //todo: can add a method here to check if a file exists and recreate/skip creating based on a boolean

  if (!data.transaction_id || !data.id) {
    callback("bad data");
    return;
  }
  var wkhtmltopdf = require('wkhtmltopdf');
  var folder_path = path.join(asset_path, 'receipts', data.transaction_id);
  var mkdirp = require('mkdirp');
  mkdirp(folder_path, function (err) {
    if (err) callback(err);
    else {
      var path_to_pdf = path.join(folder_path, data.order_id + '.pdf');
      wkhtmltopdf(html, {
        output: path_to_pdf, javascriptDelay: 3000
      }, function (code) {
        callback(code, path_to_pdf)
      });
    }
  });

};

var generate_email_params = function (data, template, callback) {
  var params = {'attachment': data.path_to_pdf};
  params.from_name = data.nonprofit.name;
  if (data.donor.name) {
    params.to = data.donor.name + ' <' + data.donor.email + '>';
  }
  else {
    params.to = data.donor.email;
  }
  params.subject = 'Imp: ' + data.project_tax_certification.type + ' receipt for your contribution ' + data.order_id;
  generate_html(data, template, function (html) {
    params.html = html;
    callback(params);
  });
};

var generate_receipt_number = function (data) {
  var acronymn = data.nonprofit.name.slice(0, 2).toUpperCase();
  return acronymn + '-' + data.transaction_number;
};

var zip_folder = function (transaction_id,callback) {
  var zipFolder = require('zip-folder');
  var folder_path = path.join(asset_path,'receipts', transaction_id);
  var zip_path = path.join(asset_path,'receipts/'+transaction_id+'.zip')
  zipFolder(folder_path, zip_path, function (err) {
    callback(err,zip_path);
  });
};

module.exports = {
  generate_excel: generate_excel,
  generate_html: generate_html,
  generate_pdf: generate_pdf,
  compile_hbs_template: compile_hbs_template,
  generate_email_params: generate_email_params,
  generate_receipt_number: generate_receipt_number,
  zip_folder: zip_folder
};
