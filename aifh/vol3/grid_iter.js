// Decode HTML entities in a string
function htmlToText(html) {
	var p = document.createElement("p");
	p.innerHTML = html;
	return p.textContent;
}

document.addEventListener('DOMContentLoaded', function(){
  document.getElementById("addNumericButton").addEventListener('click', function(){
	var begin = parseFloat(document.getElementById("num_begin").value);
	var end = parseFloat(document.getElementById("num_end").value);
	var step = parseFloat(document.getElementById("num_step").value);

	if(begin>end) {
		alert("Begin cannot be greater than end");
	} else {

		var str = "";
		var runaway = 0;
		var current = begin;
		while(current<=end) {
			if( str.length > 0 ) {
				str = str + ", ";
			}
			str = str + current;
			runaway = runaway + 1;
			current = current + step;
			if( runaway>100000 ) {
				alert("Your selections produce over 100K iterations!");
				return;
			}
		}

		var axises = document.getElementById("axises");
		axises.innerHTML = axises.innerHTML+"Axis: "+str+"<br>";
	}
  })
  document.getElementById("addListButton").addEventListener('click', function(){
	var str = document.getElementById("list_values").value;
	str = htmlToText(str);
	var axises = document.getElementById("axises");
    	axises.innerHTML = axises.innerHTML+"Axis: "+str+"<br>";
  })
  document.getElementById("goButton").addEventListener('click', function(){
	var axises = [];
	var indexes = [];
	var str = document.getElementById("axises").innerHTML;
	var lines = str.split("Axis:");
	for(var i=1;i<lines.length;i++) {
		var line = htmlToText(lines[i]);
		axises.push(line.split(','));
		indexes.push(0);
	}

	var iterationCount = 0;
	str = "";


	var done = false;

	while(!done) {
		iterationCount = iterationCount + 1;
		if( iterationCount>1000 ) {
			str = str + "Too many iterations, stopping<br>";
			break;
		}

		// Prepare current iteration for display
		var iteration = "";
		for(var i=0;i<axises.length;i++) {
			iteration = iteration + "[" + axises[i][indexes[i]].trim() + "]";
		}
		str = str + "Iteration #" + iterationCount + " : " + iteration + "<br>";

		// rotate axeses
		indexes[0] = indexes[0] + 1;
		var counterIdx = 0;
		while( !done && indexes[counterIdx]>=axises[counterIdx].length ) {
			indexes[counterIdx] = 0;
			counterIdx = counterIdx + 1;
			if(counterIdx>=axises.length) {
				done = true;
			} else {
				indexes[counterIdx] = indexes[counterIdx] + 1;
			}
		}
	}

	if( iterationCount < 1 ) {
		str = "";
	}

	document.getElementById("display").innerHTML = str;

  })
});
