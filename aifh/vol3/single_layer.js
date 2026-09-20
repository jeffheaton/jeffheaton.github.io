document.addEventListener('DOMContentLoaded', function(){
  document.getElementById("calculateButton").addEventListener('click', function(){
	var str = "";
  	var i1 = parseFloat(document.getElementById("i1").value);
	var i2 = parseFloat(document.getElementById("i2").value);
	var w1 = parseFloat(document.getElementById("w1").value);
	var w2 = parseFloat(document.getElementById("w2").value);
	var w3 = parseFloat(document.getElementById("w3").value);

	sum = (i1*w1) + (i2*w2) + w3;
	str += "sum=("+i1+"*"+w1+")+("+i2+"*"+w2+")+"+w3+"="+sum+"<br>";

	document.getElementById("sum").value = sum

	o = 1.0 / (1.0 + Math.exp(-sum))
	str += "1/(1+exp(-"+sum+")=" + o;

	document.getElementById("o").value = o
	document.getElementById("calculationDisplay").innerHTML = str;


  });
});
