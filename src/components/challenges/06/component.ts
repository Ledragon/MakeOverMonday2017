import * as d3 from 'd3';

export var mom06 = {
    name: 'mom06',
    component: {
        templateUrl: 'components/challenges/06/template.html',
        controller: controller
    }
}

function controller() {
    d3.json('https://data.cityofchicago.org/resource/wrvz-psew.json', (error, data) => {
        console.log(data)
    })

    function update(data: Array<any>) {
        console.log(data);
    };
}