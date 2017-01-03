import * as angular from 'angular';
export class momListController {
    list: Array<any> = [];
    constructor($state: angular.ui.IStateService) {
        this.list = $state.get()
            .filter(d => !d.abstract && d.name.indexOf('mom')>=0)
            .map(d => {
                return {
                    name: d.name,
                    displayName: d.name.replace('mom', '')
                }
            })
            .sort((a,b)=>+a.displayName-parseInt(b.displayName));
    }
}