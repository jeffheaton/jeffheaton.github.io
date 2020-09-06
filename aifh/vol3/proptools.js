var XOR_x = [
	[0,0],
	[1,0],
	[0,1],
	[1,1]
];

var XOR_y = [0,1,1,0];
var PRECISION = 0.000001;

/**
 * The POSITIVE ETA value. This is specified by the resilient propagation
 * algorithm. This is the percentage by which the deltas are increased by if
 * the partial derivative is greater than zero.
 */
var POSITIVE_ETA = 1.2;

/**
 * The NEGATIVE ETA value. This is specified by the resilient propagation
 * algorithm. This is the percentage by which the deltas are increased by if
 * the partial derivative is less than zero.
 */
var NEGATIVE_ETA = 0.5;

/**
 * The minimum delta value for a weight matrix value.
 */
var DELTA_MIN = 1e-6;

/**
 * The maximum amount a delta can reach.
 */
var MAX_STEP = 50;



function sign(x) {
    if (Math.abs(x) < PRECISION) {
        return 0;
    } else if (x > 0) {
        return 1;
    } else {
        return -1;
    }
};

function randomize() {
	w = [];
	for(var i=0;i<9;i++) {
		w.push((Math.random()*2)-1);
	}

	$("#w0").val(w[0]);
	$("#w1").val(w[1]);
	$("#w2").val(w[2]);
	$("#w3").val(w[3]);
	$("#w4").val(w[4]);
	$("#w5").val(w[5]);
	$("#w6").val(w[6]);
	$("#w7").val(w[7]);
	$("#w8").val(w[8]);

	$("#mse").html("mse: "+calculate_mse(w));
}

function calculate(i,w) {
	// Calculate hidden neuron 1
	var sum1 = (i[0]*w[3]) + (i[1]*w[4]) + w[5];
	var n1 = 1.0 / (1.0 + Math.exp(-sum1));
	// Calculate hidden neuron 2
	var sum2 = (i[0]*w[6]) + (i[1]*w[7]) + w[8];
	var n2 = 1.0 / (1.0 + Math.exp(-sum2));
	// Calculate output neuron
	var sum3 = (n1*w[0]) + (n2*w[1]) + w[2];
	return(1.0 / (1.0 + Math.exp(-sum3)));
}

function calculate_display() {
	var str = "";
  	var i1 = parseFloat($("#i1").val());
	var i2 = parseFloat($("#i2").val());
	var w0 = parseFloat($("#w0").val());
	var w1 = parseFloat($("#w1").val());
	var w2 = parseFloat($("#w2").val());
	var w3 = parseFloat($("#w3").val());
	var w4 = parseFloat($("#w4").val());
	var w5 = parseFloat($("#w5").val());
	var w6 = parseFloat($("#w6").val());
	var w7 = parseFloat($("#w7").val());
	var w8 = parseFloat($("#w8").val());
	
	// Calculate hidden neuron 1
	var sum1 = (i1*w3) + (i2*w4) + w5;
	str += "sum1=("+i1+"*"+w3+")+("+i2+"*"+w4+")+"+w5+"="+sum1+"<br>";

	var n1 = 1.0 / (1.0 + Math.exp(-sum1))
	str += "n1 = 1/(1+exp(-sum1)=" + n1+"<br>";

	$("#n1").val(n1)

	// Calculate hidden neuron 2
	var sum2 = (i1*w6) + (i2*w7) + w8;
	str += "sum2=("+i1+"*"+w6+")+("+i2+"*"+w7+")+"+w8+"="+sum2+"<br>";

	var n2 = 1.0 / (1.0 + Math.exp(-sum2))
	str += "n2 = 1/(1+exp(-sum2)=" + n2+"<br>";

	$("#n2").val(n2)

	// Calculate output neuron
	var sum3 = (n1*w0) + (n2*w1) + w2;
	str += "sum3=("+n1+"*"+w1+")+("+n2+"*"+w2+")+"+w3+"="+sum3+"<br>";

	var o = 1.0 / (1.0 + Math.exp(-sum3))
	str += "n3 = 1/(1+exp(-sum3)=" + o+"<br>";

	$("#o").val(o)

	// Display calculation
	$("#calculationDisplay").html(str);
}

