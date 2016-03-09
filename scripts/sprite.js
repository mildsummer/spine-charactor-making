// Load in dependencies
var Spritesmith = require('spritesmith');

var fs = require('fs');
var path = require("path");

var mkdirp = require('mkdirp');

var sourceURLs = [];

var source = 'source/images/parts/';
fs.readdirSync(source).forEach(function(dirName) {
  try {
    fs.readdirSync(path.join(source, dirName)).forEach(function(fileName) {
      sourceURLs.push(path.join(source, dirName, fileName));
    });
  }
  catch(e) {
    // error
  }
});

//files.forEach(function(file) {
//  if(file.match(/.*png/)) {
//    var source = fs.createReadStream('./source/images/parts/' + file);
//    var dest = fs.createWriteStream('./source/images/parts/' + file.replace('.png', '') + '/default.png');
//    source.pipe(dest);
//  }
//});

function writeFile (filePath, contents, cb) {
  mkdirp(path.dirname(filePath), function (err) {
    if (err) return cb(err);
    fs.writeFile(filePath, contents, function (err) {
      if(err) {
        console.log(err);
      }
    });
  });
}

var beautify = require("json-beautify");

Spritesmith.run({src: sourceURLs}, function(err, result) {

  writeFile('build/images/parts.png', result.image);

  var output = {};
  Object.keys(result.coordinates).forEach(function(imagePath) {
    var name = imagePath.replace(source, '').replace('.png', '').split('/');
    if(!output[name[0]]) {
      output[name[0]] = {};
    }
    output[name[0]][name[1]] = result.coordinates[imagePath];
  });

  writeFile('build/data/parts.json', beautify(output, null, 2, 30));

  // Create our result
  //var result = spritesmith.processImages(images);
  //result.image; // Readable stream outputting image
  //result.coordinates; // Object mapping filename to {x, y, width, height} of image
  //result.properties; // Object with metadata about spritesheet {width, height}
});