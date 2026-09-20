document.addEventListener('DOMContentLoaded', function(){
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
});
