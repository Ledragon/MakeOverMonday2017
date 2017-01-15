import { mom03 } from './component';

var mom03State = {
    name: 'mom03',
    template: '<mom03 class=\"flex-container\"></mom03>',
    url: '/mom03',
    data: {
        description: ''
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom03State);
        })
        .component(mom03.name, mom03.component);
}