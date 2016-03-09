var fs = require('fs');
var path = require('path');

var lwip = require('lwip');

var source = 'source/images/parts/';
fs.readdirSync(source).forEach(function(dirName) {
  lwip.open(path.join(source, dirName, 'default.png'), function(err, image){
    if(!err) {
      image.hue(180, function(err, image) {
        if(!err) {
          image.writeFile(path.join(source, dirName, 'complementary.png'), function() {
            if(err) {
              console.log(err);
            }
          });
        }
      });
    }
  });
});