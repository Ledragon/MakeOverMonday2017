import { mom20 } from './component';

var mom20State = {
    name: 'mom20',
    template: '<mom20 class=\"flex-container\"></mom20>',
    url: '/mom20',
    data: {
        description: ''
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom20State);
        })
        .component(mom20.name, mom20.component);
}