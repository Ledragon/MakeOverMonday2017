import * as d3 from 'd3';
import { ICsvService } from '../../../services/csvService';

export var mom16 = {
    name: 'mom16',
    component: {
        templateUrl: 'components/challenges/16/template.html',
        controller: controller
    }
}

function controller(csvService: ICsvService) {
    const width = 960;
    const height = 480;
    
    const fileName = 'components/challenges/16/data/data.csv';
    csvService.read<any>(fileName, update);

    function update(data: Array<any>) {
        console.log(data);
    };
}