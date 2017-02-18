import * as d3 from 'd3';
import { ICsvService } from '../../../services/csvService';
import { MultiCategoricalChart } from './chart';
export var mom07 = {
    name: 'mom07',
    component: {
        templateUrl: 'components/challenges/07/template.html',
        controller: ['csvService', controller]
    }
}

function controller(csvService: ICsvService) {
    const width = 960;
    const height = 360;

    var leftChart = new MultiCategoricalChart<any>('#chart', width, height)
        .x(d => d.year)
        .y(d => d.amount)
        .groupBy(d => d.what);
    var chartBy = new MultiCategoricalChart<any>('#chart2', width, height)
        .x(d => d.year)
        .y(d => d.amount)
        .groupBy(d => d.what);
    const fileName = 'components/challenges/07/data/data.csv';
    csvService.read<any>(fileName, update);

    function update(data: Array<any>) {
        let byMetric = d3.nest<any>()
            .key(d => d.Metric)
            .entries(data);
        var netSpending: Array<any> = byMetric[1].values;
        var dates = d3.range(2007, 2017, 1).map(d => d.toString());
        var toto: Array<any> = [];
        netSpending.forEach(d => {

            dates.forEach(dd => {
                var res: any = {
                    category: d.Category,
                    what: d['For'],
                    year: parseInt(dd),
                    amount: parseFloat(d[dd])
                }
                toto.push(res);
            });
        });
        let byCategory = d3.nest<any>()
            .key(d => d.category)
            .entries(toto);
        console.log(byCategory);
        leftChart
            .title(byCategory[0].key)
            .update(byCategory[0].values);
        chartBy
            .title(byCategory[1].key)
            .update(byCategory[1].values);
    };
}