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


document.addEventListener('DOMContentLoaded', function(){
  document.getElementById("ButtonDimensionsOK").addEventListener('click', function(){
  		var dimensionCount = parseInt(document.getElementById("TextDimensionNum").value);

    	var str = "";
    	for(var i = 0; i<dimensionCount; i++) {
    		str+= (i+1) + ": <input type='text' id='Vector1-"+i+"' value='0'><br>";
    	}
    	document.getElementById("DivVector1").innerHTML = str;

    	str = "";
    	for(var i = 0; i<dimensionCount; i++) {
    		str+= (i+1) + ": <input type='text' id='Vector2-"+i+"' value='0'><br>";
    	}
    	document.getElementById("DivVector2").innerHTML = str;



  });

    document.getElementById("ButtonCalculate").addEventListener('click', function(){
    	var dimensionCount = parseInt(document.getElementById("TextDimensionNum").value);
    	var vec1 = [];
    	var vec2 = [];

    	for(var i = 0; i<dimensionCount; i++) {
    		var el1 = document.getElementById("Vector1-"+i);
    		var el2 = document.getElementById("Vector2-"+i);
    		vec1[i] = parseFloat(el1 ? el1.value : undefined);
    		vec2[i] = parseFloat(el2 ? el2.value : undefined);
    	}

    	var str = "Euclidean Distance: " + distEuclidean(vec1,vec2);
    	str += "\nManhattan Distance: " + distManhattan(vec1,vec2);
    	str += "\nChebyshev Distance: " + distChebyshev(vec1,vec2);

    	document.getElementById("PreOutput").textContent = str;


  });

});
