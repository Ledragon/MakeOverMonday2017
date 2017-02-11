import * as d3 from 'd3';

import { ICsvService } from '../../../services/csvService';
import { TimeLinearChart } from './TimeLinearChart';

export var mom06 = {
    name: 'mom06',
    component: {
        templateUrl: 'components/challenges/06/template.html',
        controller: ['csvService', controller]
    }
}

function controller(csvService: ICsvService) {

    var width = 960;
    var height = 480;
    // let svg = d3.select('#chart')
    //     .append('svg')
    //     .attr('width', width)
    //     .attr('height', height);
    // this._group = svg;

    // let plotMargins = {
    //     top: 60,
    //     bottom: 30,
    //     left: 60,
    //     right: 90
    // };

    // svg.append('rect')
    //     .attr('width', width)
    //     .attr('height', height)
    //     .style('fill', 'none')
    //     .style('stroke', 'darkGray');
    // svg.append('g')
    //     .classed('title', true)
    //     .attr('transform', (d, i) => `translate(${width / 2},${30})`)
    //     .append('text')
    //     .text('Total amount spent on trips');

    var totalChart = new TimeLinearChart<any>('#chart', width, height)
        .x(d => d.timestamp)
        .y(d => d.total)
        .yFormat('$.0s')
        .title('Total trip amount');



    const fileName = 'components/challenges/06/data/data.csv';
    csvService.read<any>(fileName, update, parse);


    function update(data: Array<any>) {
        var sorted = data.sort((a, b) => a.timestamp - b.timestamp);
        // var extent = d3.extent(sorted, s => s.timestamp);
        totalChart.update(sorted);
        // timeAxis.domain(extent);
        // leftAxis.domain([0, d3.max(sorted, s => s.total)]);
        // path.attr('d', lineGenerator(sorted);)
    };

    function parse(d: any): any {
        return {
            timestamp: new Date(d['Trip Start Timestamp']),
            extras: parseFloat(d.Extras),
            fare: parseFloat(d.Fare),
            tips: parseFloat(d.Tips),
            tolls: parseFloat(d.Tolls),
            miles: parseFloat(d['Trip Miles']),
            seconds: parseFloat(d['Trip Seconds']),
            total: parseFloat(d['Trip Total'])
        }
    }
}