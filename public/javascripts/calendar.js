//https://bl.ocks.org/arpitnarechania/4b4aa79b04d2e79f30765674b4c24ace
//Released under the The MIT License.

var today = new Date();
var animDuration =1000,
	min = 0, 
    max=100;
    
function getMaxTrades(data) {
  return data.reduce((max, p) => p.trades > max ? p.trades : max, data[0].trades);
}

//save data to a file (for debug)


d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

d3.selection.prototype.moveToBack = function() { 
    return this.each(function() { 
        var firstChild = this.parentNode.firstChild; 
        if (firstChild) { 
            this.parentNode.insertBefore(this, firstChild); 
        } 
    }); 
};

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function dateParser(str) {
    var y = str.substr(0,4),
        m = str.substr(4,2) - 1,
        d = str.substr(6,2);
    var D = new Date(y,m,d);
    return (D.getFullYear() == y && D.getMonth() == m && D.getDate() == d) ? D : 'invalid date';
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

function prettyDate(dateObj){
	var newObj = new Date(dateObj);
	var day = newObj.getDate();
	var monthIndex = newObj.getMonth();
	var year = newObj.getFullYear();
	var monthNames = ["January", "February", "March","April", "May", "June", "July","August", "September", "October","November", "December"];
	return monthNames[monthIndex]+" "+day+", "+year;
}

function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
}

function getPortfolios() {
    WRITER_USER_ID = "jectselizeddevercelingui"
    WRITER_PASSWORD = "e1036635cf9ed00aec2c1ec2ee3589b2195fa4b7"
    READER_USER_ID = "thureshistontherationeyi"
    READER_PASSWORD = "5863c448737092d933493966915800b4b9bed20e"

    //process.env.CRED_PORTFOLIO_USERID_R;
    //process.env.CRED_PORTFOLIO_PWD_R;
    //process.env.CRED_PORTFOLIO_USERID_W;
    //process.env.CRED_PORTFOLIO_PWD_W;
    BASE_URL = "https://investment-portfolio.mybluemix.net/"

    //get holdings for the portfolio
    console.log('get portfolios');
    $.ajax({
        headers: {
        'Content-Type': 'application/json'
        },
        //data: '{"dataSelector":{"type":"unit test portfolio"}}',
        beforeSend: function(xhr){ 
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(READER_USER_ID + ":" + READER_PASSWORD));
        },
        dataType: "json",
        method: "GET",//"POST",
        url: BASE_URL + 'api/v1/portfolios/',//_find',
        success: portfolioSelect
    });
}

