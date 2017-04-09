import * as d3 from 'd3';
import { ICsvService } from '../../../services/csvService';

export var mom14 = {
    name: 'mom14',
    component: {
        templateUrl: 'components/challenges/14/template.html',
        controller: controller
    }
}

function controller(csvService: ICsvService) {
    const width = 720;
    const height = 720;

    const fileName = 'components/challenges/14/data/data.csv';
    csvService.read<any>(fileName, update, d => {
        return {
            industry: d.Industry,
            share: parseFloat(d['Employment share of total jobs (%)']),
            automation: parseFloat(d['Job automation (% at potential high risk)'])
        }
    });

    let svg = d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    let plotMargins = {
        top: 60,
        bottom: 30,
        left: 210,
        right: 30
    };
    let plotGroup = svg.append('g')
        .classed('plot', true)
        .attr('transform', `translate(${plotMargins.left},${plotMargins.top})`);
    let plotWidth = width - plotMargins.left - plotMargins.right;
    let plotHeight = height - plotMargins.top - plotMargins.bottom;

    svg.append('g')
        .classed('title', true)
        .attr('transform', (d, i) => `translate(${plotMargins.left + plotWidth / 2},${30})`)
        .append('text')
        .text('Risk of job automation by industry');
    let xScale = d3.scaleLinear()
        .domain([0, 1])
        .range([0, plotWidth]);
    let xAxis = d3.axisTop(xScale)
        .tickFormat(d3.format('2.0%'));
    let xAxisGroup = plotGroup.append('g')
        .classed('axis', true)
        .call(xAxis);
    let yScale = d3.scaleBand()
        .range([0, plotHeight])
        .padding(0.3);
    let yAxis = d3.axisLeft(yScale);
    let yAxisGroup = plotGroup.append('g')
        .classed('axis', true);


    const legendWidth = 120;
    const legendHeight = 50;
    let legend = svg.append('g')
        .classed('legend', true)
        .attr('transform', `translate(${width - legendWidth - plotMargins.right},${height - legendHeight - plotMargins.bottom})`);
    legend.append('rect')
        .attr('width', legendWidth)
        .attr('height', legendHeight);

    let colorScale = d3.scaleOrdinal<string>()
        .domain(['Employment share', '% of jobs at risk'])
        .range(['green', 'red']);

    var legendItems = legend.selectAll('.legend-item')
        .data(colorScale.domain());
    legendItems
        .exit()
        .remove();
    var enterLegend = legendItems
        .enter()
        .append('g')
        .classed('legend-item', true)
        .attr('transform', (d, i) => `translate(${0},${i * 22 + 7})`);
    enterLegend.append('rect')
        .attr('x', 5)
        .attr('width', 10)
        .attr('height', 10)
        .style('fill', d => colorScale(d));
    enterLegend.append('text')
        .attr('x', 20)
        .attr('y', 10)
        .text(d => d);

    function update(data: Array<any>) {
        let byAmount = data.sort((a, b) => b.share - a.share);
        yScale.domain(byAmount.map(d => d.industry));
        yAxisGroup.call(yAxis);

        var dataBound = plotGroup.selectAll('.series')
            .data(data);
        dataBound
            .exit()
            .remove();
        var enterSelection = dataBound
            .enter()
            .append('g')
            .classed('series', true)
            .attr('transform', (d, i) => `translate(${0},${yScale(d.industry)})`);
        let bandWidth = yScale.bandwidth();
        enterSelection.append('rect')
            .transition()
            .attr('width', d => xScale(d.share))
            .attr('height', bandWidth)
            .style('fill', colorScale.range()[0]);
        enterSelection
            .append('rect')
            .transition()
            .attr('width', d => xScale(d.share * d.automation))
            .attr('height', bandWidth)
            .style('fill', colorScale.range()[1])
    };
}