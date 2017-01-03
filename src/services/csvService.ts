import * as d3 from 'd3';
var _cache: Array<IKeyValuePair> = [];

export class CsvService implements ICsvService {
    read<T>(path: string, callback: (data: IDataFormat<T>) => void, parseFunction?: (d: any) => any) {
        if (_cache.some(d => d.key === path)) {
            let data = undefined;
            _cache.forEach(d => {
                if (d.key === path) {
                    data = d.values;
                }
            });
            callback(data);
        } else {
            d3.csv(path,
                parseFunction ? parseFunction : (d: any) => d as any,
                (error: any, data: IDataFormat<T>) => {
                    if (error) {
                        console.error(error);
                    } else {
                        _cache.push({
                            key: path,
                            values: data
                        });
                        callback(data);
                    }
                });
        }
    }
}

export interface ICsvService {
    read<T>(path: string, callback: (data: IDataFormat<T>) => void, parseFunction?: (d: any) => any): void;
}


interface IDataFormat<T> extends Array<T> {
    columns: string[];
}

interface IKeyValuePair {
    key: string;
    values: IDataFormat<any>;
}