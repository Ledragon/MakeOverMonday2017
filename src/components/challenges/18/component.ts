import * as d3 from 'd3';
import { ICsvService } from '../../../services/csvService';

export var mom18 = {
    name: 'mom18',
    component: {
        templateUrl: 'components/challenges/18/template.html',
        controller: controller
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
 
    const fileName = 'components/challenges/18/data/data.csv';
    csvService.read<any>(fileName, update);

    function update(data: IData) {
        let stratified = d3.stratify<any>()
            .id(d => d.card)
            .parentId(d => d.ferry)
            (data);
        console.log(stratified);




        let spliced = data
            .columns
            .splice(2);
        let byFerry = d3.nest<any>()
            .key(d => d.ferry)
            .entries(data);
        console.log(byFerry)
        var mapped = byFerry.map(d => {
            let values = d.values.map((v: any) => {
                var val = spliced.map(col => {
                    return {
                        date: new Date(col),
                        value: parseInt(v[col])
                    }
                });
                return {
                    card: v.card,
                    values:val
                }
            });
            return {
                key: d.key,
                values: values
            } 
        })
        console.log(mapped)
    };
}

interface IData extends Array<any>{
    columns: Array<string>;
}