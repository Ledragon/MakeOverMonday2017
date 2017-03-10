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
        .y(d => d.subscribers)
        .hasLine(false)
        .hasPoints(true);

    const fileName = 'components/challenges/10/data/data.csv';
    csvService.read<any>(fileName, update, parse);

    let colorScale = d3.scaleOrdinal<string>()
        .range(['green', 'lightgreen', 'yellow', 'orange', 'red']);
    scatter.pointColor((d, i) => colorScale(d.rating));

    function update(data: Array<any>) {
        let xDomain = [0, d3.max(data, d => d.videoViews)] as [number, number];
        let yDomain = [0, d3.max(data, d => d.subscribers)] as [number, number];
        colorScale.domain(data.map(d => d.rating));
        // console.log(colorScale.domain());
        scatter.update(data, xDomain, yDomain);
        let chart = d3.select('#chart');
        chart.select('svg')
            .style('background', '#110b11');
        var ticks = chart
            .selectAll('.tick');
        ticks.select('text')
            .attr('fill', '#69140e');
        ticks.select('line')
            .attr('stroke', '#69140e');
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