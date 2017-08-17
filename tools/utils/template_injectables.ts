/// <reference path="../manual_typings/slash.d.ts" />
import * as slash from 'slash';
import { join } from 'path';
import { ENV, APP_BASE, APP_DEST } from '../config';

const FIRST_PATH_SEGMENT = /^\/?[^\/]*/;
let injectables: string[] = [];

export function transformPath(plugins, env) {
  return function(filePath) {
    filePath = env === 'prod' ? filePath.replace(FIRST_PATH_SEGMENT, '/lib') : filePath;
    arguments[0] = join('.', filePath);
    return slash(plugins.inject.transform.apply(plugins.inject.transform, arguments));
  };
}




