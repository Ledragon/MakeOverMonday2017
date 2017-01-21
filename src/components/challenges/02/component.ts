import * as d3 from 'd3';
import { GetContainer, title, BottomCategoricalAxis, LeftLinearAxis } from 'ldd3';
// import * as plot from '../../../charting/plotFactory';

// // import { legentd } from '../../../charting/lege';
// import { title } from '../../../charting/title';
// import { BottomCategoricalAxis } from '../../../charting/BottomCategoricalAxis';
// import { LeftLinearAxis } from '../../../charting/LeftLinearAxis';
import { ICsvService } from '../../../services/csvService';

export var mom02 = {
    name: 'mom02',
    component: {
        templateUrl: 'components/challenges/02/template.html',
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

    let p = GetContainer('#chart', width, height, plotMargins);
    let plotGroup = p.group();
    let plotHeight = p.height();
    let plotWidth = p.width();


    let linesGroup = plotGroup.append('g')
        .classed('lines', true);

    let series = plotGroup.append('g')
        .classed('series-list', true);
    let t = new title(d3.select('svg'), width, height)
        .text('iPhones Units sold (in millions) - quarterly');
    let yAxis = new LeftLinearAxis(plotGroup, plotWidth, plotHeight);
    let xAxis = new BottomCategoricalAxis(plotGroup, plotWidth, plotHeight)
        .padding(0.3);

    let quarterScale = d3.scaleBand()
        .domain(['Q1', 'Q2', 'Q3', 'Q4']);
    let colorScale = d3.schemeCategory20;

    const fileName = 'components/challenges/02/data/data.csv';
    csvService.read<any>(fileName, update);

    function update(data: Array<any>) {
        yAxis.domain(d3.extent(data, d => parseFloat(d['Units sold (in millions)'])));
        xAxis.domain(data.map(d => d.Year));
        let ticks = yAxis.ticks();
        var linesBound = linesGroup.selectAll('.line')
            .data(ticks);
        linesBound
            .exit()
            .remove();
        let linesEnter = linesBound
            .enter()
            .append('g')
            .classed('line', true)
            .attr('transform', d => `translate(${0},${yAxis.scale(d)})`);
        linesEnter.append('line')
            .attr('x1', 0)
            .attr('x2', plotWidth)
            .attr('y1', 0)
            .attr('y1', 0)
            .style('stroke', 'lightgray');
        quarterScale.range([0, xAxis.bandWidth()]);
        let byYear = d3.nest<any>()
            .key(d => d.Year)
            .entries(data);

        var dataBound = series.selectAll('.year')
            .data(byYear);
        dataBound
            .exit()
            .remove();
        let enterSelection = dataBound
            .enter()
            .append('g')
            .classed('year', true)
            .attr('transform', d => `translate(${xAxis.scale(d.key)},${0})`);
        enterSelection.selectAll('rect')
            .data(d => d.values)
            .enter()
            .append('rect')
            .attr('x', (d: any) => quarterScale(d.Quarter))
            .attr('y', (d:any) => yAxis.scale(parseFloat(d['Units sold (in millions)'])))
            .attr('height', (d:any) => yAxis.scale(0) - yAxis.scale(parseFloat(d['Units sold (in millions)'])))
            .attr('width', quarterScale.bandwidth())
            .style('fill', (d, i) => colorScale[i]);
    };
}