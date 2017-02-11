import { Selection, format } from 'd3';
import { BottomLinearAxis } from 'ldd3';

export class TimeLinearChart<T>{
    
    constructor(container: Selection<any, any, any, any>, width: number, height: number) {
        // super(container, width, height);
    }

    format(value: string): TimeLinearChart<T>{
        var fmt = format(value);
        
        return this;
    }
}