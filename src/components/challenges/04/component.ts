import * as d3 from 'd3';

import { ICsvService } from '../../../services/csvService';

export var mom04 = {
    name: 'mom04',
    component: {
        templateUrl: 'components/challenges/04/template.html',
        controller: controller
    }
}

function controller(csvService: ICsvService) {
        
    const fileName = 'components/challenges/04/data/data.csv';
    csvService.read<any>(fileName, update);

    function update(data: Array<any>) {
        console.log(data);

        let byType = d3.nest<any>()
            .key(d => d['Visitor Type'])
            .entries(data);
        console.log(byType);
    };
}