function getPortfolioDates(portfolio) {
    WRITER_USER_ID = "jectselizeddevercelingui"
    WRITER_PASSWORD = "e1036635cf9ed00aec2c1ec2ee3589b2195fa4b7"
    READER_USER_ID = "thureshistontherationeyi"
    READER_PASSWORD = "5863c448737092d933493966915800b4b9bed20e"

    //process.env.CRED_PORTFOLIO_USERID_R;
    //process.env.CRED_PORTFOLIO_PWD_R;
    //process.env.CRED_PORTFOLIO_USERID_W;
    //process.env.CRED_PORTFOLIO_PWD_W;
    BASE_URL = "https://investment-portfolio.mybluemix.net/"

    //get holdings for the portfolio
    console.log('get holdings');
    $.ajax({
        headers: {
        'Content-Type': 'application/json'
        },
        beforeSend: function(xhr){ 
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(READER_USER_ID + ":" + READER_PASSWORD));
        },
        dataType: "json",
        method: "GET",
        url: BASE_URL + 'api/v1/portfolios/'+ portfolio + '/holdings',
        success: getDates
    });
}
function getPortfolioHoldings(portfolio,selected_date) {
    WRITER_USER_ID = "jectselizeddevercelingui"
    WRITER_PASSWORD = "e1036635cf9ed00aec2c1ec2ee3589b2195fa4b7"
    READER_USER_ID = "thureshistontherationeyi"
    READER_PASSWORD = "5863c448737092d933493966915800b4b9bed20e"
    //process.env.CRED_PORTFOLIO_USERID_R;
    //process.env.CRED_PORTFOLIO_PWD_R;
    //process.env.CRED_PORTFOLIO_USERID_W;
    //process.env.CRED_PORTFOLIO_PWD_W;
    BASE_URL = "https://investment-portfolio.mybluemix.net/"

    //get holdings for the portfolio
    console.log('get holdings');
    $.ajax({
        headers: {
        'Content-Type': 'application/json'
        },
        beforeSend: function(xhr){ 
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(READER_USER_ID + ":" + READER_PASSWORD));
        },
        dataType: "json",
        method: "GET",
        url: BASE_URL + 'api/v1/portfolios/'+ portfolio + '/holdings',
        success: function (data){            
            holdings = []
            for(t=0;t<data.holdings.length;t++){
                if(data.holdings[t].hasOwnProperty('timestamp') && sameDay(new Date(data.holdings[t].timestamp),new Date(selected_date))){
                    for(h=0;h<data.holdings[t].holdings.holdings.length;h++){
                        if(data.holdings[t].holdings.holdings[h].quantity>0){
                            orderAction = 'buy'
                        }else if(data.holdings[t].holdings.holdings[h].quantity<0){
                            orderAction = 'sell'
                        }
                        holdings.push({"from":new Date(data.holdings[t].timestamp),"to":addMinutes(new Date(data.holdings[t].timestamp),30),"name":data.holdings[t].holdings.holdings[h].name,"orderAction":orderAction,"quantity":data.holdings[t].holdings.holdings[h].quantity})
                    }
                }
            }
            drawGantt(holdings)
        }
    });
}
function calendarFromHoldings(portfolio){
    d = document.getElementById("portfolioSelect").value;
    if(d != 'loading'){
        getPortfolioDates(d)
    }
}

function portfolioSelect(data){
    select = document.getElementById('portfolioSelect');
    let unique = [...new Set(data.portfolios.map(item => item.name))];
    if(unique.length > 0){
        //$("#portfolioSelect option[value='loading']").remove();
        for (var i = 0; i<=unique.length; i++){
            if(unique[i] != undefined){
                var opt = document.createElement('option');
                opt.value = unique[i];
                opt.innerHTML = unique[i];;
                select.appendChild(opt);
            }
        }
    }
}

function getDates(data){
    //alert(JSON.stringify(data))
    if(data != {}){
        console.log(data)
        //round to nearest day, and reduce to sum of trades per day for calendar heatmap
        try {
            returnArray = data.holdings.map(x => x = {'timestamp' : new Date(new Date(x.timestamp).getFullYear(),new Date(x.timestamp).getMonth(),new Date(x.timestamp).getDate()) ,'trades': x.holdings.holdings.length})
        }catch{
            returnArray = data.holdings.map(x => x = {'timestamp' : new Date(new Date(x.timestamp).getFullYear(),new Date(x.timestamp).getMonth(),new Date(x.timestamp).getDate()) ,'trades': x.holdings.length})
        }
        //Reduce to trades per day
        result = [];
        returnArray.forEach(function (a) {
            if (!this[a.timestamp]) {
                this[a.timestamp] = { timestamp: a.timestamp, trades: 0 };
                result.push(this[a.timestamp]);
            }
            this[a.timestamp].trades += a.trades;
        }, Object.create(null));
    }
    $('#calendar-title').removeClass('hidden')
    $('#calendar-wrapper').removeClass('hidden')
    renderCalendar(result)
}

