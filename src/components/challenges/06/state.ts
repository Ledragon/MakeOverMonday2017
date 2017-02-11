import { mom06 } from './component';

var mom06State = {
    name: 'mom06',
    template: '<mom06 class=\"flex-container\"></mom06>',
    url: '/mom06',
    data: {
        description: 'Inside Chicago’s Taxi Data: Busiest and Slowest Days, Average Tips And More'
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom06State);
        })
        .component(mom06.name, mom06.component);
}