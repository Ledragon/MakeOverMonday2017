import * as d3 from 'd3';
import { interpolateGreens } from 'd3-scale-chromatic';
import { ICsvService } from '../../../services/csvService';
import { HorizontalBarChart } from 'ldd3';

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
    var colorScale = d3.scaleLinear()
        .range([1,0]);
    var chartByCountry = getBarChart('map', 'Spendings by country', (d: IDataFormat) => interpolateGreens(colorScale(d.amount)));
    var chartByCategory = getBarChart('byCategory', 'Spendings by category', (d: IDataFormat) => interpolateGreens(colorScale(d.amount)));
    var chartByMerchant = getBarChart('byMerchant', 'Spendings by merchant', (d: IDataFormat) => interpolateGreens(colorScale(d.amount)));
    var chartBySubCategory = getBarChart('bySubCategory', 'Spendings by sub-category', (d: IDataFormat) => interpolateGreens(colorScale(d.amount)));

    const fileName = 'components/challenges/09/data/data.csv';
    csvService.read<any>(fileName, update, parse);

    function update(data: Array<IDataFormat>) {
        updateChart(chartByCountry, data, d => d.country);
        updateChart(chartByCategory, data, d => d.category);
        updateChart(chartByMerchant, data, d => d.merchant);
        var bc = d3.nest<IDataFormat>()
            .key(d=>d.category)
            .entries(data)
            .map((d: any) => {
                d.amount = d3.sum(d.values, (v: IDataFormat) => v.amount);
                return d;
            })
            .sort((a, b) => b.amount - a.amount)[0]
            .values;
        updateChart(chartBySubCategory, bc, d => d.subCategory);

        

        // let byCategory = d3.nest<IDataFormat>()
        //     .key(d => d.category)
        //     .entries(data).map((d: { key: string, values: Array<IDataFormat> }) => {
        //         return {
        //             key: d.key,
        //             amount: d3.sum(d.values, v => v.amount)
        //         }
        //     })
        //     .sort((a, b) => b.amount - a.amount);
        // chartByCategory.update(byCategory);

        // let byMerchant = d3.nest<IDataFormat>()
        //     .key(d => d.merchant)
        //     .entries(data).map((d: { key: string, values: Array<IDataFormat> }) => {
        //         return {
        //             key: d.key,
        //             amount: d3.sum(d.values, v => v.amount)
        //         }
        //     })
        //     .sort((a, b) => b.amount - a.amount);
        // chartByMerchant.update(byMerchant);
    };

    function parse(d: any): IDataFormat {
        return {
            date: new Date(d.Date),
            merchant: d.Merchant,
            amount: parseFloat(d.Amount),
            country: d.Country,
            category: d.Category,
            subCategory: d.Subcategory
        };
    }

    function updateChart(chart:HorizontalBarChart<any>, data: Array<IDataFormat>, callback: (d:IDataFormat)=>string): void{
        let byCountry = d3.nest<IDataFormat>()
            .key(callback)
            .entries(data)
            .map((d: { key: string, values: Array<IDataFormat> }) => {
                return {
                    key: d.key,
                    amount: d3.sum(d.values, v => v.amount)
                }
            })
            .sort((a, b) => b.amount - a.amount);
        colorScale.domain(d3.extent(byCountry, d => d.amount));
        chart.update(byCountry);
    }

    function getBarChart(id: string, title: string, color: any): HorizontalBarChart<{ key: string, amount: number }> {
        var node = (<any>d3.select('#' + id).node()).getBoundingClientRect();
        var chart = new HorizontalBarChart<{ key: string, amount: number }>(id, node.width, node.height)
            .x(d => d.amount)
            .y(d => d.key)
            .title(title)
            .color(color)
            .format('.2f');
        return chart;
    }
}



interface IDataFormat {
    date: Date;
    merchant: string;
    amount: number;
    country: string;
    category: string;
    subCategory: string;
}