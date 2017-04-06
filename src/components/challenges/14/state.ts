import { mom14 } from './component';

var mom14State = {
    name: 'mom14',
    template: '<mom14 class=\"flex-container\"></mom14>',
    url: '/mom14',
    data: {
        description: ''
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom14State);
        })
        .component(mom14.name, mom14.component);
}