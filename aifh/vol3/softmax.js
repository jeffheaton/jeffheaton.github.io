document.addEventListener('DOMContentLoaded', function(){
  document.getElementById("goButton").addEventListener('click', function(){
  	var vectorCount = parseInt(document.getElementById("vectorCount").value);
	var str = "";
	for(var i=0;i<vectorCount;i++) {
		str = str + '<input type="text" id="vec'+i+'" value="0">'
	}
	document.getElementById("inputDisplay").innerHTML = str;
  });
  document.getElementById("calculateButton").addEventListener('click', function(){
  	var vectorCount = 0;
	while( document.getElementById("vec"+vectorCount) ) { vectorCount++; }

	if( vectorCount==0 ) {
		alert("Add some vector elements.");
		return;
	}

	var calcStr = "sum=";
	var sum = 0;
	for(var j=0;j<vectorCount;j++) {
		var v = parseFloat(document.getElementById("vec"+j).value);
		if(j>0) {
			calcStr+="+";
		}
		calcStr+="exp("+v+")";
		sum+=Math.exp(v);
	}
	calcStr += "=";
	calcStr += sum;
	calcStr += "<br>";

	var vecStr = "[";
	for(var i=0;i<vectorCount;i++) {
		if(i>0) {
			vecStr += " , ";
		}
		var c = parseFloat(document.getElementById("vec"+i).value);
		var result = Math.exp(c) / sum;
		vecStr += result;
		calcStr += "j"+i + "= exp(" + c + ")/sum = " + result + "<br>";
	}
	vecStr+="]";

	document.getElementById("outputDisplay").innerHTML = vecStr;
	document.getElementById("calculationDisplay").innerHTML = calcStr;
  });
});
