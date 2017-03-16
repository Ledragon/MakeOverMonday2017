import * as d3 from 'd3';
import { MultiCategoricalChart } from 'ldd3';
import { ICsvService } from '../../../services/csvService';

export var mom11 = {
    name: 'mom11',
    component: {
        templateUrl: 'components/challenges/11/template.html',
        controller: controller
    }
}

function controller(csvService: ICsvService) {
    var colors = ['#A80874', '#1E3888'];
    let chart = new MultiCategoricalChart<{ gender: string, likelihood: number, orientation: string }>('#chart', 960, 480)
        .x(d => d.orientation)
        .y(d => d.likelihood)
        .yFormat('0.0%')
        .color(i => colors[i])
        .groupBy(d => d.gender)
        .title('Likelihood of orgasm');

    const fileName = 'components/challenges/11/data/data.csv';
    csvService.read<any>(fileName, update, parse);

    function update(data: Array<any>) {
        chart.update(data, [0, 1]);
    };

    function parse(d: any): { gender: string, likelihood: number, orientation: string } {
        return {
            gender: d.Gender,
            likelihood: parseFloat(d.Likelihood),
            orientation: d.Type
        };
    }
}