var d3 = require('d3');
var shapeData = require('./shapeData.json');

function start() {
    var svg = d3.select('svg')
        .attr('width', 960)
        .attr('height', 500);

    var g = svg.selectAll("g")
        .data(shapeData)
        .enter()
        .append("g")
        .attr("class", "groups");

    g.append("path")
        .attr("d", function (country) {
            return country.svgData;
        });
    g.append("text")
        .text(function (country) {
            return country.name;
        })
        .attr("x", function (d) {
            return d.center.x;
        })
        .attr("y", function (d) {
            return d.center.y;
        });

    g.on('click', function (data) {
        data.selected = !data.selected;
        update();
    });

    var update = function () {
        g.data(shapeData);

        g.attr('class', function (country) {
            return country.selected ? 'groups selected' : 'groups';
        });

        g.selectAll("path")
            .attr("d", function (country) {
                return country.svgData;
            });
        g.selectAll("text")
            .text(function (country) {
                return country.name;
            })
            .attr("x", function (d) {
                return d.center.x;
            })
            .attr("y", function (d) {
                return d.center.y;
            });
    };

    //svg.attr("transform", "scale(2)");
}

start();
