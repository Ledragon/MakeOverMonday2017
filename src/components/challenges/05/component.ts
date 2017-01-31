import * as d3 from 'd3';

import { HorizontalBarChart } from 'ldd3';
import { interpolateGreens } from 'd3-scale-chromatic';
import { ICsvService } from '../../../services/csvService';

export var mom05 = {
    name: 'mom05',
    component: {
        templateUrl: 'components/challenges/05/template.html',
        controller: controller
    }
}

function controller(csvService: ICsvService) {
    const width = 360;
    const height = 360;


    const fileName = 'components/challenges/05/data/data.csv';
    csvService.read<any>(fileName, update, parseFunction);

    let colorScale = d3.scaleLinear()
        .range([0, 1]);
    let chart = new HorizontalBarChart<any>('chart', width, height)
        .x(d => d.share)
        .y(d => d.country)
        .color(d => interpolateGreens(colorScale(d.growth)))
        .title('Employment Share');

    let growthChart = new HorizontalBarChart<any>('chart2', width, height)
        .x(d => d.growth)
        .y(d => d.country)
        .color(d => interpolateGreens(colorScale(d.share)))
        .title('Net Employment Growth Share');


    function update(data: Array<any>) {
        let sorted = data.sort((a, b) => b.share - a.share);
        colorScale.domain(d3.extent(sorted, s => s.growth))
        chart.update(sorted);
        sorted = data.sort((a, b) => b.growth - a.growth);
        colorScale.domain(d3.extent(sorted, s => s.share))
        growthChart.update(sorted)
    };

    function parseFunction(d: any) {
        return {
            country: d.Country,
            share: parseFloat(d['Employment Share']),
            growth: parseFloat(d['Net Employment Growth Share'])
        };
    }
}