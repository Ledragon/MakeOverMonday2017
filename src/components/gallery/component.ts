export var gallery = {
    name: 'gallery',
    component: {
        templateUrl: 'gallery/template.html',
        controller: controller
    }
}

function controller($state: angular.ui.IStateService) {
    var list: Array<any> = [];
    this.$onInit = () => {
        this.list = $state.get()
            .filter(d => !d.abstract && d.name.indexOf('mom') >= 0)
            .map(d => {
                return {
                    name: d.name,
                    displayName: d.name.replace('mom', ''),
                    url: 'content/images/gallery/' + d.name.replace('mom', '') + '.png',
                    description: d.data.description
                }
            })
            .sort((a, b) => <any>a.displayName - <any>b.displayName);
    }
}