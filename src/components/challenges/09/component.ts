import * as d3 from 'd3';
import { ICsvService } from '../../../services/csvService';

export var mom09 = {
    name: 'mom09',
    component: {
        templateUrl: 'components/challenges/09/template.html',
        controller: ['csvService', controller]
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

    const fileName = 'components/challenges/09/data/data.csv';
    csvService.read<any>(fileName, update, parse);

    function update(data: Array<any>) {
        console.log(data);
    };

    function parse(d: any): any {
        return {
            date: new Date(d.Date),
            merchant: d.Merchant,
            amount: parseFloat(d.Amount),
            country: d.Country,
            category: d.Category,
            subCategory: d.Subcategory
        };
    }
}