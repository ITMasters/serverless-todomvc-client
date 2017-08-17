import { join } from 'path';
import { APP_SRC, APP_PRO, PROD_DEPENDENCIES } from '../config';
import { transformPath, templateLocals } from '../utils';

export = function buildIndexProd(gulp, plugins) {
  return function() {
    return gulp.src(join(APP_SRC, 'index.html'))
    // NOTE: There might be a way to pipe in loops.
      .pipe(inject('shims'))
      .pipe(inject('libs'))
      .pipe(inject())
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(APP_PRO));
  };


  function inject(name?: string) {
    return plugins.inject(gulp.src(getInjectablesDependenciesRef(name), { read: false }), {
      name,
      transform: transformPath(plugins, 'prod')
    });
  }

  function getInjectablesDependenciesRef(name?: string) {
    return PROD_DEPENDENCIES
      .filter(dep => dep['inject'] && dep['inject'] === (name || true))
      .map(mapPath);
  }

  function mapPath(dep) {
    let envPath = dep.src;
    if (envPath.startsWith(APP_SRC)) {
      envPath = join(APP_PRO, dep.src.replace(APP_SRC, ''));
    }
    return envPath;
  }
};
