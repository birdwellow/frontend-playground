var d3 = require('d3');

function start() {
    var svg = d3.select('svg')
        .attr('width', 960)
        .attr('height', 500);

    var g = svg.append('g');
    g.selectAll('circle')
        .data([32,8,26,12,9,2,34])
        .enter().append('circle')
        .attr('transform', function() {
            return 'translate(' + Math.random() * 100 + 200 + ',' + Math.random() * 50 + ')';
        })
        .style('fill', function() {
            return 'hsl(' + Math.random() * 360 + ',100%,50%)';
        })
        .attr('r', function (d) {
            return d;
        });

        // .selectAll('#drawing-area')
        // .data([4, 8, 15, 16, 23, 42])
        // .enter().append('div')
        //
        // .style('background', function() {
        //     return 'hsl(' + Math.random() * 360 + ',100%,50%)';
        // })
        // .style('width', function (d) {
        //     return d + 'px';
        // })
        // .style('height', function (d) {
        //     return d + 'px';
        // })
        // .style('position', 'absolute')
        // .style('margin', function (d) {
        //     return d + 'px 0 0 ' + d + 'px';
        // });
}

start();
