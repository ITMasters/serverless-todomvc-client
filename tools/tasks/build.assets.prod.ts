import { join } from 'path';
import { APP_SRC, APP_PRO } from '../config';
const rename = require('gulp-rename');

export = function buildAssetsDev(gulp) {
  return function() {
    gulp.src([
      join(APP_SRC, '**'),
      '!' + join(APP_SRC, '**', '*.ts'),
      '!' + join(APP_SRC, 'system.config.prod.js'),
      '!' + join(APP_SRC, 'system.config.dev.js'),
    ])
    .pipe(gulp.dest(APP_PRO));

    return gulp.src(join(APP_SRC, 'system.config.prod.js'))
      .pipe(rename('system.config.js'))
      .pipe(gulp.dest(APP_PRO));
  };
};