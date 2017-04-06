import { mom13 } from './component';

var mom13State = {
    name: 'mom13',
    template: '<mom13 class=\"flex-container\"></mom13>',
    url: '/mom13',
    data: {
        description: 'The Secret of Success'
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom13State);
        })
        .component(mom13.name, mom13.component);
}