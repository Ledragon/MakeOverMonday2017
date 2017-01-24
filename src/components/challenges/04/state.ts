import { mom04 } from './component';

var mom04State = {
    name: 'mom04',
    template: '<mom04 class=\"flex-container\"></mom04>',
    url: '/mom04',
    data: {
        description: 'International and Domestic Tourism Spend in New Zealand'
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom04State);
        })
        .component(mom04.name, mom04.component);
}