function distEuclidean(vec1,vec2) 
{
	var sum = 0;	
	var delta;
	for(var i=0;i<vec1.length;i++) {
		delta = (vec1[i]-vec2[i]);
		sum+=delta*delta;
		
	}
	return Math.sqrt(sum);
}

function distManhattan(vec1,vec2) 
{
	var sum = 0;	
	var delta;
	for(var i=0;i<vec1.length;i++) {
		delta = Math.abs(vec1[i] - vec2[i]);
		sum+=delta;
		
	}
	return sum;
}

function distChebyshev(vec1,vec2) 
{
	var result = 0;	
	var delta;
	for(var i=0;i<vec1.length;i++) {
		delta = Math.abs(vec1[i] - vec2[i]);
    	result = Math.max(delta, result);
		
	}
	return result;
}


$(document).ready(function(){  
  $("#ButtonDimensionsOK").click(function(){
  		var dimensionCount = parseInt($("#TextDimensionNum").val());

    	var str = "";
    	for(var i = 0; i<dimensionCount; i++) {
    		str+= (i+1) + ": <input type='text' id='Vector1-"+i+"' value='0'><br>";
    	}
    	$("#DivVector1").html(str);
    	
    	str = "";
    	for(var i = 0; i<dimensionCount; i++) {
    		str+= (i+1) + ": <input type='text' id='Vector2-"+i+"' value='0'><br>";
    	}
    	$("#DivVector2").html(str);



  });
  
    $("#ButtonCalculate").click(function(){
    	var dimensionCount = parseInt($("#TextDimensionNum").val());
    	var vec1 = [];
    	var vec2 = [];
    	
    	for(var i = 0; i<dimensionCount; i++) {
    		vec1[i] = parseFloat($("#Vector1-"+i).val());
    		vec2[i] = parseFloat($("#Vector2-"+i).val());
    	}
    	
    	var str = "Euclidean Distance: " + distEuclidean(vec1,vec2);
    	str += "\nManhattan Distance: " + distManhattan(vec1,vec2);
    	str += "\nChebyshev Distance: " + distChebyshev(vec1,vec2);
    	
    	$("#PreOutput").text(str);
    	

  });

});

