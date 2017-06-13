import * as d3 from 'd3';
import { ICsvService } from '../../../services/csvService';
import { HorizontalBarChart } from 'ldd3';

export var mom16 = {
    name: 'mom16',
    component: {
        templateUrl: 'components/challenges/16/template.html',
        controller: controller
    }
}

function controller(csvService: ICsvService) {
    const width = 480;
    const height = 480;

    const fileName = 'components/challenges/16/data/data.csv';
    csvService.read<any>(fileName, update, d => {
        return {
            chemicalName: d['Chemical Name'],
            measureName: d['Measure Names'],
            measureValue: parseFloat(d['Measure Values'])
        };
    });

    function update(data: Array<any>) {
        let byMeasure = d3.nest<any>()
            .key(d => d.measureName)
            .entries(data);
        byMeasure.forEach((kvp, i) => {
            var svg = d3.select('#chart')
                .append('div')
                .style('float', 'left')
                .attr('id', 'id' + i);
            new HorizontalBarChart<any>('#id' + i, width, height)
                .x(d => d.measureValue)
                .y(d => d.chemicalName)
                .title(kvp.key)
                .format('s')
                .update(kvp.values.sort((a, b) => b.measureValue - a.measureValue).splice(0, 10));
        })
        console.log(byMeasure);
    };
}