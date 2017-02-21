import * as d3 from 'd3';

export class Slider {
    private _xScale: d3.ScaleLinear<number, number>;
    private _ticksGroup: d3.Selection<any, any, any, any>;
    constructor(selector: string, private _width: number, private _height: number) {
        var margins = {
            top: 10,
            bottom: 0,
            left: 30,
            right: 30
        }
        var svg = d3.select(selector)
            .append('svg')
            .attr('width', _width)
            .attr('height', _height);
        var group = svg.append('g')
            .classed('slider', true)
            .attr('transform', `translate(${margins.left},${margins.top})`);
        let sliderWidth = _width - margins.left - margins.right;
        this._xScale = d3.scaleLinear<number, number>()
            .range([0, sliderWidth]);
        group.append('line')
            .classed('track', true)
            .attr('x1', 0)
            .attr('x2', sliderWidth);
        group.append('line')
            .classed('track-inset', true)
            .attr('x1', 0)
            .attr('x2', sliderWidth);
        group.append('circle')
            .classed('handle', true)
            .attr('r', 8);
        this._ticksGroup = group.append('g')
            .classed('ticks', true)
            .attr('transform', (d, i) => `translate(${0},${margins.top + 10})`);
    }

    domain(value: [number, number]) {
        this._xScale.domain(value);
        this._ticksGroup.selectAll('.tick')
            .data(this._xScale.ticks())
            .enter()
            .append('text')
            .classed('tick', true)
            .attr('x', (d, i) => this._xScale(d))
            .attr('y', 10)
            .text(d => d);
    }
}