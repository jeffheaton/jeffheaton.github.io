var XOR_x = [
	[0,0],
	[1,0],
	[0,1],
	[1,1]
];

var XOR_y = [0,1,1,0];

function randomize() {
	w = [];
	for(var i=0;i<9;i++) {
		w.push((Math.random()*2)-1);
	}

	document.getElementById("w1").value = w[0];
	document.getElementById("w2").value = w[1];
	document.getElementById("w3").value = w[2];
	document.getElementById("w4").value = w[3];
	document.getElementById("w5").value = w[4];
	document.getElementById("w6").value = w[5];
	document.getElementById("w7").value = w[6];
	document.getElementById("w8").value = w[7];
	document.getElementById("w9").value = w[8];

	document.getElementById("mse").innerHTML = "mse: "+calculate_mse(w);
	update_roc(w);
}

function calculate(i,w) {
	// Calculate hidden neuron 1
	var sum1 = (i[0]*w[0]) + (i[1]*w[2]) + w[4];
	var n1 = 1.0 / (1.0 + Math.exp(-sum1));
	// Calculate hidden neuron 2
	var sum2 = (i[0]*w[1]) + (i[1]*w[3]) + w[5];
	var n2 = 1.0 / (1.0 + Math.exp(-sum2));
	// Calculate output neuron
	var sum3 = (n1*w[6]) + (n2*w[7]) + w[8];
	return(1.0 / (1.0 + Math.exp(-sum3)));
}

function calculate_mse(w) {
	var d1 = calculate([0,0],w)-0.0;
	var d2 = calculate([1,0],w)-1.0;
	var d3 = calculate([0,1],w)-1.0;
	var d4 = calculate([1,1],w)-0.0;
	return ((d1*d1)+(d2*d2)+(d3*d3)+(d4*d4))/4;
}

function calculate_tp_fp(w,thresh) {
	var tp = 0;
	var fp = 0;
	var tn = 0;
	var fn = 0;

	for(var i=0;i<XOR_x.length;i++) {
		c = calculate(XOR_x[i],w);
		if( c>thresh ) {
			if( XOR_y[i]>0.5 ) {
				tp++;
			} else {
				fp++;
			}
		} else {
			if( XOR_y[i]<0.5 ) {
				tn++;
			} else {
				fn++;
			}
		}
	}
	var tpr = tp/(tp+fn);
	var fpr = fp/(fp+tn);
	return [fpr,tpr];
}

function update_roc(w) {
	var t = [];
	for(var i=0;i<10;i++) {
		t.push(calculate_tp_fp(w,i/10));
	}
	t.sort(function(a,b) { return parseFloat(a[0]) - parseFloat(b[0]) } );


	var data = [];
        data.push(['FP', 'TP']);
	data.push([0,0]);

	var x = 0;
	for(var i=0;i<t.length;i++) {
		data.push(t[i]);
	}
	data.push([1,1]);

	var data = google.visualization.arrayToDataTable(data);

        var options = {
          curveType: 'function',
          legend: { position: 'none' },
	vAxis: {'title': 'True Positive Rate', 'minValue': 0, 'maxValue': 1.0},
	hAxis: {'title': 'False Positive Rate', 'minValue': 0, 'maxValue': 1.0},

        };

        var chart = new google.visualization.LineChart(document.getElementById('roc'));

        chart.draw(data, options);
}


function coolingSchedule(k,kMax,startingTemperature,endingTemperature) {
        var ex = k / kMax;
        return startingTemperature * Math.pow(endingTemperature / startingTemperature, ex);
}

function calcProbability(ecurrent, enew, t) {
	return Math.exp(-(Math.abs(enew - ecurrent) / t));
}


