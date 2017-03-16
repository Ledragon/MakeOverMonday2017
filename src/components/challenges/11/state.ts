import { mom11 } from './component';

var mom11State = {
    name: 'mom11',
    template: '<mom11 class=\"flex-container\"></mom11>',
    url: '/mom11',
    data: {
        description: 'The Likelihood of Orgasm'
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom11State);
        })
        .component(mom11.name, mom11.component);
}