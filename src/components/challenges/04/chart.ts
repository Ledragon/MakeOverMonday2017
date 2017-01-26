import * as d3 from 'd3';
import { BottomCategoricalAxis, LeftLinearAxis } from 'ldd3';

import { Legend } from './Legend';

export class LineChart<T> {
    private _group: d3.Selection<any, any, any, any>;
    private _plotGroup: d3.Selection<any, any, any, any>;
    private _xAxis: BottomCategoricalAxis<T>;
    private _yAxis: LeftLinearAxis<T>;
    private _lineGenerator: d3.Line<T>;
    private _plotHeight: number;
    private _x: (d: T, i: number) => string;
    private _y: (d: T, i: number) => number;
    private _groupBy: (d: T) => string;

    private _legend: Legend<any>;

    constructor(selector: string, private _width: number, private _height: number) {
        var width = _width;
        var height = _height;
        let svg = d3.select(selector)
            .append('svg')
            .attr('width', width)
            .attr('height', height);
        this._group = svg;

        let plotMargins = {
            top: 60,
            bottom: 30,
            left: 60,
            right: 90
        };

        svg.append('rect')
            .attr('width', width)
            .attr('height', height)
            .style('fill', 'none')
            .style('stroke', 'darkGray');
        svg.append('g')
            .classed('title', true)
            .attr('transform', (d, i) => `translate(${width / 2},${30})`)
            .append('text');

        //TODO avoid nasty casting        
        let plotGroup: d3.Selection<SVGGElement, T, any, any> = svg.append('g')
            .classed('plot', true)
            .attr('transform', `translate(${plotMargins.left},${plotMargins.top})`) as d3.Selection<SVGGElement, T, any, any>;

        let plotWidth = width - plotMargins.left - plotMargins.right;
        let plotHeight = height - plotMargins.top - plotMargins.bottom;
        this._plotHeight = plotHeight;
        this._plotGroup = plotGroup;
        this._xAxis = new BottomCategoricalAxis(plotGroup, plotWidth, plotHeight);
        this._yAxis = new LeftLinearAxis(plotGroup, plotWidth, plotHeight);
        this._lineGenerator = d3.line<any>()
            .curve(d3.curveStep)
            .x((d, i) => this._xAxis.scale(this._x(d, i)) + this._xAxis.bandWidth() / 2)
            .y((d, i) => this._yAxis.scale(this._y(d, i)));


        var legendWidth = 90;
        var legendContainer = svg.append('g')
            .attr('transform', (d, i) => `translate(${this._width},${this._height / 2})`);
        this._legend = new Legend<any>(legendContainer, this._width, this._plotHeight)
            .label(d => d.key)
            .color((d, i) => d3.schemeCategory10[i]);
    }

    x(value: (d: T, i: number) => string): LineChart<T> {
        if (arguments.length) {
            this._x = value;
        }
        return this;
    }

    y(value: (d: T, i: number) => number): LineChart<T> {
        if (arguments.length) {
            this._y = value;
        }
        return this;
    }

    groupBy(value: (d: T) => string): LineChart<T> {
        if (arguments.length) {
            this._groupBy = value;
        }
        return this;
    }

    title(value: string): LineChart<T> {
        this._group.select('.title')
            .text(value);
        return this;
    }

    update(data: Array<T>): void {
        this._xAxis.domain(data.map((d, i) => this._x(d, i)));
        this._yAxis.domain([0, d3.max(data, (d, i) => this._y(d, i))]);

        let grouped = d3.nest<T>()
            .key(d => this._groupBy(d))
            .entries(data);
        var dataBound = this._plotGroup.selectAll('.year-series')
            .data(grouped);
        dataBound.exit()
            .remove();
        var enterSelection = dataBound
            .enter()
            .append('g')
            .classed('year-series', true);
        enterSelection.append('path')
            .attr('d', (d: any) => this._lineGenerator(d.values))
            .style('stroke', (d, i) => d3.schemeCategory10[i]);
        this._legend.update(grouped);
        // let legendBound = this._legend.selectAll('.legend-item')
        //     .data(d => grouped);
        // legendBound.exit().remove();
        // let enterLegend = legendBound
        //     .enter()
        //     .append('g')
        //     .classed('legend-item', true)
        //     .attr('transform', (d, i) => `translate(${10},${(i + 1) * 20})`);
        // enterLegend.append('rect')
        //     .attr('width', 10)
        //     .attr('height', 10)
        //     .style('fill', (d, i) => d3.schemeCategory10[i]);
        // enterLegend.append('text')
        //     .attr('x', 15)
        //     .attr('y', 9)
        //     .text(d => d.key);
    }
}
