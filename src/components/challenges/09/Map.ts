import * as d3 from 'd3';
import { world } from './data/world';
export class Map {
    private _key: (d: any, p: any) => boolean;
    private _group: d3.Selection<any, any, any, any>;
    constructor(selector: string, width: number, height: number) {
        var margins = {
            top: 30, bottom: 30, left: 30, right: 30
        };
        var group = d3.select(selector)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .classed('map', true)
            .attr('transform', (d, i) => `translate(${margins.top},${margins.left})`);
        var plotWidth = width - margins.left - margins.right;
        var plotHeight = height - margins.top - margins.bottom;
        let projection = d3.geoMercator();
        let pathGenerator = d3.geoPath()
            .projection(projection);
        this._group = group;
        projection.fitSize([plotWidth, plotHeight], world);
        group
            .selectAll('path')
            .data(world.features)
            .enter()
            .append('path')
            .classed('country', true)
            .attr('d', (d: any) => pathGenerator(d));
    }

    key(value: (d: any, p: any) => boolean): Map {
        this._key = value;
        return this;
    }

    update(data: Array<any>, color: any) {
        var self = this;
        var keys = data.map(d => d.key);
        this._group
            .selectAll('path')
            .each(function (d: any, i) {
                var matching = data.filter(dd => dd.key === d.properties.name);
                if (matching.length > 0) {
                    d3.select(this)
                        .style('fill', color(matching[0]));
                }
            });
    }
}