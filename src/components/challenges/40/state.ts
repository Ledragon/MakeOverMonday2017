import { mom40 } from './component';

var mom40State = {
    name: 'mom40',
    template: '<mom40 class=\"flex-container\"></mom40>',
    url: '/mom40',
    data: {
        description: ''
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom40State);
        })
        .component(mom40.name, mom40.component);
}