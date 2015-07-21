// D3 for topDetail.html

var width = 500;
var height = 200;

var svg = d3.select("svg");

var circle = svg.selectAll("circle")
  .data([10,10,10]);

var force = d3.layout.force()
      .nodes(circle)
      .size([width, height])
      .gravity(.02)
      .charge(-50)
      .on("tick", tick)
      .start();

var cirlceEnter = circle.enter().append("circle");

circle.attr("cx", function(d, i) { return i * 100 + 30; })
  .attr("cy", function(d, i) { return i * 70 + 10; })
  .attr("r", function(d, i) { return 5; });

/****** Handle ticks and collisions ******/

function tick(e) {
  // was node
  circle
      /*.each(cluster(10 * e.alpha * e.alpha))*/
      .each(collide(.5))
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
};

// Move d to be adjacent to the cluster node.
function cluster(alpha) {
  return function(d) {
    var cluster = clusters[d.cluster];
    if (cluster === d) return;
    var x = d.x - cluster.x;
    var y = d.y - cluster.y;
    var l = Math.sqrt(x * x + y * y);
    var r = d.radius + cluster.radius;
    if (l != r) {
      l = (l - r) / l * alpha;
      d.x -= x *= l;
      d.y -= y *= l;
      cluster.x += x;
      cluster.y += y;
    }
  };
};

// Resolves collisions between d and all other circles.


// issue: because circle is just 10, 10, 10
// there is no x and y tracking
// this is why you need that nodes setup

function collide(alpha) {
  var quadtree = d3.geom.quadtree(circle);
  return function(d) {
    var r = d.r + 5, //+ maxRadius + Math.max(padding, clusterPadding),
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            ra = /*d.radius*/ 10 + quad.point.r; //+ (d.cluster === quad.point.cluster ? padding : clusterPadding);
        if (l < ra) {
          console.log('asdf');
          l = (l - ra) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
};

