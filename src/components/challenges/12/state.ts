import { mom12 } from './component';

var mom12State = {
    name: 'mom12',
    template: '<mom12 class=\"flex-container\"></mom12>',
    url: '/mom12',
    data: {
        description: 'March Madness'
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom12State);
        })
        .component(mom12.name, mom12.component);
}