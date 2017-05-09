function draw(width: number, height: number, plotMargins: any) {
    let svg = d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    let plotGroup = svg.append('g')
        .classed('plot', true)
        .attr('transform', `translate(${plotMargins.left},${plotMargins.top})`);

    let plotWidth = width - plotMargins.left - plotMargins.right;
    let plotHeight = height - plotMargins.top - plotMargins.bottom;

    let svg2 = d3.select('#chart2')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    let plotMargins2 = {
        top: 10,
        bottom: 30,
        left: 0,
        right: 30
    };
    let plotGroup2 = svg2.append('g')
        .classed('plot', true)
        .attr('transform', `translate(${plotMargins2.left},${plotMargins2.top})`);

    let plotWidth2 = width - plotMargins2.left - plotMargins2.right;
    let plotHeight2 = height - plotMargins2.top - plotMargins2.bottom;

        var root = {
            key: 'Ferries', values: mapped
        };
        let hierarchy = d3.hierarchy<any>(root, d => d.values);
    let trendsGroup = plotGroup2.append('g');
    let tree = d3.cluster<any>()
        .size([plotHeight, plotWidth])(hierarchy);
    // console.log(tree);
    var dataBound = plotGroup.selectAll('.node')
        .data(tree.descendants().filter(d => d.depth <= 2));
    dataBound
        .exit()
        .remove();
    var enterSelection = dataBound
        .enter()
        .append('g')
        .classed('node', true)
        .attr('transform', (d, i) => `translate(${d.y},${d.x})`);

    enterSelection.append('line')
        .attr('x1', d => d.parent ? d.parent.y - d.y : 0)
        .attr('y1', d => d.parent ? d.parent.x - d.x : 0)
        .attr('x2', d => 0)
        .attr('y2', d => 0)
        .style('stroke', 'darkgray')
    enterSelection.append('circle')
        .attr('r', 2);
    enterSelection.append('text')
        .style('text-anchor', d => d.depth < 2 ? 'end' : 'start')
        .style('font-size', '.7em')
        .style('fill', d => d.depth === 2 ? colorScale(d.data.key) : '')
        .attr('x', d => d.depth < 2 ? -5 : 5)
        .attr('y', 3)
        .text(d => d.data.key);

    var forChart = tree.descendants().filter(d => d.depth === 1)//.map(d => d.data);
    var chartBound = trendsGroup.selectAll('.trend')
        .data(forChart);
    chartBound
        .exit()
        .remove();
    let height = plotHeight2 / forChart.length;
    var cbe = chartBound
        .enter()
        .append('g')
        .classed('trend', true)
        .attr('transform', (d, i) => `translate(${0},${i * height})`);
    cbe.append('rect')
        .style('fill', 'none')
        .style('stroke', 'lightgray')
        .attr('width', plotWidth2)
        .attr('height', height);
    let timeScale = d3.scaleTime()
        .domain(spliced.map(d => new Date(d)))
        .range([0, plotWidth2]);
    let yScale = d3.scaleLinear()
        .range([height, 0]);
    let generator = d3.line<any>()
        .x((d: any) => timeScale(d.date))
        .y((d: any) => yScale(d.value));
    cbe.selectAll('.trace')
        .data(d => d.descendants()
            .filter(d => d.depth === 2)
            .map(desc => {
                return desc.data;
            }))
        .enter()
        .append('path')
        .attr('d', d => {
            yScale.domain([0, d3.max(d.values, v => v.value)]);
            return generator(d.values);
        })
        .style('fill', 'none')
        .style('stroke', d => colorScale(d.key));
}