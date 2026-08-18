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

	if(begin>end) {
		alert("Begin cannot be greater than end");
	} else {
		str = "range," + begin + "," + end;
		var axises = document.getElementById("axises");
		axises.innerHTML = axises.innerHTML+"Axis: "+str+"<br>";
	}
  })
  document.getElementById("addListButton").addEventListener('click', function(){
	var str = document.getElementById("list_values").value;
	str = htmlToText(str);
	var axises = document.getElementById("axises");
    	axises.innerHTML = axises.innerHTML+"Axis: list,"+str+"<br>";
  })
  document.getElementById("goButton").addEventListener('click', function(){
	var axises = [];

	var str = document.getElementById("axises").innerHTML;
	var lines = str.split("Axis:");
	for(var i=1;i<lines.length;i++) {
		var line = htmlToText(lines[i]);
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

	document.getElementById("display").innerHTML = str;

  })
});
