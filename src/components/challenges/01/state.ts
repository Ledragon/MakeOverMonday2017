import { mom01 } from './component';

var mom01State = {
    name: 'mom01',
    template: '<mom01 class=\"flex-container\"></mom01>',
    url: '/mom01',
    data: {
        description: ''
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom01State);
        })
        .component(mom01.name, mom01.component);
}