function calculate_mse(w) {
	var d1 = calculate([0,0],w)-0.0;
	var d2 = calculate([1,0],w)-1.0;
	var d3 = calculate([0,1],w)-1.0;
	var d4 = calculate([1,1],w)-0.0;
	return ((d1*d1)+(d2*d2)+(d3*d3)+(d4*d4))/4;
}

function sigmoid(x) {
	return(1/(1+Math.exp(-x)));
}

function dSigmoid(x) {
	return(sigmoid(x)*(1-sigmoid(x)));
}

function round(d) {
	return(Math.round(d*100000)/100000);
}

function calcGradients(w,input,expected) {
	var output = "";
	output+="Training " + input + " to produce " + expected + "<br>";
	output+="<b>Feedforward: Calculate neural network output</b><br>";
	
	// Calculate hidden neuron 1
	var sum1 = (input[0]*w[3]) + (input[1]*w[4]) + w[5];
	output += "sum1=("+input[0]+"*"+w[3]+")+("+input[1]+"*"+w[4]+")+"+w[5]+"="+sum1+"<br>";

	var n1 = 1.0 / (1.0 + Math.exp(-sum1))
	output += "n1 = 1/(1+exp(-sum1)=" + n1+"<br>";

	$("#n1").val(n1)

	// Calculate hidden neuron 2
	var sum2 = (input[0]*w[6]) + (input[1]*w[7]) + w[8];
	output += "sum2=("+input[0]+"*"+w[6]+")+("+input[1]+"*"+w[7]+")+"+w[8]+"="+sum2+"<br>";

	var n2 = 1.0 / (1.0 + Math.exp(-sum2))
	output += "n2 = 1/(1+exp(-sum2)=" + n2+"<br>";

	$("#n2").val(n2)

	// Calculate output neuron
	var sum3 = (n1*w[0]) + (n2*w[1]) + w[2];
	output += "sum3=("+n1+"*"+w[0]+")+("+n2+"*"+w[1]+")+"+w[2]+"="+sum3+"<br>";

	var o = 1.0 / (1.0 + Math.exp(-sum3))
	output += "n3 = 1/(1+exp(-sum3)=" + o+"<br>";

	$("#o").val(o)

	output+="<b>Backpropagation</b><br>";
	output+="Note: sigmoid(x)=1/(1+exp(-x))<br>";
	output+="Note: dSigmoid(x)=sigmoid(x)*(1-sigmoid(x))<br>";
	o = calculate(input,w);
	output+="Currently, " + input + " produces output: " + o + "<br>";
	output+="Calculate: E = actual-ideal<br>";
	e = o - expected;
	output+="(" + o + "-" + expected + ")=" + e + "<br>";
	
	output+="<b>Backpropagation: Calculate Node (neuron) Deltas</b><br>";
	output+="<u>Calculate Node Delta For: O1</u><br>";
	output+="o1_nd = -e * dSigmoid(sum3)<br>";
	var o1nd = -e * dSigmoid(sum3);
	output+="o1_nd = " + (-e) + "*" + dSigmoid(sum3) + "=" + o1nd + "<br>";
	output+="<u>Calculate Node Delta For: H1</u><br>";
	var h1nd = dSigmoid(sum1)*o1nd*w[0];
	output+="h1_nd = dSigmoid(sum1) * (weight H1->O1) * o1nd<br>";
	output+="h1_nd = " + dSigmoid(sum1) + "*" + o1nd + "*" + w[0]+ "=" + h1nd+"<br>";
	output+="<u>Calculate Node Delta For: H2</u><br>";
	var h2nd = dSigmoid(sum2)*o1nd*w[1];
	output+="h2_nd = dSigmoid(sum2) * (weight H2->O1) * o1nd<br>";
	output+="h2_nd = " + dSigmoid(sum2) + "*" + o1nd + "*" + w[1]+ "=" + h2nd + "<br>";
	
	var g = Array.apply(null, new Array(9)).map(Number.prototype.valueOf,0);
	
	output+="<b>Backpropagation: Calculate Gradients</b><br>";
	g[0] = n1 * o1nd;
	output+="g(H1 to O1)=h1*o1_nd="+n1+"*"+o1nd+"= "+g[0]+"<br>";
	g[1] = n2 * o1nd;
	output+="g(H2 to O1)=h2*o1_nd="+n2+"*"+o1nd+"= "+g[1]+"<br>";
	g[2] = o1nd;
	output+="g(bias to O1)=1*o1_nd=1*"+o1nd+"= "+g[2]+"<br>";
	
	g[3] = input[0] * h1nd;
	output+="g(I1 to H1)=i1*h1_nd="+input[0]+"*"+h1nd+"= "+g[3]+"<br>";
	g[4] = input[1] * h1nd;
	output+="g(I2 to H1)=i2*h1_nd="+input[1]+"*"+h1nd+"= "+g[4]+"<br>";
	g[5] = h1nd;
	output+="g(bias to H1)=1*h1_nd=1*"+h1nd+"= "+g[5]+"<br>";
	
	g[6] = input[0] * h2nd;
	output+="g(I1 to H2)=i1*h2_nd="+input[0]+"*"+h2nd+"= "+g[6]+"<br>";
	g[7] = input[1] * h2nd;
	output+="g(I2 to H2)=i2*h2_nd="+input[1]+"*"+h2nd+"= "+g[7]+"<br>";
	g[8] = h2nd;
	output+="g(bias to H2)=1*h2_nd=1*"+h1nd+"= "+g[8]+"<br>";
	
	// tables
	table_html = "<table><tr><th>Node</th><th>Sum</th><th>Output</th><th>Node Delta</th><tr>";
	table_html+= "<tr><td>Output 1</td><td>"+round(sum3)+"</td><td>"+round(o)+"</td><td>"+round(o1nd)+"</td></tr>";
	table_html+= "<tr><td>Hidden 1</td><td>"+round(sum1)+"</td><td>"+round(n1)+"</td><td>"+round(h1nd)+"</td></tr>";
	table_html+= "<tr><td>Hidden 2</td><td>"+round(sum2)+"</td><td>"+round(n2)+"</td><td>"+round(h2nd)+"</td></tr>";
	table_html+= "</table>";
	
	return [g,table_html+output];
}

