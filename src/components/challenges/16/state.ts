import { mom16 } from './component';

var mom16State = {
    name: 'mom16',
    template: '<mom16 class=\"flex-container\"></mom16>',
    url: '/mom16',
    data: {
        description: 'Medicine statistics: GP prescribing by constituency, 2015'
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom16State);
        })
        .component(mom16.name, mom16.component);
}