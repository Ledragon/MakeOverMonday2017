import * as angular from 'angular';
import * as uiRouter from 'angular-ui-router';

import { momName } from './components/challenges/challengesModule';

import { heading } from './components/heading/component';
import { momList } from './components/menu/component';
import { register as galleryRegister } from './components/gallery/state';

import { CsvService } from './services/csvService';
let appModule = angular.module('app', [uiRouter.toString(), momName])
    .component(heading.name, heading.component)
    .component(momList.name, momList.component)
    .service('csvService', () => new CsvService());
galleryRegister(appModule);
export const name = appModule.name;
