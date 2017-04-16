import { mom15 } from './component';

var mom15State = {
    name: 'mom15',
    template: '<mom15 class=\"flex-container\"></mom15>',
    url: '/mom15',
    data: {
        description: 'Do oil prices have a direct correlation to the price of gold?'
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom15State);
        })
        .component(mom15.name, mom15.component);
}