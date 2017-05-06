import { mom18 } from './component';

var mom18State = {
    name: 'mom18',
    template: '<mom18 class=\"flex-container\"></mom18>',
    url: '/mom18',
    data: {
        description: 'Sydney Ferry Patronage'
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom18State);
        })
        .component(mom18.name, mom18.component);
}