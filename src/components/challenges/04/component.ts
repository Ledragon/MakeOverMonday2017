import * as d3 from 'd3';

import { ICsvService } from '../../../services/csvService';
import { CategoricalLinearChart } from 'ldd3';
export var mom04 = {
    name: 'mom04',
    component: {
        templateUrl: 'components/challenges/04/template.html',
        controller: controller
    }
}

function controller(csvService: ICsvService) {

    const fileName = 'components/challenges/04/data/data.csv';
    csvService.read<any>(fileName, update);

    function update(data: Array<any>) {
        console.log(data);
        let filtered = data.filter(d => d.Region.indexOf('Total') === 0)
            .filter(d => d.Year === '2013' || d.Year === '2014' || d.Year === '2015');
        let byType = d3.nest<any>()
            .key(d => d['Visitor Type'])
            .entries(filtered);
        let map1 = byType.map(d => {
            return {
                type: d.key,
                byYear: d.values
            }
        });
        map1.forEach(m => {
            try {
                var c = new CategoricalLinearChart<any>('#chart', 800, 400)
                    .title(m.type)
                    .x(d => d.Month)
                    .y(d => parseInt(d['Regional Tourism Indicator (baseline 100)']))
                    .groupBy(d => d.Year)
                    .update(m.byYear);
            } catch (e) {
                console.error(e);
            }
        });
    };
}