import * as angular from 'angular';

import { register as register01 } from './01/state';
import { register as register02 } from './02/state';
import { register as register03 } from './03/state';
import { register as register04 } from './04/state';
import { register as register05 } from './05/state';
import { register as register06 } from './06/state';
import { register as register07 } from './07/state';
import { register as register08 } from './08/state';
let momModule = angular.module('momModule', []);
register01(momModule);
register02(momModule);
register03(momModule);
register04(momModule);
register05(momModule);
register07(momModule);
register08(momModule);

export const momName = momModule
    .config(($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) => {
        $urlRouterProvider.otherwise('gallery');
    })  
    .name;