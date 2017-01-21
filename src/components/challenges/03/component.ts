import { nest } from 'd3-collection';
import { max } from 'd3-array';
import { scaleLinear } from 'd3-scale';

import { HorizontalBarChart } from 'ldd3';
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

    let colorScale = scaleLinear<string, string>()
        .range(['#CBF7ED', '#EF626C'])
    let hbc = new HorizontalBarChart<any>('chart', width, height)
        .padding(0.3)
        .x(d => d.values.length)
        .y(d => d.key)
        .title('Trump\'s most retweeted accounts')
        .color(d => colorScale(d.values.length));

    const fileName = 'components/challenges/03/data/data.csv';
    csvService.read<any>(fileName, update, parseFunction);


    function update(data: Array<IFormat>) {
        var r = new RegExp('@[a-zA-Z0-9]*:');
        let byTweeter = nest<IFormat>()
            .key(d => d.text.match('@[a-zA-Z0-9]*:')[0].replace(':', ''))
            .entries(data.filter(d => d.isRetweet && d.text.match('@[a-zA-Z0-9]*:')))
            .sort((a, b) => b.values.length - a.values.length)
            .slice(0, 30);
        colorScale.domain([0, max(byTweeter, d => d.values.length)]);
        hbc.update(byTweeter);
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