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
    const height = 840;
    let plotMargins = {
        top: 10,
        bottom: 30,
        left: 50,
        right: 30
    };

    let svg = d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    let plotGroup = svg.append('g')
        .classed('plot', true)
        .attr('transform', `translate(${plotMargins.left},${plotMargins.top})`);

    let plotWidth = width - plotMargins.left - plotMargins.right;
    let plotHeight = height - plotMargins.top - plotMargins.bottom;

    const fileName = 'components/challenges/18/data/data.csv';
    csvService.read<any>(fileName, update);

    function update(data: IData) {

        let spliced = data
            .columns
            .splice(2);
        let byFerry = d3.nest<any>()
            .key(d => d.ferry)
            .entries(data);
        var mapped = byFerry.map(d => {
            let values = d.values.map((v: any) => {
                var val = spliced.map(col => {
                    return {
                        date: new Date(col),
                        value: parseInt(v[col])
                    }
                });
                return {
                    key: v.card,
                    values: val
                }
            });
            return {
                key: d.key,
                values: values
            }
        });
        var root = {
            key: 'Ferries', values: mapped
        };
        let hierarchy = d3.hierarchy<any>(root, d => d.values);

        let tree = d3.cluster<any>()
            .size([plotHeight, plotWidth])(hierarchy);
        console.log(tree);
        var dataBound = plotGroup.selectAll('.node')
            .data(tree.descendants().filter(d => d.depth <= 2));
        dataBound
            .exit()
            .remove();
        var enterSelection = dataBound
            .enter()
            .append('g')
            .classed('node', true)
            .attr('transform', (d, i) => `translate(${d.y},${d.x})`);

        enterSelection.append('line')
            .attr('x1', d => d.parent ? d.parent.y - d.y : 0)
            .attr('y1', d => d.parent ? d.parent.x - d.x : 0)
            .attr('x2', d => 0)
            .attr('y2', d => 0)
            .style('stroke', 'darkgray')
        enterSelection.append('circle')
            .attr('r', 2);
        enterSelection.append('text')
            .style('text-anchor', d => d.depth < 2 ? 'end' : 'start')
            .style('font-size', '.7em')
            .style('color', 'darkgray')
            .attr('x', d => d.depth < 2 ? -5 : 5)
            .attr('y', 3)
            .text(d => d.data.key);

    };
}

interface IData extends Array<any> {
    columns: Array<string>;
}