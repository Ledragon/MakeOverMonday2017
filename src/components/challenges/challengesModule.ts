import * as angular from 'angular';

import { register as register01 } from './01/state';
import { register as register02 } from './02/state';
import { register as register03 } from './03/state';
import { register as register04 } from './04/state';
import { register as register05 } from './05/state';
import { register as register06 } from './06/state';
import { register as register07 } from './07/state';
import { register as register08 } from './08/state';
import { register as register09 } from './09/state';
import { register as register10 } from './10/state';
import { register as register11 } from './11/state';
import { register as register12 } from './12/state';
import { register as register13 } from './13/state';
import { register as register14 } from './14/state';
import { register as register15 } from './15/state';
import { register as register16 } from './16/state';
import { register as register17 } from './17/state';
import { register as register18 } from './18/state';
import { register as register19 } from './19/state';
import { register as register20 } from './20/state';
import { register as register21 } from './21/state';
import { register as register22 } from './22/state';
import { register as register23 } from './23/state';
import { register as register24 } from './24/state';
let momModule = angular.module('momModule', []);
register01(momModule);
register02(momModule);
register03(momModule);
register04(momModule);
register05(momModule);  
register06(momModule);  
register07(momModule);
register08(momModule);
register09(momModule);
register10(momModule);
register11(momModule);
register12(momModule);
register13(momModule);
register14(momModule);
register15(momModule);
register16(momModule);
register17(momModule);
register18(momModule);
register19(momModule);
register20(momModule);
register21(momModule);
register22(momModule);
register23(momModule);
register24(momModule);

export const momName = momModule
    .config(($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) => {
        $urlRouterProvider.otherwise('gallery');
    })  
    .name;