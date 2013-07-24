# bucket-rename-dir

Rename directories for Amazon S3 objects.

## Install

[![NPM](https://nodei.co/npm/bucket-rename-dir.png)](https://nodei.co/npm/bucket-rename-dir/)

## Usage

```javascript

var BucketRenameDir = require('bucket-rename-dir');
var renameDir = BucketRenameDir.connect({
  key: 's3-key',
  secret: 's3-secret'
  bucket: 'name-of-the-s3-bucket'
});


// Use as a stream or with callbacks

// Stream
renameDir('some/directory/path', 'some/NEW_directory/path').pipe(process.stdout);

// Callback
renameDir('some/directory/path', 'some/NEW_directory/path', function (err) {
  //
});

```
