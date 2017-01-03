export class momHeadingController {
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

export var momHeading = {
    name: 'momHeading',
    component: {
        templateUrl: 'momHeading/template.html',
        controller: momHeadingController
    }
};