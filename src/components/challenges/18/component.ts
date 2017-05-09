import * as d3 from 'd3';
import { ICsvService } from '../../../services/csvService';
import { CategoricalLinearChart } from 'ldd3';

export var mom18 = {
    name: 'mom18',
    component: {
        templateUrl: 'components/challenges/18/template.html',
        controller: controller
    }
}

function controller(csvService: ICsvService) {
    const width = 1800;
    const height = 480;
    let colorScale = d3.scaleOrdinal<string, string>()
        .range(d3.schemeCategory20);

    var chart = new CategoricalLinearChart<any>('#chart', width, height)
        .color((d, i) => d3.schemeCategory20[i])
        .curve('line')
        .x(d => d.date)
        .y(d => d.value)
        .groupBy(d => d.ferry);
    const fileName = 'components/challenges/18/data/data.csv';
    csvService.read<any>(fileName, update);

    function update(data: IData) {

        let spliced = data
            .columns
            .splice(2);
        var flattened: any[] = [];
        let format = d3.timeFormat('%m/%y')
        data.forEach(d => {
            spliced.forEach(s => {
                flattened.push({
                    ferry: d.ferry,
                    card: d.card,
                    date: format(new Date(s)),
                    value: parseInt(d[s])
                })
            });
        });
        let byCard = d3.nest<any>()
            .key(d => d.card)
            .entries(flattened);
        chart.title(byCard[0].key)
            .update(byCard[0].values);
    };
}

interface IData extends Array<any> {
    columns: Array<string>;
}