const SystemBuilder = require('systemjs-builder');
const builder = new SystemBuilder();

export = function bundleBuilder() {
  return function(done) {
    builder.loadConfig('./src/system.config.prod.js')
      .then(function() {
        let outputFile = './public/bundle.min.js';
        return builder.buildStatic('app', outputFile, {
          minify: true,
          mangle: true,
          rollup: true
        });
      })
      .then(function() {
        done();
      }); 
  }
}