function renderCalendar(generatedData){
    d3.selectAll("#calendar-wrapper > *").remove();
	var width = $("#calendar-wrapper").width(),
	    height = $("#calendar-wrapper").height(),
        cellSize = parseInt($(window).width()/62),
	    week_days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
	    month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

	var day = d3.time.format("%w"),
	    week = d3.time.format("%U"),
		format = d3.time.format("%Y%m%d");
		parseDate = d3.time.format("%Y%m%d").parse;
			
	var color = d3.scale.linear()
					    .range(["#b5cde1", '#386890'])
					    .domain([0, getMaxTrades(generatedData)])
	    
	var svg = d3.select("#calendar-wrapper").selectAll("svg")
                                            .data(d3.range(parseInt(today.getFullYear()), parseInt(today.getFullYear())+1))
                                            .enter().append("svg")
                                            .attr("width", width)
                                            .attr("height", 250)
                                            .append("g")
                                            .attr("id","total-wrapper")
                                            .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (30) + ")");

	for (var i=0; i<7; i++)
	{    
		svg.append("text")
		   .attr("transform", "translate(8," + cellSize*(i+1) + ")")
		   .style("text-anchor", "end")
		   .attr("dy", "-.25em")
		   .style("stroke","black")
	       .style("font-size","12px")
	       .style("font-weight","100")
		   .text(function(d) { return week_days[i]; }); 
	 }

	var legendWrapper = d3.select("#total-wrapper")
                          .append("g")
                          .attr("id","legend-wrapper")
                          .attr("transform","translate(80,-10)");

	var legend = legendWrapper.selectAll(".legend")
                              .data(month)
                              .enter().append("g")
                              .attr("class", "legend")
                              .attr("transform", function(d, i) { return "translate(" + (((cellSize*4.3)*i)+(width/100)) + ",0)"; });

	legend.append("text")
          .attr("class","month-label")
          .attr("id", function(d,i){ return month[i] })
          .style("text-anchor", "end")
          .style("font-size","12px")
          .style("font-weight","100")
          .style("stroke","black")
          .text(function(d,i){ return month[i] });

	  var nestData = d3.nest()
                       .key(function(d) {return d.timestamp.toDateString();})
                       .rollup(function(d){return d[0].trades})
                       .map(generatedData);

	var rectWrapper = d3.select("#total-wrapper")
						.append("g")
						.attr("id","blocks-wrapper")
						.attr("transform","translate(30,0)");

	var rect = rectWrapper.selectAll(".day")
                          .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d, month.length, 1)); })
                          .enter()
                          .append("rect")
                          .attr("class", "day")
                          .attr("width", cellSize)
                          .attr("height", cellSize)
                          .attr("x", function(d) { return week(d) * cellSize; })
                          .attr("y", function(d) { return day(d) * cellSize; })
                          .style("fill","#000000")
                          .style("opacity","0.25")
                          .attr("id",function(d){return "box-id-"+d.toDateString().replaceAll(" ","");})
                          .attr("data-value", function(d){return nestData[d.toDateString()];})
                          .attr("data-date",function(d){return d;})
                          .attr("data-fill","#000000")
                          .attr("data-opacity","0.25")
                          .datum(format)
                          .on("click", clickedDay);

	animateColorTransition(color,nestData);

	//Draws the month boundaries
	rectWrapper.selectAll(".month")
	    .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d, month.length, 1)); })
	    .enter().append("path")
	    .attr("class", "month-path")
	    .attr("id", function(d,i){ return month[i] })
	    .attr("d", monthPath);

	function monthPath(t0) {
	  var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
	      d0 = +day(t0), w0 = +week(t0),
	      d1 = +day(t1), w1 = +week(t1);
	  return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
	      + "H" + w0 * cellSize + "V" + 7 * cellSize
	      + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
	      + "H" + (w1 + 1) * cellSize + "V" + 0
	      + "H" + (w0 + 1) * cellSize + "Z";
	}
}

function animateColorTransition(color,nestData){
	d3.selectAll(".day")
		.transition()
		.duration(animDuration)
		.delay(function(d,i){return i*6;})
		.style("fill", function(d) {
	    	return (color(nestData[dateParser(d).toDateString()])!=="#NaNNaNNaN")?
	    		color(nestData[dateParser(d).toDateString()]) :
	    		"#000000";
	    })
	    .attr("data-fill",function(d){
	    	return (color(nestData[dateParser(d).toDateString()])!=="#NaNNaNNaN")?
	    		 color(nestData[dateParser(d).toDateString()]) :
	    		 "#000000";
	    })
	    .style("opacity",function(d){
	    	return (color(nestData[dateParser(d).toDateString()])!=="#NaNNaNNaN")? 
	    		 "1":
	    		 "0.25";
	    })
	    .attr("data-opacity",function(d){
			return (color(nestData[dateParser(d).toDateString()])!=="#NaNNaNNaN")? 
	    		 "1":
	    		 "0.25";
	    });
}

