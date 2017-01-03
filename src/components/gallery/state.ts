import { gallery } from './component';

var galleryState = {
    name: 'gallery',
    template: '<gallery class=\"flex-container\"></gallery>',
    url: '/gallery',
    data: {
        description: ''
    }
};


export function register(module: angular.IModule) {
    module
        .config(($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state(galleryState);
        })
        .component(gallery.name, gallery.component);
}