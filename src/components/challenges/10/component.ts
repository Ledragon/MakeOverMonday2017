import * as d3 from 'd3';
import { ICsvService } from '../../../services/csvService';

export var mom10 = {
    name: 'mom10',
    component: {
        templateUrl: 'components/challenges/10/template.html',
        controller: controller
    }
}

function controller(csvService: ICsvService) {
    // const width = 960;
    // const height = 480;
    // let plotMargins = {
    //     top: 50,
    //     bottom: 30,
    //     left: 80,
    //     right: 30
    // };

    // let p = plot.plot('#chart', width, height, plotMargins);
    // let plotGroup = p.group();
    // let plotHeight = p.height();
    // let plotWidth = p.width();

    
    const fileName = 'components/challenges/10/data/data.csv';
    csvService.read<any>(fileName, update);

    function update(data: Array<any>) {
        console.log(data);
    };
}