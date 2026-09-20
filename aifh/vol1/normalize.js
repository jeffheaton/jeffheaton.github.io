document.addEventListener('DOMContentLoaded', function(){
  document.getElementById("normButton").addEventListener('click', function(){
    	var dataHigh = parseFloat(document.getElementById("dataHigh").value);
		var dataLow = parseFloat(document.getElementById("dataLow").value);
		var normalizedHigh = parseFloat(document.getElementById("normalizedHigh").value);
		var normalizedLow = parseFloat(document.getElementById("normalizedLow").value);

		var x = parseFloat(document.getElementById("normNum").value);

		var result = ((x - dataLow)
				/ (dataHigh - dataLow))
				* (normalizedHigh - normalizedLow) + normalizedLow;

		document.getElementById("normResult").value = result;
  });

  document.getElementById("deNormButton").addEventListener('click', function(){
    	var dataHigh = parseFloat(document.getElementById("dataHigh").value);
		var dataLow = parseFloat(document.getElementById("dataLow").value);
		var normalizedHigh = parseFloat(document.getElementById("normalizedHigh").value);
		var normalizedLow = parseFloat(document.getElementById("normalizedLow").value);

		var x = parseFloat(document.getElementById("deNormNum").value);

		var result = ((dataLow - dataHigh) * x - normalizedHigh
				* dataLow + dataHigh * normalizedLow)
				/ (normalizedLow - normalizedHigh);

		document.getElementById("deNormResult").value = result;
  });

});
