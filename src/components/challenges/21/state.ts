import { mom21 } from './component';

var mom21State = {
    name: 'mom21',
    template: '<mom21 class=\"flex-container\"></mom21>',
    url: '/mom21',
    data: {
        description: ''
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom21State);
        })
        .component(mom21.name, mom21.component);
}