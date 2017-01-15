import * as d3 from 'd3';
import * as plot from '../../../charting/plotFactory';
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
    const width = 960;
    const height = 480;
    let plotMargins = {
        top: 50,
        bottom: 30,
        left: 80,
        right: 30
    };

    let p = plot.plot('#chart', width, height, plotMargins);
    let plotGroup = p.group();
    let plotHeight = p.height();
    let plotWidth = p.width();


    const fileName = 'components/challenges/03/data/data.csv';
    csvService.read<any>(fileName, update, parseFunction);

    function update(data: Array<IFormat>) {
        let timeScale = d3.scaleTime<number>()
            .domain(d3.extent(data, d => d.createdAt))
            .range([0, plotWidth]);
        let xAxis = d3.axisBottom(timeScale);
        let xAxisGroup = plotGroup.append('g')
            .classed('axis', true)
            .attr('transform', `translate(${0},${plotHeight})`)
            .call(xAxis);
        let seriesGroup = plotGroup.append('g');

        var dataBound = seriesGroup.selectAll('.circle')
            .data(data.filter(d => d.isRetweet));
        dataBound
            .exit()
            .remove();
        var enterSelection = dataBound
            .enter()
            .append('g')
            .classed('series', true)
            .on('mouseenter', function (d, i) {
                console.log(d);
            });
        var circle = enterSelection.append('circle')
            .attr('cx', (d, i) => timeScale(d.createdAt))
            .attr('cy', 80)
            .attr('r', 5)
            .style('stroke', 'none')
            .style('fill', 'lightblue');
        var r = new RegExp('@[a-zA-Z0-9]*:');
        let byTweeter = d3.nest<IFormat>()
            .key(d => d.text.match('@[a-zA-Z0-9]*:')[0])
            .entries(data.filter(d => d.isRetweet && d.text.match('@[a-zA-Z0-9]*:')))
        console.log(byTweeter.sort((a,b)=>b.values.length-a.values.length));
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