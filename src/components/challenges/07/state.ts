import { mom07 } from './component';

var mom07State = {
    name: 'mom07',
    template: '<mom07 class=\"flex-container\"></mom07>',
    url: '/mom07',
    data: {
        description: 'How Much Do Americans Spend on Valentine’s Day?'
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(mom07State);
        })
        .component(mom07.name, mom07.component);
}
