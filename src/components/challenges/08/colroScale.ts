import * as d3 from 'd3';
import { interpolateGreens, interpolateBlues, interpolateSpectral, interpolateBrBG } from 'd3-scale-chromatic';
export class colorScale {
    private _scale: d3.ScaleLinear<any, any>;
    constructor() {
        this._scale = d3.scaleLinear()
            .range([0, 1]);
    }
        
    domain(value: [number, number]): colorScale {
        this._scale.domain(value);
        return this;
    }

    color(value: number): string {
        return interpolateSpectral(this._scale(value));
    }
} 