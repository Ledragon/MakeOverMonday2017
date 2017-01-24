import * as d3 from 'd3';
export function lineChart(selection: d3.Selection<HTMLDivElement, any, any, any>) {
    let width = 960;
    let height = 400;
    let svg = selection
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    let plotMargins = {
        top: 30,
        bottom: 30,
        left: 150,
        right: 30
    };
    let plotGroup = svg.append('g')
        .classed('plot', true)
        .attr('transform', `translate(${plotMargins.left},${plotMargins.top})`);

    let plotWidth = width - plotMargins.left - plotMargins.right;
    let plotHeight = height - plotMargins.top - plotMargins.bottom;

    let datum = selection.datum();
    let xScale = d3.scaleBand<any>()
        .domain(selection.datum().byYear[0].values.map((d: any) => d.Month))
        .range([0, plotWidth]);
    let xAxis = d3.axisBottom(xScale);
    let xAxisGroup = plotGroup.append('g')
        .classed('axis', true)
        .attr('transform', (d, i) => `translate(${0},${plotHeight})`)
        .call(xAxis);

    let yScale = d3.scaleLinear()
        .domain([0, 200])//d3.max(data, f => parseInt(f['Regional Tourism Indicator (baseline 100)']))])
        .nice()
        .range([plotHeight, 0]);
    let yAxis = d3.axisLeft(yScale);
    let yAxisGroup = plotGroup.append('g')
        .classed('axis', true)
        .call(yAxis);
    let lineGenerator = d3.line<any>()
        .curve(d3.curveStep)
        .x(d => xScale(d.Month)+xScale.bandwidth()/2)
        .y(d => yScale(parseInt(d['Regional Tourism Indicator (baseline 100)'])));
    var dataBound = plotGroup.selectAll('.year-series')
        .data(datum.byYear);
    dataBound
        .exit()
        .remove();
    var enterSelection = dataBound
        .enter()
        .append('g')
        .classed('year-series', true);
    enterSelection.append('path')
        .attr('d', d => lineGenerator(d.values))
        .style('stroke', (d, i) => d3.schemeCategory10[i]);
}