function trainOnline(input,expected,prev_delta) {
	var w = [];
	w.push(parseFloat($("#w0").val()));
	w.push(parseFloat($("#w1").val()));
	w.push(parseFloat($("#w2").val()));
	w.push(parseFloat($("#w3").val()));
	w.push(parseFloat($("#w4").val()));
	w.push(parseFloat($("#w5").val()));
	w.push(parseFloat($("#w6").val()));
	w.push(parseFloat($("#w7").val()));
	w.push(parseFloat($("#w8").val()));
	
	var lr = parseFloat($("#lr").val());
	var mom = parseFloat($("#m").val());
	
	result = calcGradients(w,input,expected);
	g = result[0];
	output = result[1];
	
	var lr = parseFloat($("#lr").val());
	
	delta = [];
	for(var i=0;i<g.length;i++) {
		delta.push( (g[i]*lr) + (prev_delta[i]*mom) );
	}

	// Display MSE
	$("#mse").html("MSE: "+calculate_mse(w));

	for(var i=0;i<delta.length;i++) {
		w[i]+=delta[i];
		prev_delta[i] = delta[i];
	}

	// Display weights
	parseFloat($("#w0").val(w[0]));
	parseFloat($("#w1").val(w[1]));
	parseFloat($("#w2").val(w[2]));
	parseFloat($("#w3").val(w[3]));
	parseFloat($("#w4").val(w[4]));
	parseFloat($("#w5").val(w[5]));
	parseFloat($("#w6").val(w[6]));
	parseFloat($("#w7").val(w[7]));
	parseFloat($("#w8").val(w[8]));
	
	table_html= "<table><tr><th>Connection</th><th>Gradient</th><th>Old Weight</th><th>Delta</th><th>Previous Delta</th><th>New Weight</th></tr>";
	table_html+= "<tr><td>0: H1->O1</td><td>"+round(g[0])+"</td><td>"+round(w[0])+"</td><td>"+round(delta[0])+"</td><td>"+round(prev_delta[0])+"</td><td>"+round(w[0]+delta[0])+"</td></tr>";
	table_html+= "<tr><td>1: H2->O1</td><td>"+round(g[1])+"</td><td>"+round(w[1])+"</td><td>"+round(delta[1])+"</td><td>"+round(prev_delta[1])+"</td><td>"+round(w[1]+delta[1])+"</td></tr>";
	table_html+= "<tr><td>2: B2->O1</td><td>"+round(g[2])+"</td><td>"+round(w[2])+"</td><td>"+round(delta[2])+"</td><td>"+round(prev_delta[2])+"</td><td>"+round(w[2]+delta[2])+"</td></tr>";
	table_html+= "<tr><td>3: I1->H1</td><td>"+round(g[3])+"</td><td>"+round(w[3])+"</td><td>"+round(delta[3])+"</td><td>"+round(prev_delta[3])+"</td><td>"+round(w[3]+delta[3])+"</td></tr>";
	table_html+= "<tr><td>4: I2->H1</td><td>"+round(g[4])+"</td><td>"+round(w[4])+"</td><td>"+round(delta[4])+"</td><td>"+round(prev_delta[4])+"</td><td>"+round(w[4]+delta[4])+"</td></tr>";
	table_html+= "<tr><td>5: B1->H1</td><td>"+round(g[5])+"</td><td>"+round(w[5])+"</td><td>"+round(delta[5])+"</td><td>"+round(prev_delta[5])+"</td><td>"+round(w[5]+delta[5])+"</td></tr>";
	table_html+= "<tr><td>6: I1->H2</td><td>"+round(g[6])+"</td><td>"+round(w[6])+"</td><td>"+round(delta[6])+"</td><td>"+round(prev_delta[6])+"</td><td>"+round(w[6]+delta[6])+"</td></tr>";
	table_html+= "<tr><td>7: I2->H2</td><td>"+round(g[7])+"</td><td>"+round(w[7])+"</td><td>"+round(delta[7])+"</td><td>"+round(prev_delta[7])+"</td><td>"+round(w[7]+delta[7])+"</td></tr>";
	table_html+= "<tr><td>8: B1->H2</td><td>"+round(g[8])+"</td><td>"+round(w[8])+"</td><td>"+round(delta[8])+"</td><td>"+round(prev_delta[8])+"</td><td>"+round(w[8]+delta[8])+"</td></tr>";
	table_html+= "</table>";
	
				
	// Display calculation
	$("#calculationDisplay").html(table_html+output);
}

