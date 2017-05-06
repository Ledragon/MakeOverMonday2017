import * as d3 from 'd3';
import { ICsvService } from '../../../services/csvService';
import { HorizontalBarChart } from 'ldd3';

export var mom17 = {
    name: 'mom17',
    component: {
        templateUrl: 'components/challenges/17/template.html',
        controller: controller
    }
}

function controller(csvService: ICsvService) {
    const width = 960;
    const height = 480;

    const fileName = 'components/challenges/17/data/data.csv';
    csvService.read<any>(fileName, update);
    var hbc = new HorizontalBarChart('#chart', width, height);

    function update(data: Array<any>) {
        var all: Array<IFormat> = data//.filter(d => d.Country === 'Global')
            .map(d => {
                return {
                    skill: d.Skill,
                    year: parseInt(d.Year),
                    rank: parseInt(d.Rank),
                    country: d.Country
                };
            });
        let byYear = d3.nest<IFormat>()
            .key(d => d.year.toString())
            .entries(all);
        console.log(byYear.length)

        let bySountry = d3.nest<IFormat>()
            .key(d => d.country)
            .entries(all);
        console.log(bySountry.length);
        let bySkill = d3.nest<IFormat>()
            .key(d => d.skill)
            .entries(all);
        console.log(bySkill.length);

        let global = all.filter(d => d.country === 'Global')
            .filter(d => d.year === 2015)
            .sort((a, b) => a.rank - b.rank);
        console.log(global)
    };
}

interface IFormat {
    year: number, rank: number, skill: string, country: string
}