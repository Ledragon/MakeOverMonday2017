import * as d3 from 'd3';
import { ICsvService } from '../../../services/csvService';
import { SpiderChart } from 'ldd3';

export var mom13 = {
    name: 'mom13',
    component: {
        templateUrl: 'components/challenges/13/template.html',
        controller: controller
    }
}

function controller(csvService: ICsvService) {


    const fileName = 'components/challenges/13/data/data.csv';
    csvService.read<any>(fileName, update, d => {
        return {
            strata: d['Social Strata'],
            reason: d.Reason,
            rate: parseFloat(d.Rate)
        };
    });
    var chart = new SpiderChart<any>('#chart', 600, 600)
        .x(d => d.rate)
        .y(d => d.reason)
        .groupBy(d => d.strata);

    function update(data: Array<any>) {
        var reasons = data.map(d => d.reason);
        var filtered: Array<string> = [];
        reasons.forEach(r => {
            if (filtered.indexOf(r) < 0) {
                filtered.push(r);
            }
        });
        chart.update(data);
    };
}