document.addEventListener('DOMContentLoaded', function(){
  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(randomize);
  document.getElementById("calculateButton").addEventListener('click', function(){
	var str = "";
  	var i1 = parseFloat(document.getElementById("i1").value);
	var i2 = parseFloat(document.getElementById("i2").value);
	var w1 = parseFloat(document.getElementById("w1").value);
	var w2 = parseFloat(document.getElementById("w2").value);
	var w3 = parseFloat(document.getElementById("w3").value);
	var w4 = parseFloat(document.getElementById("w4").value);
	var w5 = parseFloat(document.getElementById("w5").value);
	var w6 = parseFloat(document.getElementById("w6").value);
	var w7 = parseFloat(document.getElementById("w7").value);
	var w8 = parseFloat(document.getElementById("w8").value);
	var w9 = parseFloat(document.getElementById("w9").value);

	// Calculate hidden neuron 1
	var sum1 = (i1*w1) + (i2*w3) + w5;
	str += "sum1=("+i1+"*"+w1+")+("+i2+"*"+w3+")+"+w5+"="+sum1+"<br>";

	var n1 = 1.0 / (1.0 + Math.exp(-sum1))
	str += "n1 = 1/(1+exp(-sum1)=" + n1+"<br>";

	document.getElementById("n1").value = n1

	// Calculate hidden neuron 2
	var sum2 = (i1*w2) + (i2*w4) + w6;
	str += "sum2=("+i1+"*"+w2+")+("+i2+"*"+w4+")+"+w6+"="+sum2+"<br>";

	var n2 = 1.0 / (1.0 + Math.exp(-sum2))
	str += "n2 = 1/(1+exp(-sum2)=" + n2+"<br>";

	document.getElementById("n2").value = n2

	// Calculate output neuron
	var sum3 = (n1*w7) + (n2*w8) + w9;
	str += "sum3=("+n1+"*"+w7+")+("+n2+"*"+w8+")+"+w9+"="+sum2+"<br>";

	var o = 1.0 / (1.0 + Math.exp(-sum3))
	str += "n3 = 1/(1+exp(-sum3)=" + o+"<br>";

	document.getElementById("o").value = o


	// Display calculation
	document.getElementById("calculationDisplay").innerHTML = str;

  	});
	document.getElementById("randomizeButton").addEventListener('click', function(){
		randomize();
	});
	document.getElementById("annealButton").addEventListener('click', function(){
		var w = [];
		w.push(parseFloat(document.getElementById("w1").value));
		w.push(parseFloat(document.getElementById("w2").value));
		w.push(parseFloat(document.getElementById("w3").value));
		w.push(parseFloat(document.getElementById("w4").value));
		w.push(parseFloat(document.getElementById("w5").value));
		w.push(parseFloat(document.getElementById("w6").value));
		w.push(parseFloat(document.getElementById("w7").value));
		w.push(parseFloat(document.getElementById("w8").value));
		w.push(parseFloat(document.getElementById("w9").value));

		var best_w = w.slice(0);
		var best_mse = calculate_mse(w);

		for(var i=0;i<100;i++) {
			// Randomize weights
			for(var j=0;j<w.length;j++) {
				w[j] += (Math.random()*0.25)-0.125;
			}

			// Did we improve?
			mse = calculate_mse(w);
			if( mse<best_mse ) {
				best_w = w.slice(0);
			} else {
				var t = coolingSchedule(i, 100, 400, 0.0001);
				var prob = calcProbability(mse,best_mse,t);
				if(prob<Math.random()) {
					// Do not keep
					w = best_w.slice(0);
				}
			}
		}

		document.getElementById("mse").innerHTML = "MSE: "+calculate_mse(w);
		update_roc(w);

		document.getElementById("w1").value = w[0];
		document.getElementById("w2").value = w[1];
		document.getElementById("w3").value = w[2];
		document.getElementById("w4").value = w[3];
		document.getElementById("w5").value = w[4];
		document.getElementById("w6").value = w[5];
		document.getElementById("w7").value = w[6];
		document.getElementById("w8").value = w[7];
		document.getElementById("w9").value = w[8];
	});
});
