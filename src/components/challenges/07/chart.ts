import * as d3 from 'd3';
import { LeftLinearAxis, BottomCategoricalAxis, GetContainer } from 'ldd3';
export class MultiCategoricalChart<T> {
    private _group: d3.Selection<SVGElement, any, any, any>;
    private _xAxis: BottomCategoricalAxis<T>;
    private _yAxis: LeftLinearAxis<T>;
    private _x: (d: T) => string;
    private _y: (d: T) => number;
    constructor(selector: string, private _width: number, private _height: number) {
        var container = GetContainer(selector, _width, _height, {
            top: 30,
            bottom: 30,
            left: 90,
            right: 30
        });
        this._group = container.group();
        this._xAxis = new BottomCategoricalAxis<T>(this._group, container.width(), container.height());
        this._yAxis = new LeftLinearAxis<T>(this._group, container.width(), container.height());
        this._x = (d: any) => d.category;
        this._y = (d: any) => d.value;
    }

    x(value: (d: T) => string): MultiCategoricalChart<T> {
        if (arguments.length) {
            this._x = value;
        }
        return this;
    }

    y(value: (d: T) => number): MultiCategoricalChart<T> {
        if (arguments.length) {
            this._y = value;
        }
        return this;
    }

    update(data: Array<T>): void {
        this._xAxis.domain(data.map(this._x));
        this._yAxis.domain(d3.extent(data, this._y));
        let byCategory = d3.nest<any>()
            .key(this._x)
            .entries(data);
    }
}