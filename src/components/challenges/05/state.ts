import { mom05 } from './component';

var mom05State = {
    name: 'mom05',
    template: '<mom05 class=\"flex-container\"></mom05>',
    url: '/mom05',
    data: {
        description: 'Employment Growth in G-7 Countries'
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom05State);
        })
        .component(mom05.name, mom05.component);
}