function trainBatch(prev_delta) {
	var w = [];
	w.push(parseFloat($("#w0").val()));
	w.push(parseFloat($("#w1").val()));
	w.push(parseFloat($("#w2").val()));
	w.push(parseFloat($("#w3").val()));
	w.push(parseFloat($("#w4").val()));
	w.push(parseFloat($("#w5").val()));
	w.push(parseFloat($("#w6").val()));
	w.push(parseFloat($("#w7").val()));
	w.push(parseFloat($("#w8").val()));
	
	var lr = parseFloat($("#lr").val());
	var mom = parseFloat($("#m").val());
	var output = "";
	
	batch_g = [0,0,0,0,0,0,0,0,0]
	
	for(var t=0;t<XOR_x.length;t++) {
		output+="<h3>Training Element #"+(t+1)+"</h3>";
		var x = XOR_x[t];
		var y = XOR_y[t];
	
		result = calcGradients(w,x,y);
		g = result[0];
		
		for(var i=0;i<g.length;i++) {
			batch_g[i]+=g[i]
		}
		
		output+= "<table><tr><th>Connection</th><th>Gradient</th><th>Sum of Gradients So Far</th></tr>";
		output+= "<tr><td>0: H1->O1</td><td>"+round(g[0])+"</td><td>"+round(batch_g[0])+"</td></tr>";
		output+= "<tr><td>1: H2->O1</td><td>"+round(g[1])+"</td><td>"+round(batch_g[1])+"</td></tr>";
		output+= "<tr><td>2: B2->O1</td><td>"+round(g[2])+"</td><td>"+round(batch_g[2])+"</td></tr>";
		output+= "<tr><td>3: I1->H1</td><td>"+round(g[3])+"</td><td>"+round(batch_g[3])+"</td></tr>";
		output+= "<tr><td>4: I2->H1</td><td>"+round(g[4])+"</td><td>"+round(batch_g[4])+"</td></tr>";
		output+= "<tr><td>5: B1->H1</td><td>"+round(g[5])+"</td><td>"+round(batch_g[5])+"</td></tr>";
		output+= "<tr><td>6: I1->H2</td><td>"+round(g[6])+"</td><td>"+round(batch_g[6])+"</td></tr>";
		output+= "<tr><td>7: I2->H2</td><td>"+round(g[7])+"</td><td>"+round(batch_g[7])+"</td></tr>";
		output+= "<tr><td>8: B1->H2</td><td>"+round(g[8])+"</td><td>"+round(batch_g[8])+"</td></tr>";
		output+= "</table>";
		
		output += result[1];
	}
	
	delta = [];
	for(var i=0;i<batch_g.length;i++) {
		delta.push( (batch_g[i]*lr) + (prev_delta[i]*mom) );
	}
	
	w2 = [];
	for(var i=0;i<batch_g.length;i++) {
		w2.push(delta[i]+w[i]);
	}
	
	output+="<h3>Weight Update</h3>";
	output+= "<table><tr><th>Connection</th><th>Gradient(batch)</th><th>Weight</th><th>Delta</th><th>Prev. Delta</th><th>New Weight</th></tr>";
	output+= "<tr><td>0: H1->O1</td><td>"+round(batch_g[0])+"</td><td>"+round(w[0])+"</td><td>"+round(delta[0])+"</td><td>"+round(prev_delta[0])+"</td><td>"+round(w2[0])+"</td></tr>";
	output+= "<tr><td>1: H2->O1</td><td>"+round(batch_g[1])+"</td><td>"+round(w[1])+"</td><td>"+round(delta[1])+"</td><td>"+round(prev_delta[1])+"</td><td>"+round(w2[1])+"</td></tr>";
	output+= "<tr><td>2: B2->O1</td><td>"+round(batch_g[2])+"</td><td>"+round(w[2])+"</td><td>"+round(delta[2])+"</td><td>"+round(prev_delta[2])+"</td><td>"+round(w2[2])+"</td></tr>";
	output+= "<tr><td>3: I1->H1</td><td>"+round(batch_g[3])+"</td><td>"+round(w[3])+"</td><td>"+round(delta[3])+"</td><td>"+round(prev_delta[3])+"</td><td>"+round(w2[3])+"</td></tr>";
	output+= "<tr><td>4: I2->H1</td><td>"+round(batch_g[4])+"</td><td>"+round(w[4])+"</td><td>"+round(delta[4])+"</td><td>"+round(prev_delta[4])+"</td><td>"+round(w2[4])+"</td></tr>";
	output+= "<tr><td>5: B1->H1</td><td>"+round(batch_g[5])+"</td><td>"+round(w[5])+"</td><td>"+round(delta[5])+"</td><td>"+round(prev_delta[5])+"</td><td>"+round(w2[5])+"</td></tr>";
	output+= "<tr><td>6: I1->H2</td><td>"+round(batch_g[6])+"</td><td>"+round(w[6])+"</td><td>"+round(delta[6])+"</td><td>"+round(prev_delta[6])+"</td><td>"+round(w2[6])+"</td></tr>";
	output+= "<tr><td>7: I2->H2</td><td>"+round(batch_g[7])+"</td><td>"+round(w[7])+"</td><td>"+round(delta[7])+"</td><td>"+round(prev_delta[7])+"</td><td>"+round(w2[7])+"</td></tr>";
	output+= "<tr><td>8: B1->H2</td><td>"+round(batch_g[8])+"</td><td>"+round(w[8])+"</td><td>"+round(delta[8])+"</td><td>"+round(prev_delta[8])+"</td><td>"+round(w2[8])+"</td></tr>";
	output+= "</table>";
	
	for(var i=0;i<g.length;i++) {
		w[i]+=delta[i];
		prev_delta[i]=delta[i];
	}

	// Display MSE
	$("#mse").html("MSE: "+calculate_mse(w));

	// Display weights
	parseFloat($("#w0").val(w[0]));
	parseFloat($("#w1").val(w[1]));
	parseFloat($("#w2").val(w[2]));
	parseFloat($("#w3").val(w[3]));
	parseFloat($("#w4").val(w[4]));
	parseFloat($("#w5").val(w[5]));
	parseFloat($("#w6").val(w[6]));
	parseFloat($("#w7").val(w[7]));
	parseFloat($("#w8").val(w[8]));
		
	// Display calculation
	$("#calculationDisplay").html(output);
}

