// original code written by : https://bl.ocks.org/sarafec/cad29ff9a6702c22c83ce561abe46796


/* Javascript dropdown button in menu*/

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



// let svg = d3.select("svg"),
// 	margin = {top: 50, right: 50, bottom: 40, left: 80},
// 	width = svg.attr("width") - margin.left - margin.right,
// 	height = svg.attr("height") - margin.top - margin.bottom,
// 	g = svg.append("g").attr("transform", "translate(" + margin.left + "," +margin.top + ")");
// In work: redraw function to fit to the screen size

var svgDiv = document.getElementById('svg');
var html = d3.select()
var svg = d3.select(svgDiv).append('svg'),
	margin = {top: 50, right: 50, bottom: 40, left: 80},
	g = svg.append("g").attr("transform", "translate(" + margin.left + "," + 0 + ")");

function redraw(){

	var width = svgDiv.clientWidth;
    var height = svgDiv.clientHeight;

    console.log(svgDiv.clientHeight)

	svg
		.attr("width", width)
		.attr("height", height);

	return { width:width, height:height };

};

var redraw =  redraw();

// define tooltip




//define scales
let x = d3.scaleLinear().rangeRound([0, redraw.width - 100]),
  y = d3.scaleBand().rangeRound([redraw.height - 100, 0]).padding(0.2);

//load data
d3.tsv("data.tsv", function(d){
  d.avgprice = +d.avgprice;
  return d;
}, function (error, data) {
  if(error) throw error;

//sort data
data.sort(function(a,b) { return a.avgprice - b.avgprice; });

//define domains based on data
x.domain([0, d3.max(data, function(d) { return d.avgprice; })]);
y.domain(data.map(function(d) { return d.station; }));


translate_y = redraw.height - 100
translate_x = redraw.width - 150
//append x axis to svg
g.append("g")
	.attr("class", "x-axis")
	.attr("transform", "translate(0," +  translate_y  + ")")
	.call(d3.axisBottom(x))
	.append("text")
	.attr("y", 30)
	.attr("x", translate_x)
	.attr("dy", "0.5em")
	.style("fill", "black")
	.text("Price in RMB");

//append y axis to svg
g.append("g")
	.attr("class", "y-axis")
	.call(d3.axisLeft(y));

//append rects to svg based on data
g.selectAll(".bar")
	.data(data)
	.enter()
	.append("rect")
		.attr("class", "bar")
		.style("fill", "#E24E24")
		.attr("transform", "translate(0, 0)")
		.attr("width", 0)
		.attr("x", 1)
		.attr("y", function(d) { return y(d.station); })
		.attr("height", y.bandwidth())
		.transition()
		.duration(1500)
		.delay(function(d,i){ return i*100})
		.attr("width", function(d) { return x(d.avgprice); });
		
g.selectAll('rect')
	.on("mouseover", function() { 
		d3.select(this)
			.style('fill','#9E3619')
		})
	.on("mouseout", function() { 
		d3.select(this)
			.style("fill", '#E24E24')
		});

// g.selectAll('rect')
// 	.on("mouseover", function() { tooltip.style("display", null); })
//     .on("mouseout", function() { tooltip.style("display", "none"); });

});

var tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none");
      
  tooltip.append("rect")
    .attr("width", 60)
    .attr("height", 20)
    .attr("fill", "white")
    .style("opacity", 0.5);

  tooltip.append("text")
    .attr("x", 30)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");

// window.addEventListener("resize", redraw())