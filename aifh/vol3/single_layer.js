$(document).ready(function(){
  $("#calculateButton").click(function(){
	var str = "";
  	var i1 = parseFloat($("#i1").val());
	var i2 = parseFloat($("#i2").val());
	var w1 = parseFloat($("#w1").val());
	var w2 = parseFloat($("#w2").val());
	var w3 = parseFloat($("#w3").val());

	sum = (i1*w1) + (i2*w2) + w3;
	str += "sum=("+i1+"*"+w1+")+("+i2+"*"+w2+")+"+w3+"="+sum+"<br>";

	$("#sum").val(sum)

	o = 1.0 / (1.0 + Math.exp(-sum))
	str += "1/(1+exp(-"+sum+")=" + o;

	$("#o").val(o)
	$("#calculationDisplay").html(str);

	
  });
});
