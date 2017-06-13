import { mom24 } from './component';

var mom24State = {
    name: 'mom24',
    template: '<mom24 class=\"flex-container\"></mom24>',
    url: '/mom24',
    data: {
        description: ''
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom24State);
        })
        .component(mom24.name, mom24.component);
}