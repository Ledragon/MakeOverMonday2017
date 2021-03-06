import * as d3 from 'd3';
import { ICsvService } from '../../../services/csvService';
import { HorizontalBarChart, Slider } from 'ldd3';
import { colorScale } from './colroScale';

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
    var cs = new colorScale();
    let horizontal = new HorizontalBarChart<ISellingPrice>('chart', 480, 720)
        .x(d => d.price)
        .y(d => d.country)
        .title('Potato selling price (€/100kg)')
        .color((d) => cs.color(d.price));
    var byYear: {
        key: string,
        values: Array<ISellingPrice>
    }[];
    let slider = new Slider('#slider', 480, 60)
        .on('click', (d, i) => {
            cs.domain(d3.extent(byYear[0].values, v => v.price));
            horizontal.update(byYear[i].values.sort((a: ISellingPrice, b: ISellingPrice) => b.price - a.price));
        });

    function update(data: Array<ISellingPrice>) {
        byYear = d3.nest<ISellingPrice>()
            .key(d => d.year.toString())
            .entries(data);
        cs.domain(d3.extent(byYear[0].values, v => v.price));
        horizontal.update(byYear[0].values.sort((a: ISellingPrice, b: ISellingPrice) => b.price - a.price));
        slider.domain(d3.extent(data, d => d.year));
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