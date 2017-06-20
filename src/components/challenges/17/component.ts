import * as d3 from 'd3';
import { ICsvService } from '../../../services/csvService';

export var mom17 = {
    name: 'mom17',
    component: {
        templateUrl: 'components/challenges/17/template.html',
        controller: controller
    }
}

function controller(csvService: ICsvService) {
    const width = 960;
    const height = 720;
    let margins = {
        top: 30, bottom: 240, left: 120, right: 30
    }
    let plot = d3.select('#chart')
        .append('svg')
        .attr('width', width).attr('height', height)
        .append('g')
        .classed('plot', true)
        .attr('transform', (d, i) => `translate(${margins.left},${margins.top})`);
    let plotHeight = height - margins.top - margins.bottom;
    let plotwidth = width - margins.left - margins.right;

    let xScale = d3.scaleBand<any>()
        .range([0, plotwidth]);
    let xAxis = d3.axisBottom(xScale);
    let xAxisGroup = plot.append('g')
        .classed('axis', true)
        .attr('transform', (d, i) => `translate(${0},${plotHeight})`);

    let yScale = d3.scaleBand<any>()
        .domain([2014, 2015, 2016])
        .range([0, plotHeight]);
    let yAxis = d3.axisLeft(yScale);
    let yAxisGroup = plot.append('g')
        .classed('axis', true)
        .call(yAxis);
    let seriesGroup = plot.append('g')
        .classed('series', true);
    const fileName = 'components/challenges/17/data/data.csv';
    csvService.read<any>(fileName, update);

    function update(data: Array<any>) {
        var all: Array<IFormat> = data//.filter(d => d.Country === 'Global')
            .map(d => {
                return {
                    skill: d.Skill,
                    year: parseInt(d.Year),
                    rank: parseInt(d.Rank),
                    country: d.Country
                };
            });

        let byCountry = d3.nest<IFormat>()
            .key(d => d.country)
            .entries(all);
        updateChart(byCountry[0].values);
        d3.select('#country')
            .on('change', function (d) {
                var value = d3.select(this).property('value');
                console.log(value);
                var found = byCountry.find(dd => dd.key === value);
                console.log(found);
                var values = found.values;
                updateChart(values);
            })
            .selectAll('option')
            .data(byCountry)
            .enter()
            .append('option')
            .attr('value', d => d.key)
            .text(d => d.key);
        // let bySkill = d3.nest<IFormat>()
        //     .key(d => d.skill)
        //     .entries(all);
        // console.log('by skill', bySkill.length);

        // let global = all.filter(d => d.country === 'Global')
        //     .filter(d => d.year === 2015)
        //     .sort((a, b) => a.rank - b.rank);
        // console.log(global)
    };
    let colorScale = d3.scaleLinear<any, any>()
        .range(['red', 'green', 'blue']);
    let radiusScale = d3.scaleLinear<any, any>()
        .range([10, 1]);
    function updateChart(values: Array<IFormat>) {
        xScale.domain(values.map(dd => dd.skill));
        xAxisGroup.call(xAxis);
        xAxisGroup.selectAll('.tick')
            .select('text')
            .style('text-anchor', 'end')
            .attr('transform', 'rotate(-90) translate(-10,-15)');
        colorScale.domain(d3.extent(values, v => v.rank));
        radiusScale.domain(d3.extent(values, v => v.rank));
        var dataBound = seriesGroup
            .selectAll('.point')
            .data(values);
        dataBound
            .exit()
            .remove();
        var enterSelection = dataBound
            .enter()
            .append('g')
            .classed('point', true);
        enterSelection.append('circle');
        let merged = enterSelection.merge(dataBound);
        merged.attr('transform', (d, i) => `translate(${xScale(d.skill) + xScale.bandwidth() / 2},${yScale(d.year) + yScale.bandwidth() / 2})`)
        merged.select('circle')
            .attr('r', d => radiusScale(d.rank))
            .style('fill', 'transparent')
            .style('stroke', 'steelblue')
            .style('stroke-width', 2);
    }
}

interface IFormat {
    year: number, rank: number, skill: string, country: string
}