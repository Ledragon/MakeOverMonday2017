import { mom22 } from './component';

var mom22State = {
    name: 'mom22',
    template: '<mom22 class=\"flex-container\"></mom22>',
    url: '/mom22',
    data: {
        description: ''
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom22State);
        })
        .component(mom22.name, mom22.component);
}