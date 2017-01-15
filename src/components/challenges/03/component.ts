import * as d3 from 'd3';
import * as plot from '../../../charting/plotFactory';
import { title } from '../../../charting/title';
import { LeftCategoricalAxis } from '../../../charting/LeftCategoricalAxis';
import { ICsvService } from '../../../services/csvService';

import { ICsvFormat } from '../ICsvFormat';

export var mom03 = {
    name: 'mom03',
    component: {
        templateUrl: 'components/challenges/03/template.html',
        controller: controller
    }
}

function controller(csvService: ICsvService) {
    const width = 720;
    const height = 720;
    let plotMargins = {
        top: 60,
        bottom: 30,
        left: 120,
        right: 30
    };

    let p = plot.plot('#chart', width, height, plotMargins);
    let plotGroup = p.group();
    let plotHeight = p.height();
    let plotWidth = p.width();
    new title(d3.select('#chart').select('svg'), width, height)
        .text('Trump\'s most retweeted accounts');

    const fileName = 'components/challenges/03/data/data.csv';
    csvService.read<any>(fileName, update, parseFunction);

    const yAxis = new LeftCategoricalAxis(plotGroup, plotWidth, plotHeight)
        .padding(0.3);

    function update(data: Array<IFormat>) {
        var r = new RegExp('@[a-zA-Z0-9]*:');
        let byTweeter = d3.nest<IFormat>()
            .key(d => d.text.match('@[a-zA-Z0-9]*:')[0].replace(':', ''))
            .entries(data.filter(d => d.isRetweet && d.text.match('@[a-zA-Z0-9]*:')))
            .sort((a, b) => b.values.length - a.values.length)
            .slice(0, 30);
        yAxis.domain(byTweeter.map(d => d.key));
        let xScale = d3.scaleLinear<number, number>()
            .domain([0, d3.max(byTweeter, d => d.values.length)])
            .range([0, plotWidth]);

        const seriesGroup = plotGroup.append('g')
            .classed('series-group', true);

        var dataBound = seriesGroup.selectAll('.series')
            .data(byTweeter);
        dataBound
            .exit()
            .remove();
        var enterSelection = dataBound
            .enter()
            .append('g')
            .classed('series', true)
            .attr('transform', (d, i) => `translate(${0},${yAxis.scale(d.key)})`);
        
        let colorScale = d3.scaleLinear<string, string>()
            .domain(xScale.domain())
        .range(['#CBF7ED', '#EF626C'])

        var rect = enterSelection.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', d => xScale(d.values.length))
            .attr('height', yAxis.bandWidth())
            .style('stroke', 'none')
            .style('fill', d => colorScale(d.values.length));
        enterSelection.append('text')
            .style('text-anchor', 'end')
            .style('font-size', '10px')
            .attr('x', d => xScale(d.values.length)-5)
            .attr('y',11)
            .text(d => d.values.length);
    };

    function parseFunction(d: any): IFormat {
        return {
            favoriteCount: parseInt(d.favorite_count),
            source: d.source,
            inReplyToScreenName: d.in_reply_to_screen_name,
            isRetweet: d.is_retweet === 'True',
            createdAt: new Date(d.created_at),
            text: d.text,
            retweetCount: parseInt(d.retweet_count)
        };
    }
}

interface IFormat {
    favoriteCount: number;
    source: string;
    inReplyToScreenName: string;
    isRetweet: boolean;
    createdAt: Date;
    text: string;
    retweetCount: number;
}