import * as d3 from 'd3';
import * as plot from '../../../charting/plotFactory';
import { ICsvService } from '../../../services/csvService';

export var mom02 = {
    name: 'mom02',
    component: {
        templateUrl: 'mom/02/template.html',
        controller: controller
    }
}

function controller(csvService: ICsvService) {
    const width = 960;
    const height = 480;
    let plotMargins = {
        top: 50,
        bottom: 30,
        left: 80,
        right: 30
    };

    let p = plot.plot('#chart', width, height, plotMargins);
    let plotGroup = p.group();
    let plotHeight = p.height();
    let plotWidth = p.width();

    
    const fileName = 'mom/02/data/data.csv';
    csvService.read<any>(fileName, update);

    function update(data: Array<any>) {
        console.log(data);
    };
}