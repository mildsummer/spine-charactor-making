var fs = require('fs');

var UglifyJS = require("uglify-js");

var licenseRegexp = /^\!|^@preserve|^@cc_on|\bMIT\b|\bMPL\b|\bGPL\b|\(c\)|License|Copyright/mi;

var isLicenseComment = (function() {
  var _prevCommentLine = 0;

  return function(node, comment) {
    if (licenseRegexp.test(comment.value) ||
      comment.line === 1 ||
      comment.line === _prevCommentLine + 1) {
      _prevCommentLine = comment.line;
      return true;
    }

    _prevCommentLine = 0;
    return false;
  };
})();

var result = UglifyJS.minify(['source/bower_components/jquery/dist/jquery.js', 'source/spine-js/spine.js', 'source/javascripts/spine-canvas.js'], {
  outSourceMap: "lib.js.map",
  output: {
    comments: isLicenseComment
  }
});
fs.writeFile('build/javascripts/lib.js', result.code);