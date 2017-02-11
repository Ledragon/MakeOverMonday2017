import * as d3 from 'd3';

import { ICsvService } from '../../../services/csvService';
import { BottomTimeAxis } from './BottomTimeAxis';
import { LeftLinearAxis } from 'ldd3';

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
    let svg = d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    this._group = svg;

    let plotMargins = {
        top: 60,
        bottom: 30,
        left: 60,
        right: 90
    };

    // svg.append('rect')
    //     .attr('width', width)
    //     .attr('height', height)
    //     .style('fill', 'none')
    //     .style('stroke', 'darkGray');
    // svg.append('g')
    //     .classed('title', true)
    //     .attr('transform', (d, i) => `translate(${width / 2},${30})`)
    //     .append('text');

    //TODO avoid nasty casting        
    let plotGroup: d3.Selection<SVGGElement, any, any, any> = svg.append('g')
        .classed('plot', true)
        .attr('transform', `translate(${plotMargins.left},${plotMargins.top})`) as d3.Selection<SVGGElement, any, any, any>;

    let plotWidth = width - plotMargins.left - plotMargins.right;
    let plotHeight = height - plotMargins.top - plotMargins.bottom;



    const fileName = 'components/challenges/06/data/data.csv';
    csvService.read<any>(fileName, update, parse);
    var timeAxis = new BottomTimeAxis<any>(plotGroup, plotWidth, plotHeight)
    var leftAxis = new LeftLinearAxis<any>(plotGroup, plotWidth, plotHeight)
    .format('$.2s')    ;
    function update(data: Array<any>) {
        var sorted = data.sort((a, b) => a.timestamp - b.timestamp);
        console.log(sorted);
        var extent = d3.extent(sorted, s => s.timestamp);
        timeAxis.domain(extent);
        leftAxis.domain([0, d3.max(sorted, s => s.total)]);
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