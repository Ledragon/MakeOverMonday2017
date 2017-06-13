import { mom19 } from './component';

var mom19State = {
    name: 'mom19',
    template: '<mom19 class=\"flex-container\"></mom19>',
    url: '/mom19',
    data: {
        description: 'Which cars do the Dutch purchase?'
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom19State);
        })
        .component(mom19.name, mom19.component);
}