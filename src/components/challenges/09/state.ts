import { mom09 } from './component';

var mom09State = {
    name: 'mom09',
    template: '<mom09 class=\"flex-container\"></mom09>',
    url: '/mom09',
    data: {
        description: 'How does Andy use his American Express?'
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom09State);
        })
        .component(mom09.name, mom09.component);
}