import * as d3 from 'd3';
import { ICsvService } from '../../../services/csvService';
import { HorizontalBarChart } from 'ldd3'

export var mom19 = {
    name: 'mom19',
    component: {
        templateUrl: 'components/challenges/19/template.html',
        controller: controller
    }
}

function controller(csvService: ICsvService) {
    const width = 480;
    const height = 720;


    let chart = new HorizontalBarChart<{ brand: string, count: number }>('#chart', width, height)
        .x(d => d.count)
        .y(d => d.brand)
        .title('Brands exporting the most cars from the Netherlands');
    const fileName = 'components/challenges/19/data/data.csv';
    csvService.read<any>(fileName, update, d => {
        return {
            brand: d.Brand,
            count: parseInt(d['Count of Number of Records'])
        }
    });

    function update(data: Array<any>) {
        let displayed = data.sort((a, b) => b.count - a.count)
            .splice(0, 20);
        chart.update(displayed);
    };

}