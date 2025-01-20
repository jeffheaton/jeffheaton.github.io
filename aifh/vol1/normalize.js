$(document).ready(function(){
  $("#normButton").click(function(){
    	var dataHigh = parseFloat($("#dataHigh").val());
		var dataLow = parseFloat($("#dataLow").val());
		var normalizedHigh = parseFloat($("#normalizedHigh").val());
		var normalizedLow = parseFloat($("#normalizedLow").val());
		
		var x = parseFloat($("#normNum").val());

		var result = ((x - dataLow) 
				/ (dataHigh - dataLow))
				* (normalizedHigh - normalizedLow) + normalizedLow;
				
		$("#normResult").val(result);
  });
  
  $("#deNormButton").click(function(){
    	var dataHigh = parseFloat($("#dataHigh").val());
		var dataLow = parseFloat($("#dataLow").val());
		var normalizedHigh = parseFloat($("#normalizedHigh").val());
		var normalizedLow = parseFloat($("#normalizedLow").val());
		
		var x = parseFloat($("#deNormNum").val());

		var result = ((dataLow - dataHigh) * x - normalizedHigh
				* dataLow + dataHigh * normalizedLow)
				/ (normalizedLow - normalizedHigh);
				
		$("#deNormResult").val(result);
  });

});

