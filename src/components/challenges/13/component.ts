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
    const titleHeight = 45;
    const legendWidth = 100;
    const legendHeight = 55;
    var center = radius + margin;
    var svg = d3.select('#chart')
        .append('svg')
        .attr('width', 2 * center + legendWidth + 2 * 10)
        .attr('height', 2 * center + titleHeight);

    svg.append('clipPath')
        .attr('id', 'my-clippath')
        .append('rect')
        .attr('width', 2 * center)
        .attr('height', 2 * center);

    var title = svg.append('g')
        .classed('title', true)
        .append('text')
        .text('The secret of success according to social strata')
        .attr('transform', `translate(${center},${25})`);

    let legend = svg.append('g')
        .classed('legend', true)
        .attr('transform', (d, i) => `translate(${20},${titleHeight +20})`);
    legend.append('rect')
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .style('fill', 'none')
        .style('stroke', 'darkgray');

    var container = svg.append('g')
        .classed('container', true)
        .attr('transform', `translate(${0},${titleHeight})`)
        .style('clip-path', 'url(#my-clippath)');
    container.append('circle')
        .attr('cx', center)
        .attr('cy', center)
        .attr('r', radius)
        .style('fill', 'none')
        .style('stroke', 'darkgray');
    var linesContainer = container.append('g')
        .attr('transform', (d, i) => `translate(${center},${center})`);
    var seriesContainer = container.append('g')
        .attr('transform', (d, i) => `translate(${center},${center})`);


    function update(data: Array<any>) {
        var colorScale = d3.scaleOrdinal<string, string>()
            .domain(data.map(d => d.strata))
            .range(d3.schemeCategory20);

        var valuesScale = d3.scaleLinear<number, number>()
            .range([0, radius])
            .domain([0, d3.max(data, d => d.rate)])
            .nice();
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

        let generator = d3.line<any>()
            .x((d, i) => {
                var res = Math.cos(i * Math.PI * 2 / filtered.length) * valuesScale(d.rate);
                return res;
            })
            .y((d, i) => Math.sin(i * Math.PI * 2 / filtered.length) * valuesScale(d.rate))
            .curve(d3.curveLinearClosed)
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
            .style('fill', d => colorScale(d.key))
            .style('opacity', 0.5);
        enterSeries.append('path')
            .attr('d', d => generator(d.values))
            .style('fill','none')
            .style('stroke', d => colorScale(d.key));

        let legendEnter = legend.selectAll('.legend-item')
            .data(colorScale.domain())
            .enter()
            .append('g')
            .classed('legend-item', true)
            .attr('transform', (d, i) => `translate(${5},${i * 15 + 5})`);
        legendEnter.append('rect')
            .attr('width', 10)
            .attr('height', 10)
            .style('fill', d => colorScale(d));
        legendEnter.append('text')
            .attr('x', 15)
            .attr('y', 10)
            .text(d => d);
    };
}