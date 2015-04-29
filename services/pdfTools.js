/**
 * Created by rahulroy on 02/04/15.
 */

var fs = require('fs');
var path = require("path");
var spawn = require('child_process').spawn;


var pdf_merge = function (_path, cb) {
    //path of files. out is output file name. after success cb will be called with err or out.
    //console.log(arguments);

    var out = _path.join(_path,'merged');
    find_pdfs(_path, function(err, files) {

        files = files.map(function(name){
            return path.join(_path, name);
        });

        join_pdfs(files, out, cb);
    });
}

function find_pdfs(path, cb) {
    fs.readdir(path, function(err, files){
        if(err) return cb(err, null);

        var pdf_files = files.filter(function(name) {
            if((name.indexOf('.pdf')===name.lastIndexOf('.')) && (name.lastIndexOf('.')!==-1))
                return true;
            return false;
        });
        cb(null, pdf_files);
    });
};

function join_pdfs(files, out, cb) {

    if(files===null && typeof(cb)==='function'){
        cb(code, null);
    }

    var args = ['cat', 'output', out];
    var args = files.concat(args);

    //console.log(args);

    var pdftk = spawn('pdftk', args);

    pdftk.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });

    pdftk.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    pdftk.on('close', function (code) {
        console.log('child process exited with code ' + code);

        if(typeof(cb)==='function'){
            if(code===0)
                cb(null, out);
            else
                cb(code, null);
        }
    });
}

module.exports.merge = pdf_merge; /*function (path, out, cb)*/
