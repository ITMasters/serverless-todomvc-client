import { join } from 'path';
import { APP_SRC, APP_PRO_LIB } from '../config';

export = function copyVendorLib(gulp) {
  return function() {
    gulp.src(['node_modules/todomvc-app-css/index.css',]).pipe(gulp.dest('public/lib/todomvc-app-css'));
    gulp.src(['node_modules/todomvc-common/base.css']).pipe(gulp.dest('public/lib/todomvc-common'));
    gulp.src(['node_modules/es6-promise/**']).pipe(gulp.dest('public/lib/es6-promise'));
    gulp.src(['node_modules/systemjs/**']).pipe(gulp.dest('public/lib/systemjs'));
    gulp.src(['node_modules/rxjs/**']).pipe(gulp.dest('public/lib/rxjs'));
    gulp.src(['node_modules/zone.js/**']).pipe(gulp.dest('public/lib/zone.js'));
    gulp.src(['node_modules/reflect-metadata/**']).pipe(gulp.dest('public/lib/reflect-metadata'));
    return gulp.src(['node_modules/@angular/**']).pipe(gulp.dest('public/lib/@angular'));
  };
};