function trainRPROP(last_g,last_delta,update_values) {
	var w = [];
	w.push(parseFloat($("#w0").val()));
	w.push(parseFloat($("#w1").val()));
	w.push(parseFloat($("#w2").val()));
	w.push(parseFloat($("#w3").val()));
	w.push(parseFloat($("#w4").val()));
	w.push(parseFloat($("#w5").val()));
	w.push(parseFloat($("#w6").val()));
	w.push(parseFloat($("#w7").val()));
	w.push(parseFloat($("#w8").val()));
	
	var output = "";
	
	batch_g = [0,0,0,0,0,0,0,0,0]
	
	for(var t=0;t<XOR_x.length;t++) {
		output+="<h3>Training Element #"+(t+1)+"</h3>";
		var x = XOR_x[t];
		var y = XOR_y[t];
	
		result = calcGradients(w,x,y);
		g = result[0];
		
		for(var i=0;i<g.length;i++) {
			batch_g[i]+=g[i]
		}
		
		output+= "<table><tr><th>Connection</th><th>Gradient</th><th>Sum of Gradients So Far</th></tr>";
		output+= "<tr><td>0: H1->O1</td><td>"+round(g[0])+"</td><td>"+round(batch_g[0])+"</td></tr>";
		output+= "<tr><td>1: H2->O1</td><td>"+round(g[1])+"</td><td>"+round(batch_g[1])+"</td></tr>";
		output+= "<tr><td>2: B2->O1</td><td>"+round(g[2])+"</td><td>"+round(batch_g[2])+"</td></tr>";
		output+= "<tr><td>3: I1->H1</td><td>"+round(g[3])+"</td><td>"+round(batch_g[3])+"</td></tr>";
		output+= "<tr><td>4: I2->H1</td><td>"+round(g[4])+"</td><td>"+round(batch_g[4])+"</td></tr>";
		output+= "<tr><td>5: B1->H1</td><td>"+round(g[5])+"</td><td>"+round(batch_g[5])+"</td></tr>";
		output+= "<tr><td>6: I1->H2</td><td>"+round(g[6])+"</td><td>"+round(batch_g[6])+"</td></tr>";
		output+= "<tr><td>7: I2->H2</td><td>"+round(g[7])+"</td><td>"+round(batch_g[7])+"</td></tr>";
		output+= "<tr><td>8: B1->H2</td><td>"+round(g[8])+"</td><td>"+round(batch_g[8])+"</td></tr>";
		output+= "</table>";
		
		output += result[1];
	}
	
	display_last_g = [];
	display_change = [];
	weight_delta = []
	for(var i=0;i<g.length;i++) {
		display_last_g.push(last_g[i]);
	}
	
	
	
	
	w2 = [];
	
	for(var i=0;i<batch_g.length;i++) {
		var change = sign(batch_g[i] * last_g[i]);
			display_change.push(change);
            var weightChange = 0;

			var delta = 0;
            // if the gradient has retained its sign, then we increase the
            // delta so that it will converge faster
            if (change > 0) {
                delta = update_values[i]
                    * POSITIVE_ETA;
                delta = Math.min(delta, MAX_STEP);
                weightChange = sign(batch_g[i]) * delta;
                update_values[i] = delta;
                last_g[i] = batch_g[i];
            } else if (change < 0) {
                // if change<0, then the sign has changed, and the last
                // delta was too big
                delta = update_values[i]
                    * NEGATIVE_ETA;
                delta = Math.max(delta, DELTA_MIN);
                update_values[i] = delta;
                weightChange = -last_delta[i];
                // set the previous gradient to zero so that there will be no
                // adjustment the next iteration
                last_g[i] = 0;
            } else if (change === 0) {
                // if change==0 then there is no change to the delta
                delta = update_values[i];
                weightChange = sign(g[i]) * delta;
                last_g[i] = batch_g[i];
            }
            weight_delta.push(weightChange);
            w2.push(w[i] + weightChange);
        }
	
	output+="<h3>Weight Update</h3>";
	output+= "<table><tr><th>Connection</th><th>Gradient(current)</th><th>Gradient(last)</th><th>G.Change</th><th>Update Value</th><th>Old Weight</th><th>Weight Delta</th><th>New Weight</th></tr>";
	output+= "<tr><td>0: H1->O1</td><td>"+round(batch_g[0])+"</td><td>"+round(display_last_g[0])+"</td><td>"+round(display_change[0])+"</td><td>"+round(update_values[0])+"</td><td>"+round(w[0])+"</td><td>"+round(weight_delta[0])+"</td><td>"+round(w2[0])+"</td></tr>";
	output+= "<tr><td>1: H2->O1</td><td>"+round(batch_g[1])+"</td><td>"+round(display_last_g[1])+"</td><td>"+round(display_change[1])+"</td><td>"+round(update_values[1])+"</td><td>"+round(w[1])+"</td><td>"+round(weight_delta[1])+"</td><td>"+round(w2[1])+"</td></tr>";
	output+= "<tr><td>2: B2->O1</td><td>"+round(batch_g[2])+"</td><td>"+round(display_last_g[2])+"</td><td>"+round(display_change[2])+"</td><td>"+round(update_values[2])+"</td><td>"+round(w[2])+"</td><td>"+round(weight_delta[2])+"</td><td>"+round(w2[2])+"</td></tr>";
	output+= "<tr><td>3: I1->H1</td><td>"+round(batch_g[3])+"</td><td>"+round(display_last_g[3])+"</td><td>"+round(display_change[3])+"</td><td>"+round(update_values[3])+"</td><td>"+round(w[3])+"</td><td>"+round(weight_delta[3])+"</td><td>"+round(w2[3])+"</td></tr>";
	output+= "<tr><td>4: I2->H1</td><td>"+round(batch_g[4])+"</td><td>"+round(display_last_g[4])+"</td><td>"+round(display_change[4])+"</td><td>"+round(update_values[4])+"</td><td>"+round(w[4])+"</td><td>"+round(weight_delta[4])+"</td><td>"+round(w2[4])+"</td></tr>";
	output+= "<tr><td>5: B1->H1</td><td>"+round(batch_g[5])+"</td><td>"+round(display_last_g[5])+"</td><td>"+round(display_change[5])+"</td><td>"+round(update_values[5])+"</td><td>"+round(w[5])+"</td><td>"+round(weight_delta[5])+"</td><td>"+round(w2[5])+"</td></tr>";
	output+= "<tr><td>6: I1->H2</td><td>"+round(batch_g[6])+"</td><td>"+round(display_last_g[6])+"</td><td>"+round(display_change[6])+"</td><td>"+round(update_values[6])+"</td><td>"+round(w[6])+"</td><td>"+round(weight_delta[6])+"</td><td>"+round(w2[6])+"</td></tr>";
	output+= "<tr><td>7: I2->H2</td><td>"+round(batch_g[7])+"</td><td>"+round(display_last_g[7])+"</td><td>"+round(display_change[7])+"</td><td>"+round(update_values[7])+"</td><td>"+round(w[7])+"</td><td>"+round(weight_delta[7])+"</td><td>"+round(w2[7])+"</td></tr>";
	output+= "<tr><td>8: B1->H2</td><td>"+round(batch_g[8])+"</td><td>"+round(display_last_g[8])+"</td><td>"+round(display_change[8])+"</td><td>"+round(update_values[8])+"</td><td>"+round(w[8])+"</td><td>"+round(weight_delta[8])+"</td><td>"+round(w2[8])+"</td></tr>";
	output+= "</table>";

	for(var i=0;i<w.length;i++) {
		w[i] = w2[i];
		last_delta[i] = weight_delta[i];
	}

	// Display MSE
	$("#mse").html("MSE: "+calculate_mse(w));

	// Display weights
	parseFloat($("#w0").val(w[0]));
	parseFloat($("#w1").val(w[1]));
	parseFloat($("#w2").val(w[2]));
	parseFloat($("#w3").val(w[3]));
	parseFloat($("#w4").val(w[4]));
	parseFloat($("#w5").val(w[5]));
	parseFloat($("#w6").val(w[6]));
	parseFloat($("#w7").val(w[7]));
	parseFloat($("#w8").val(w[8]));
		
	// Display calculation
	$("#calculationDisplay").html(output);
}