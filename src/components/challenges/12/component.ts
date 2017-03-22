import * as d3 from 'd3';
import { ICsvService } from '../../../services/csvService';

export var mom12 = {
    name: 'mom12',
    component: {
        templateUrl: 'components/challenges/12/template.html',
        controller: controller
    }
}

function controller(csvService: ICsvService) {

    const height = 720;
    const width = 1200;
    let svg = d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    let plotMargins = {
        top: 30,
        bottom: 30,
        left: 150,
        right: 30
    };
    let plotGroup = svg.append('g')
        .classed('plot', true)
        .attr('transform', `translate(${plotMargins.left},${plotMargins.top})`);

    let plotWidth = width - plotMargins.left - plotMargins.right;
    let plotHeight = height - plotMargins.top - plotMargins.bottom;

    let colorScale = d3.scaleLinear<any, any>()
        .interpolate(d3.interpolateRgb)
        .range(['#191308', '#677DB7']);

    const fileName = 'components/challenges/12/data/data.csv';
    csvService.read<any>(fileName, update, parse);

    function update(data: Array<any>) {
        let seeds = data.map(d => d.winningSeed)
            .concat(data.map(d => d.losingSeed))
            .sort();
        let rounds = data.map(d => d.round);
        let years = data.map(d => (<Date>d.date).getFullYear());
        let byYear = d3.nest<any>()
            .key(d => (<Date>d.date).getFullYear().toString())
            .key(d => d.round)
            .entries(data);
        colorScale.domain(d3.extent(seeds));
        console.log(colorScale(5))

        let scale = d3.scaleBand()
            .domain(years.map(d => d.toString()))
            .range([0, plotWidth]);
        let axis = d3.axisBottom(scale);

        let yScale = d3.scaleBand()
            .domain(rounds)
            .range([plotHeight, 0]);
        let yAxis = d3.axisLeft(yScale);

        plotGroup.selectAll('line.bg')
            .data(yScale.domain())
            .enter()
            .append('line')
            .classed('bg', true)
            .attr('x1', 1)
            .attr('y1', d => yScale(d))
            .attr('y2', d => yScale(d))
            .attr('x2', plotWidth - 1)
            // .attr('height', yScale.bandwidth())
            // .style('fill', 'none')
            // .style('stroke', (d, i) => {
            //     return i % 2 === 0 ? '#9CA3DB' : 'white'
            // })
            .style('stroke', '#9CA3DB')
            // .style('opacity', '0.1');

        let axisGroup = plotGroup.append('g')
            .classed('axis', true)
            .attr('transform', `translate(${0},${plotHeight})`)
            .call(axis);
        let yAxisGroup = plotGroup.append('g')
            .classed('axis', true)
            .call(yAxis);

        let seriesGroup = plotGroup.append('g')
            .classed('series', true);

        var dataBound = seriesGroup.selectAll('.year')
            .data(byYear);
        dataBound
            .exit()
            .remove();
        var enterSelection = dataBound
            .enter()
            .append('g')
            .classed('year', true)
            .attr('transform', (d, i) => `translate(${scale(d.key)},${0})`);
        var roundsSelection = enterSelection.selectAll('.round')
            .data(d => d.values);
        roundsSelection
            .exit()
            .remove();
        var enterRounds = roundsSelection
            .enter()
            .append('g')
            .classed('round', true)
            .attr('transform', (d: any, i) => `translate(${0},${yScale(d.key)})`);
        // enterRounds.append('rect')
        //     .attr('height', yScale.bandwidth())
        //     .attr('width', plotWidth)
        //     .style('fill', (d, i) => i % 2 === 0 ? '#eee' : 'white');
        const r = scale.bandwidth() / 4;

        var match = enterRounds.selectAll('.match')
            .data((d: any) => d.values);
        match
            .exit()
            .remove();
        var enterCircle = match
            .enter()
            .append('g')
            .classed('match', true)
            .attr('transform', (d, i) => `translate(${0},${i * 2.5 + r})`);

        enterCircle.append('circle')
            .classed('winning-seed', true)
            .attr('cx', scale.bandwidth() / 3)
            // .attr('cy', (d,i)=>i*5)
            .attr('r', r)
            // .attr('y', (d,i)=>)
            .style('fill', (d: any) => {
                // console.log(d);
                let color = colorScale(d.winningSeed)
                // console.log(color);
                return color;
            });
        enterCircle.append('circle')
            .classed('losing-seed', true)
            .attr('r', r)
            .attr('cx', scale.bandwidth() / 3 * 2)
            .style('fill', (d: any) => {
                // console.log(d);
                let color = colorScale(d.losingSeed)
                // console.log(color);
                return color;
            });
        // enterSelection.append('circle')
        //     .attr('r', scale.bandwidth() / 4)
        //     .style('fill', d=>colorScale())
        //     ;
    };

    function parse(d: any): any {
        return {
            date: new Date(d.Date),
            round: d.Round,
            region: d.Region,
            winningSeed: parseInt(d['Winning Seed']),
            winner: d.Winner,
            winningScore: parseInt(d['Winning Score']),
            losingSeed: parseInt(d['Losing Seed']),
            loser: d.Loser,
            losingScore: parseInt(d['Losing Score']),
            overtime: d.Overtime
        }
    }
}