import { mom34 } from './component';

var mom34State = {
    name: 'mom34',
    template: '<mom34 class=\"flex-container\"></mom34>',
    url: '/mom34',
    data: {
        description: ''
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom34State);
        })
        .component(mom34.name, mom34.component);
}