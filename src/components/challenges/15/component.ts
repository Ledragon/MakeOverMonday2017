import * as d3 from 'd3';
import { ICsvService } from '../../../services/csvService';
import { LinearLinearChart } from 'ldd3';
import { interpolateGreens } from 'd3-scale-chromatic';

export var mom15 = {
    name: 'mom15',
    component: {
        templateUrl: 'components/challenges/15/template.html',
        controller: controller
    }
}

function controller(csvService: ICsvService) {
    const width = 720;
    const height = 480;

    let colorScale = d3.scaleLinear<number, number>()
        .range([0, 1]);
    var chart = new LinearLinearChart<any>('#chart', width, height)
        .x(d => d.goldPrice)
        .xFormat('$')
        .yFormat('$0.0f')
        .y(d => d.oilPrice)
        .hasLine(false)
        .hasPoints(true)
        .pointColor(d => interpolateGreens(colorScale(d.cpi)))
        .title('Oil price vs gold price colored by consumer price index');
    let svg = d3.select('#chart')
        .select('svg')
        .attr('width', width)
        .attr('height', height+30)
        // .style('background','#fafafa');
    let legend = svg.select('g')
        .attr('transform', 'translate(80,60)')
        .append('g')
        .classed('legend', true);
    svg.append('g')
        .classed('axis-title', true)
        .attr('transform', 'translate(400,490)')
        .append('text')
        .text('Gold price');
    svg.append('g')
        .classed('axis-title', true)
        .attr('transform', 'translate(20,240)')
        .append('text')
        .attr('transform', 'rotate(-90)')
        .text('Oil price');
    const fileName = 'components/challenges/15/data/data.csv';
    csvService.read<any>(fileName, update, (d: any) => {
        return {
            month: d.Month,
            year: parseInt(d.Year),
            goldPrice: parseFloat(d['Gold Price']),
            oilPrice: parseFloat(d['Oil Price']),
            cpi: parseFloat(d['CPI'])
        }
    });

    function update(data: Array<any>) {
        colorScale.domain(d3.extent(data, d => d.cpi));
        chart.update(data.filter(d => !isNaN(d.oilPrice)));
    };
}