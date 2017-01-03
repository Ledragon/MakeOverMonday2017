export class headingController {
    name: string = 'test';
    description: string = 'desc';
    static $inject = ['$scope', '$state'];
    constructor($scope: angular.IScope, $state: angular.ui.IStateService) {
        this.name = $state.current.name.replace('mom', '');
        this.description = $state.current.data.description;
        $scope.$on('$stateChangeSuccess', (event, toState: angular.ui.IState) => {
            this.name = toState.name.replace('mom', '');
            this.description = toState.data.description;
        });
    }
}

export var heading = {
    name: 'heading',
    component: {
        templateUrl: 'components/heading/template.html',
        controller: headingController
    }
};