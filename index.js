'use strict';

var assert = require('assert');
var path = require('path');
var knox = require('knox');
var map = require('map-stream');
var BucketList = require('bucket-list');

exports.connect = function (opts) {
  assert.ok(opts, 'AWS S3 options must be defined.');
  assert.notEqual(opts.key, undefined, 'Requires S3 AWS Key.');
  assert.notEqual(opts.secret, undefined, 'Requres S3 AWS Secret');
  assert.notEqual(opts.bucket, undefined, 'Requires AWS S3 bucket name.');
  
  var client = knox.createClient(opts);
  var bucketList = BucketList.connect(opts);
  
  //
  return function (srcDir, destDir, callback) {
    var _err = null;
    
    callback = (typeof callback === 'function') ? callback : function () {};
    
    return bucketList(srcDir).pipe(map(function (filePath, streamCb) {
      var srcPath = path.join('/', filePath);
      var destPath = path.join('/', filePath.replace(srcDir, destDir));
      var self = this;
      
      client.copyFile(srcPath, destPath, function(err, copyRes) {
        if (copyRes.statusCode === 200) {
          client.deleteFile('/' + filePath, function (err) {
            console.log(filePath);
            if (err) {
              _err = err;
              return streamCb(err);
            }
            streamCb(null, destPath);
          });
        }
        else{
          _err = err;
          streamCb(err);
        }
      });
    })).on('end', function () {
      callback(_err);
    });
  };
};