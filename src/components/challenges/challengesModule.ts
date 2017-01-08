import * as angular from 'angular';

import { register as register01 } from './01/state';
import { register as register02 } from './02/state';
let momModule = angular.module('momModule', []);
register01(momModule);
register02(momModule);

export const momName = momModule
    .config(($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) => {
        $urlRouterProvider.otherwise('gallery');
    })  
    .name;