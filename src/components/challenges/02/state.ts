import { mom02 } from './component';

var mom02State = {
    name: 'mom02',
    template: '<mom02 class=\"flex-container\"></mom02>',
    url: '/mom02',
    data: {
        description: 'Have Apple Lost Their Edge With iPhone?'
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom02State);
        })
        .component(mom02.name, mom02.component);
}