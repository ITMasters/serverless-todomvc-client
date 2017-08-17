;(function() {
  'use strict';
  // map tells the System loader where to look for things
  var map = {
    'app':      'dist/dev/app',
    'rxjs':     'node_modules/rxjs',
    '@angular': 'node_modules/@angular'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':   { main: 'bootstrap.js', defaultExtension: 'js'  },
    'rxjs':  { defaultExtension: 'js'                        }
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'forms'
  ];
  // Add package entries
  ngPackageNames.forEach(function(pkgName) {
    packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  var config = {
    map: map,
    packages: packages
  };

  System.config(config);
})();