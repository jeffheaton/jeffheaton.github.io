function drawFunction(id,f,low,high,inc) {
	var data = [];
        data.push(['x', 'y']);

	var x = low;
	while(x<high) {
		x = x + inc;
		var y = f(x);
		data.push([x,y])
	}

	var data = google.visualization.arrayToDataTable(data);

        var options = {
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById(id));

        chart.draw(data, options);
}

function drawSigmoid() {
	var data = [];
        data.push(['x', 'y']);

	var x = -5;
	while(x<5) {
		x = x + 0.1;
		var y = 1 / (1+Math.exp(-x));
		data.push([x,y])
	}

	var data = google.visualization.arrayToDataTable(data);

        var options = {
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('sigmoid_chart'));

        chart.draw(data, options);
}

function drawTanh() {
	var data = [];
        data.push(['x', 'y']);

	var x = -5;
	while(x<5) {
		x = x + 0.1;
		var y = 1 / (1+Math.exp(-x));
		data.push([x,y])
	}

	var data = google.visualization.arrayToDataTable(data);

        var options = {
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('tanh_chart'));

        chart.draw(data, options);
}

$(document).ready(function(){
	google.setOnLoadCallback(function(){
		drawFunction("sigmoid_chart",function(x){return(1/(1+Math.exp(-x)))},-5.0,5.0,0.1);
		drawFunction("tanh_chart",function(x){return(Math.tanh(x))},-5.0,5.0,0.1);
		drawFunction("linear_chart",function(x){return(x)},-5.0,5.0,0.1);
	});      
});
