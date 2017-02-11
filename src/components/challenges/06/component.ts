import * as d3 from 'd3';

import { ICsvService } from '../../../services/csvService';
import { TimeLinearChart } from './TimeLinearChart';

export var mom06 = {
    name: 'mom06',
    component: {
        templateUrl: 'components/challenges/06/template.html',
        controller: ['csvService', controller]
    }
}

function controller(csvService: ICsvService) {

    var width = 900;
    var height = 240;
    const dateFormat = '%Y-%m';

    var totalChart = new TimeLinearChart<any>('#total', width, height)
        .x(d => d.timestamp)
        .y(d => d.total)
        .xFormat(dateFormat)
        .yFormat('$.0s')
        .title('Total trip amount per month')
        .color(d3.schemeCategory10[0]);
   
    var tipsChart = new TimeLinearChart<any>('#tips', width, height)
        .x(d => d.timestamp)
        .y(d => d.tips)
        .xFormat(dateFormat)
        .yFormat('$.0s')
        .color(d3.schemeCategory10[1])
        .title('Total trip tips per month');
    var faresChart = new TimeLinearChart<any>('#fares', width, height)
        .x(d => d.timestamp)
        .y(d => d.fare)
        .xFormat(dateFormat)
        .yFormat('$.0s')
        .color(d3.schemeCategory10[2])
        .title('Total trip fare per month');
    
     var secondsChart = new TimeLinearChart<any>('#seconds', width, height)
        .x(d => d.timestamp)
        .y(d => d.seconds)
        .xFormat(dateFormat)
        .color(d3.schemeCategory10[0])
        .title('Average trip seconds per month');
     var milesChart = new TimeLinearChart<any>('#miles', width, height)
        .x(d => d.timestamp)
        .y(d => d.miles)
        .xFormat(dateFormat)
        .color(d3.schemeCategory10[1])
        .title('Average trip miles per month');

    const fileName = 'components/challenges/06/data/data.csv';
    csvService.read<any>(fileName, update, parse);

    function update(data: Array<any>) {
        var sorted = data.sort((a, b) => a.timestamp - b.timestamp);
        totalChart.update(sorted);
        secondsChart.update(sorted);
        tipsChart.update(sorted);
        faresChart.update(sorted);
        milesChart.update(sorted);
    };

    function parse(d: any): any {
        return {
            timestamp: new Date(d['Trip Start Timestamp']),
            extras: parseFloat(d.Extras),
            fare: parseFloat(d.Fare),
            tips: parseFloat(d.Tips),
            tolls: parseFloat(d.Tolls),
            miles: parseFloat(d['Trip Miles']),
            seconds: parseFloat(d['Trip Seconds']),
            total: parseFloat(d['Trip Total'])
        }
    }
}