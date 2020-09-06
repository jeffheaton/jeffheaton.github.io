/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function(){
  $("#addNumericButton").click(function(){
	var begin = parseFloat($("#num_begin").val());
	var end = parseFloat($("#num_end").val());

	if(begin>end) {
		alert("Begin cannot be greater than end");
	} else {
		str = "range," + begin + "," + end;
		$("#axises").html($("#axises").html()+"Axis: "+str+"<br>");
	}
  })
  $("#addListButton").click(function(){
	var str = $("#list_values").val();
	str = $("<p>").html(str).text();
    	$("#axises").html($("#axises").html()+"Axis: list,"+str+"<br>");
  })
  $("#goButton").click(function(){
	var axises = [];

	var str = $("#axises").html();
	var lines = str.split("Axis:");
	for(var i=1;i<lines.length;i++) {
		var line = $("<p>").html(lines[i]).text();
		axises.push(line.split(','));
	}

	// Loop over iterations
	iterationCount = 50;
	str = "";

	for(var i=0;i<iterationCount;i++) {
		str = str + "Iteration #" + (i+1) + ": ";	
		for(var j=0;j<axises.length;j++) {
			var list = axises[j];
			var cmd = list[0].trim();

			if( cmd == "range" ) {
				str = str + "[" + getRandomArbitrary(parseFloat(list[1]),parseFloat(list[2]))+"]";
			} else {
				str = str + "[" + list[getRandomInt(1,list.length-1)]+"]";
			}
		}
		str = str + "<br/>";
	}
	
	$("#display").html(str);	
	
  })
});
