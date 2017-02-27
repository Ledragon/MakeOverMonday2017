import * as d3 from 'd3';
export class Map {
    private _key: (d: any, p: any) => boolean;
    private _group: d3.Selection<any, any, any, any>;
    constructor(selector: string, width: number, height: number) {
        var group = d3.select(selector)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .classed('map', true);
        let projection = d3.geoMercator();
        let pathGenerator = d3.geoPath()
            .projection(projection);
        this._group = group;
        d3.json('components/challenges/09/data/world.json', (error, world: any) => {
            if (error) {
                console.error(error);
            } else {
                projection.fitSize([width, height], world);
                group
                    .selectAll('path')
                    .data(world.features)
                    .enter()
                    .append('path')
                    .classed('country', true)
                    .attr('d', (d: any) => pathGenerator(d));
            }
        });
    }

    key(value: (d: any, p: any) => boolean): Map {
        this._key = value;
        return this;
    }

    update(data: Array<any>) {
        var self = this;
        this._group
            .selectAll('path')
            .each(function (d, i) {
                d3.select(this)
                    .classed('found', dd => self._key(dd, d))
            });
    }
}