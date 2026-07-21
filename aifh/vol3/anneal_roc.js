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

	$("#w1").val(w[0]);
	$("#w2").val(w[1]);
	$("#w3").val(w[2]);
	$("#w4").val(w[3]);
	$("#w5").val(w[4]);
	$("#w6").val(w[5]);
	$("#w7").val(w[6]);
	$("#w8").val(w[7]);
	$("#w9").val(w[8]);

	$("#mse").html("mse: "+calculate_mse(w));
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


$(document).ready(function(){
  randomize();
  $("#calculateButton").click(function(){
	var str = "";
  	var i1 = parseFloat($("#i1").val());
	var i2 = parseFloat($("#i2").val());
	var w1 = parseFloat($("#w1").val());
	var w2 = parseFloat($("#w2").val());
	var w3 = parseFloat($("#w3").val());
	var w4 = parseFloat($("#w4").val());
	var w5 = parseFloat($("#w5").val());
	var w6 = parseFloat($("#w6").val());
	var w7 = parseFloat($("#w7").val());
	var w8 = parseFloat($("#w8").val());
	var w9 = parseFloat($("#w9").val());

	// Calculate hidden neuron 1
	var sum1 = (i1*w1) + (i2*w3) + w5;
	str += "sum1=("+i1+"*"+w1+")+("+i2+"*"+w3+")+"+w5+"="+sum1+"<br>";

	var n1 = 1.0 / (1.0 + Math.exp(-sum1))
	str += "n1 = 1/(1+exp(-sum1)=" + n1+"<br>";

	$("#n1").val(n1)

	// Calculate hidden neuron 2
	var sum2 = (i1*w2) + (i2*w4) + w6;
	str += "sum2=("+i1+"*"+w2+")+("+i2+"*"+w4+")+"+w6+"="+sum2+"<br>";

	var n2 = 1.0 / (1.0 + Math.exp(-sum2))
	str += "n2 = 1/(1+exp(-sum2)=" + n2+"<br>";

	$("#n2").val(n2)

	// Calculate output neuron
	var sum3 = (n1*w7) + (n2*w8) + w9;
	str += "sum3=("+n1+"*"+w7+")+("+n2+"*"+w8+")+"+w9+"="+sum2+"<br>";

	var o = 1.0 / (1.0 + Math.exp(-sum3))
	str += "n3 = 1/(1+exp(-sum3)=" + o+"<br>";

	$("#o").val(o)


	// Display calculation
	$("#calculationDisplay").html(str);

  	});
	$("#randomizeButton").click(function(){
		randomize();
	});
	$("#annealButton").click(function(){
		var w = [];
		w.push(parseFloat($("#w1").val()));
		w.push(parseFloat($("#w2").val()));
		w.push(parseFloat($("#w3").val()));
		w.push(parseFloat($("#w4").val()));
		w.push(parseFloat($("#w5").val()));
		w.push(parseFloat($("#w6").val()));
		w.push(parseFloat($("#w7").val()));
		w.push(parseFloat($("#w8").val()));
		w.push(parseFloat($("#w9").val()));
		
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

		$("#mse").html("MSE: "+calculate_mse(w));
		update_roc(w);

		parseFloat($("#w1").val(w[0]));
		parseFloat($("#w2").val(w[1]));
		parseFloat($("#w3").val(w[2]));
		parseFloat($("#w4").val(w[3]));
		parseFloat($("#w5").val(w[4]));
		parseFloat($("#w6").val(w[5]));
		parseFloat($("#w7").val(w[6]));
		parseFloat($("#w8").val(w[7]));
		parseFloat($("#w9").val(w[8]));
	});
});
