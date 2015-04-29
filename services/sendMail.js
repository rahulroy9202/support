/**
 * Created by lalitchawla on 10/03/15.
 */


var api_key = 'key-da1cffd2ee0801ae9e23cc78cb262e68';
var domain = 'nonprofits.letzchange.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
var simulate_mail = function (params, callback) {
  console.log(params);
  callback();
};

var send_mail = function (params, callback) {
  /*{
   from: from,
   to: to,
   subject: subject,
   text: text,
   attachment: file
   };*/
  //callback();
  //return;
  if (!params.from) {
    params.from = params.from_name + ' <' + slugify(params.from_name) + '@' + domain + '>';
  }
  params.bcc = 'lalit.lmc@gmail.com';
  //mailgun.messages().send(params, callback);
  simulate_mail(params, callback);
};
module.exports = {send_mail: send_mail};
