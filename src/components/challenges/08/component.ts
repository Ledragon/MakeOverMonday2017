import * as d3 from 'd3';
import { ICsvService } from '../../../services/csvService';
import { HorizontalBarChart } from 'ldd3';
import { Slider } from './slider';

export var mom08 = {
    name: 'mom08',
    component: {
        templateUrl: 'components/challenges/08/template.html',
        controller: controller
    }
}

function controller(csvService: ICsvService) {
    const width = 960;
    const height = 480;

    const fileName = 'components/challenges/08/data/SellingPrices.csv';
    csvService.read<any>(fileName, update, parse);
    let horizontal = new HorizontalBarChart<ISellingPrice>('chart', 480, 720)
        .x(d => d.price)
        .y(d => d.country)
        .title('Potato selling price (€/100kg)')
        .color(() => 'red');
    let slider = new Slider('#slider', 480, 60);

    function update(data: Array<ISellingPrice>) {
        // let byCOuntry = d3.nest<ISellingPrice>()
        //     .key(d => d.country)
        //     .entries(data);
        // console.log(byCOuntry);

        let byYear = d3.nest<ISellingPrice>()
            .key(d => d.year.toString())
            .entries(data);
        horizontal.update(byYear[0].values.sort((a: ISellingPrice, b: ISellingPrice) => b.price - a.price));
        slider.domain(d3.extent(data, d => d.year));
    
        // console.log(byYear);
    };

    function parse(d: any): ISellingPrice {
        return {
            country: d.Country,
            year: parseInt(d.Year),
            price: d['EUR per 100 kg'] ? parseFloat(d['EUR per 100 kg']) : null
        }
    }


    function productions() {
        const fileName = 'components/challenges/08/data/data.csv';
        csvService.read<any>(fileName, update, parse);

        function update(data: Array<any>) {
            console.log(data);
        };

        function parse(d: any): any {
            return {
                country: d.Country,
                year: parseInt(d.Year),
                area: parseFloat(d['Area in 1000ha']),
                production: parseFloat(d['Harvested production in 1000t']),
                yield: parseFloat(d['Yield (100 kg/ha)']),
                mainArea: parseFloat(d['Main area (1000 ha)'])
            }
        }

    }
}

interface ISellingPrice {
    country: string;
    year: number;
    price: number;
}