function clickedDay(d){
	d3.selectAll(".day")
	   .transition()
	   .duration(animDuration/3)
	   .style("fill",function(d){
			var boxData = $("#box-id-"+dateParser(d).toDateString().replaceAll(" ","")).data();
			var sel = d3.select(this);
				sel.moveToBack();
			return boxData.fill;
		})
		.style("opacity",function(d){
			var boxData = $("#box-id-"+dateParser(d).toDateString().replaceAll(" ","")).data();
			return boxData.opacity;
		});

	var sel =d3.select(this);
	sel.moveToFront();

	d3.select("#box-id-"+dateParser(d).toDateString().replaceAll(" ",""))
		.transition()
		.duration(animDuration/3)
		.style("fill","#82B446")
		.style("opacity","1");

	var boxData = $("#box-id-"+dateParser(d).toDateString().replaceAll(" ","")).data();
	if(boxData.value !== undefined){
        d3.selectAll("#gantt > *").remove();
        $("#gantt").show()
        $("#gantt").append("<br><h2 id='gantt-title'>There were " +boxData.value + " trades placed on " + prettyDate(boxData.date)+":</h2>\n " );
        d = document.getElementById("portfolioSelect").value
        getPortfolioHoldings(d,boxData.date)
	}
	else{
        $("#calendar-click-info").text("No trades were made on "+prettyDate(boxData.date));
        $("#gantt").hide()
	}
}

function drawGantt(data){

    var margin = {top: 50, right: 50, bottom: 50, left: 150},
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var y = d3.scale.ordinal()
        .rangeRoundBands([0, height], .2);

    var x = d3.time.scale().range([0, width]);

    y.domain(data.map(function(d) { return d.name; }));
    //round to nearest day
    x.domain([new Date(data[0].from.getFullYear(),data[0].from.getMonth(),data[0].from.getDate()),d3.time.day.offset(new Date(data[0].from.getFullYear(),data[0].from.getMonth(),data[0].from.getDate()), +1)]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.time.format("%H:%M"));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var svg = d3.select("#gantt").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .append("text")
          .attr("x", width-margin.right)
          .attr("dx", ".71em")
          .attr("dy", "-0.2em")
          .text("Date");

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      svg.selectAll(".buy")
          .data(data)
          .enter().append("rect")
          .attr("class", "buy")
          .attr("y", function(d) { return y(d.name); })
          .attr("height", y.rangeBand())
          .attr("x", function(d) { return x(d.from); })
          .attr("width", function(d) { return x(d.to) - x(d.from)});

		var tooltip = d3.select("#gantt")
		.append('div')
		.attr('class', 'tooltip');

		tooltip.append('div').attr('class', 'name');
		tooltip.append('div').attr('class', 'tempRange');
		tooltip.append('div').attr('class', 'orderAction');

		svg.selectAll(".buy,.sell")
		.on('mouseover', function(d) {

			tooltip.select('.name').html("<b>" + d.name + "</b>");
			tooltip.select('.tempRange').html(d.from.getHours() + ":" + d.from.getMinutes());
			tooltip.select('.orderAction').html(d.orderAction + ": " + d.quantity);

			tooltip.style('display', 'block');
			tooltip.style('opacity',2);

		})
		.on('mousemove', function(d) {
			tooltip.style('top', (d3.event.layerY + 10) + 'px')
			.style('left', (d3.event.layerX - 25) + 'px');
		})
		.on('mouseout', function() {
			tooltip.style('display', 'none');
			tooltip.style('opacity',0);
		});
}

$(document).ready(function() {
    getPortfolios()
});