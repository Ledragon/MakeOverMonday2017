import * as d3 from 'd3';
import { ICsvService } from '../../../services/csvService';

export var mom13 = {
    name: 'mom13',
    component: {
        templateUrl: 'components/challenges/13/template.html',
        controller: controller
    }
}

function controller(csvService: ICsvService) {


    const fileName = 'components/challenges/13/data/data.csv';
    csvService.read<any>(fileName, update, d => {
        return {
            strata: d['Social Strata'],
            reason: d.Reason,
            rate: parseFloat(d.Rate)
        };
    });

    const radius = 200;
    const margin = 150;
    var center = radius + margin;
    var svg = d3.select('#chart')
        .append('svg')
        .attr('width', 2 * center)
        .attr('height', 2 * center);
    svg.append('g')
        .classed('container', true)
        .append('circle')
        .attr('cx', center)
        .attr('cy', center)
        .attr('r', radius)
        .style('fill', 'none')
        .style('stroke', 'darkgray');
    var linesContainer = svg.append('g')
        .attr('transform', (d, i) => `translate(${center},${center})`);
    var seriesContainer = svg.append('g')
        .attr('transform', (d, i) => `translate(${center},${center})`);


    function update(data: Array<any>) {
        var colorScale = d3.scaleOrdinal<string, string>()
            .domain(data.map(d => d.strata))
            .range(['red', 'green', 'blue']);

        var valuesScale = d3.scaleLinear<number, number>()
            .range([0, radius])
            .domain([0, d3.max(data, d => d.rate)]);
        console.log(valuesScale.range());
        var reasons = data.map(d => d.reason);
        var filtered: Array<string> = [];
        reasons.forEach(r => {
            if (filtered.indexOf(r) < 0) {
                filtered.push(r);
            }
        });




        var dataBound = linesContainer.selectAll('.line')
            .data(filtered);
        dataBound
            .exit()
            .remove();
        var enterSelection = dataBound
            .enter()
            .append('g')
            .classed('line', true);
        enterSelection.append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', (d, i) => Math.cos(i * Math.PI * 2 / filtered.length) * radius)
            .attr('y2', (d, i) => Math.sin(i * Math.PI * 2 / filtered.length) * radius)
            .style('stroke', 'lightgray');
        enterSelection.append('text')
            .attr('x', radius + 15)
            .style('font-size', '.8em')
            .text(d => d)
            .attr('transform', (d, i) => `rotate(${i * 360 / filtered.length})`);



        let byStrata = d3.nest<any>()
            .key(d => d.strata)
            .entries(data);


        let generator = d3.area<any>()
            .x((d, i) => {
                var res = Math.cos(i * Math.PI * 2 / filtered.length) * valuesScale(d.rate);
                return res;
            })
            .y((d, i) => Math.sin(i * Math.PI * 2 / filtered.length) * valuesScale(d.rate))
            .curve( d3.curveLinearClosed)
            ;
        
        var seriesBound = seriesContainer.selectAll('.series')
            .data(byStrata);
        seriesBound
            .exit()
            .remove();
        var enterSeries = seriesBound
            .enter()
            .append('g')
            .classed('series', true);
        enterSeries.append('path')
            .attr('d', d => generator(d.values))
            .style('stroke', d => colorScale(d.key));


    };
}