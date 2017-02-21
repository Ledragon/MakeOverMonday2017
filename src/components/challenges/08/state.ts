import { mom08 } from './component';

var mom08State = {
    name: 'mom08',
    template: '<mom08 class=\"flex-container\"></mom08>',
    url: '/mom08',
    data: {
        description: ''
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom08State);
        })
        .component(mom08.name, mom08.component);
}