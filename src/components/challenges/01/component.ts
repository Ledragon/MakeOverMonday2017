import * as d3 from 'd3';

import { ICsvService } from '../../../services/csvService';
import { GetContainer, TopLinearAxis, LeftCategoricalAxis } from 'ldd3';

export var mom01 = {
    name: 'mom01',
    component: {
        templateUrl: 'components/challenges/01/template.html',
        controller: controller
    }
}

function controller(csvService: ICsvService) {
    const width = 960;
    const height = 840;
    let plotMargins = {
        top: 60,
        bottom: 30,
        left: 60,
        right: 30
    };

    let p = GetContainer('#chart', width, height, plotMargins);
    let plotGroup = p.group();
    let plotHeight = p.height();
    let plotWidth = p.width();

    d3.select('#chart')
        .select('svg')
        .append('defs')
        .append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('width', plotWidth)
        .attr('height', plotHeight);


    let xAxis = new TopLinearAxis<any>(plotGroup, plotWidth, plotHeight);
    let yAxis = new LeftCategoricalAxis<any>(plotGroup, plotWidth, plotHeight)
        .padding(0.1)
        .domain(d3.range(1, 51, 1).map(d => d.toString()));
    let seriesGroup = plotGroup.append('g')
        .attr('clip-path', 'url(\'#clip\')')
        .classed('series-group', true);

    const fileName = 'components/challenges/01/data/data.csv';
    csvService.read<any>(fileName, update, parseFunction);

    function update(data: Array<any>) {
        let byGender = d3.nest<any>()
            .key(d => d.gender)
            .entries(data);
        let femaleTopJobs = byGender.filter(d => d.key === 'Female')[0]
            .values
            .sort((a: any, b: any) => a.genderRank - b.genderRank)
            .splice(0, 50);
        let maleTopJobs = byGender.filter(d => d.key === 'Male')[0]
            .values
            .sort((a: any, b: any) => a.genderRank - b.genderRank)
            .splice(0, 50);

        xAxis.domain([0, d3.max(data, d => d.income)]);

        drawSeries(maleTopJobs, 'male', 'lightblue');
        drawSeries(femaleTopJobs, 'female', 'pink');
    };

    let fmt = d3.format('$')
    function drawSeries(data: Array<any>, classed: string, color: string) {
        var dataBound = seriesGroup.selectAll('.' + classed)
            .data(data);
        dataBound
            .exit()
            .remove();
        let enterSelection = dataBound
            .enter()
            .append('g')
            .classed(classed, true)
            .attr('transform', d => `translate(${0},${yAxis.scale(d.genderRank)})`)
            .on('mouseenter', function (d) {
                d3.select(this).select('text')
                    .style('display', null)
            })
            .on('mouseleave', function (d) {
                d3.select(this).select('text')
                    .style('display', 'none');
            });
        let width = 4;
        enterSelection.append('rect')
            .attr('x', 1)
            .attr('width', d => xAxis.scale(d.income))
            .attr('height', yAxis.bandWidth())
            .style('fill', 'white');
        enterSelection.append('rect')
            .attr('x', d => xAxis.scale(d.income) - width / 2)
            .attr('width', width)
            .attr('height', yAxis.bandWidth());
        enterSelection.append('text')
            .style('font-size', '12px')
            .style('text-anchor', 'end')
            .style('display', 'none')
            .attr('x', d => xAxis.scale(d.income) - 5)
            .attr('y', yAxis.bandWidth())
            .text(d => d.occupation + ' - ' + fmt(d.income));
    }

    function parseFunction(d: any) {
        return {
            genderRank: parseInt(d['Gender Rank']),
            occupation: d.Occupation,
            gender: d.Gender,
            individuals: parseInt(d.Individuals),
            income: parseFloat(d['Average Taxable Income $'])
        }
    }
}