$(document).ready(function(){
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
});
