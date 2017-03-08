import { mom10 } from './component';

var mom10State = {
    name: 'mom10',
    template: '<mom10 class=\"flex-container\"></mom10>',
    url: '/mom10',
    data: {
        description: 'Top 500 YouTube Games Channels'
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom10State);
        })
        .component(mom10.name, mom10.component);
}