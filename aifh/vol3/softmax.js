$(document).ready(function(){
  $("#goButton").click(function(){
  	var vectorCount = parseInt($("#vectorCount").val());
	var str = "";
	for(var i=0;i<vectorCount;i++) {
		str = str + '<input type="text" id="vec'+i+'" value="0">'
	}
	$("#inputDisplay").html(str);	
  });
  $("#calculateButton").click(function(){
  	var vectorCount = 0;
	while( $("#vec"+vectorCount).length) { vectorCount++; }

	if( vectorCount==0 ) {
		alert("Add some vector elements.");
		return;
	}

	var calcStr = "sum=";
	var sum = 0;
	for(var j=0;j<vectorCount;j++) {
		var v = parseFloat($("#vec"+j).val());
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
		var c = parseFloat($("#vec"+i).val());
		var result = Math.exp(c) / sum;
		vecStr += result;
		calcStr += "j"+i + "= exp(" + c + ")/sum = " + result + "<br>";
	}
	vecStr+="]";

	$("#outputDisplay").html(vecStr);
	$("#calculationDisplay").html(calcStr);
  });
});
