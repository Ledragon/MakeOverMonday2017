import { mom17 } from './component';

var mom17State = {
    name: 'mom17',
    template: '<mom17 class=\"flex-container\"></mom17>',
    url: '/mom17',
    data: {
        description: 'Data skills are in huge demand'
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom17State);
        })
        .component(mom17.name, mom17.component);
}