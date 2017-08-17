import * as gulp from 'gulp';
import { runSequence, task } from './tools/utils';

// ---------------
// Clean (override)
gulp.task('clean', done => task('clean', 'all')(done));
gulp.task('clean.dev', done => task('clean', 'dev')(done));
gulp.task('clean.prod', done => task('clean', 'prod')(done));

// ---------------
// Build dev 
gulp.task('build.dev', done => {
  runSequence('clean',
              'build.assets.dev',
              'build.js.dev',
              'build.index.dev',
              done
  );
});

// -----------
// Server dev
gulp.task('serve.dev', done => {
  runSequence('build.dev',
              'server.start',
              'watch.serve',
              done
  );
});

// -----------
// Build prod
gulp.task('builder.prod', done => {
  runSequence('clean.prod',     
              'build.assets.prod',
              'copy.partialVendor.lib',
              'bundle.builder',
              'build.index.prod',
              done
  );
});



