import * as d3 from 'd3';
import { ICsvService } from '../../../services/csvService';
import { LinearLinearChart } from 'ldd3';

export var mom10 = {
    name: 'mom10',
    component: {
        templateUrl: 'components/challenges/10/template.html',
        controller: controller
    }
}

function controller(csvService: ICsvService) {

    var scatter = new LinearLinearChart<any>('chart', 720, 720)
        .x(d => d.videoViews)
        .xFormat('.2g')
        .y(d => d.subscribers)
        .yFormat('.2g')
        .hasLine(false)
        .hasPoints(true);

    const fileName = 'components/challenges/10/data/data.csv';
    csvService.read<any>(fileName, update, parse);
    let max = 10;
    let linearColor = d3.scaleLinear<string>()
    .interpolate(d3.interpolateHcl)    
        .domain([max, 1])
        .range(['#C1CFDA', '#139A43'])
    let colorScale = d3.scaleOrdinal<string>()
        .range(d3.range(1, max, 1).map(d => linearColor(d)));
    scatter.pointColor((d, i) => colorScale(d.rating));

    function update(data: Array<any>) {
        let xDomain = [0, d3.max(data, d => d.videoViews)] as [number, number];
        let yDomain = [0, d3.max(data, d => d.subscribers)] as [number, number];
        colorScale.domain(data.map(d => d.rating).sort());
        scatter.update(data, xDomain, yDomain);
        let chart = d3.select('#chart');
        let red = '#69140e';
        chart.selectAll('.domain')
            .style('stroke', red);
        var ticks = chart
            .selectAll('.tick');
        ticks.select('text')
            .attr('fill', red);
        ticks.select('line')
            .attr('stroke', red);
        let svg = chart.append('svg')
            .attr('width', 250)
            .attr('height', 720)
            .style('background', 'white');
        var gs = svg.selectAll('.legend-item')
            .data(colorScale.domain())
            .enter()
            .append('g')
            .attr('transform', (d, i) => `translate(${10},${i * 20+10})`);
        gs.append('rect')
            .attr('width', 10)
            .attr('height', 10)
            .style('fill', (d, i) => colorScale(d));
        gs.append('text')
            .attr('x', 20)
            .attr('y', 10)
            .text(d => d)
    };

    function parse(d: any): any {
        return {
            rank: parseInt(d.Rank),
            sbScore: parseInt(d['SB Score']),
            rating: d.Rating,
            user: d.User,
            subscribers: parseInt(d.Subscribers),
            videoViews: parseInt(d['Video Views'])
        };
    }
}