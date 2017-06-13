import { mom23 } from './component';

var mom23State = {
    name: 'mom23',
    template: '<mom23 class=\"flex-container\"></mom23>',
    url: '/mom23',
    data: {
        description: ''
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom23State);
        })
        .component(mom23.name, mom23.component);
}