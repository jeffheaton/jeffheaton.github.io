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

  $("#ButtonBookValues").click(function(){
      var actual = [ -0.36, 0.07, 0.55, 0.05, -0.37, 0.34, -0.72, -0.10, -0.41, -0.32]
      var ideal = [ -0.37, 0.06, 0.51, 0.06, -0.36, 0.35, -0.67, -0.09, -0.43, -0.33]
      $("#TextDimensionNum").val(actual.length)

      var str = "";
      for(var i = 0; i<actual.length; i++) {
        str+= (i+1) + ": <input type='text' id='Vector1-"+i+"' value='"+actual[i]+"'><br>";
      }
      $("#DivVector1").html(str);

      str = "";
      for(var i = 0; i<ideal.length; i++) {
        str+= (i+1) + ": <input type='text' id='Vector2-"+i+"' value='"+ideal[i]+"'><br>";
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

      if(dimensionCount<1 || isNaN(vec1[1])) {
        $("#DivOutput").text("Please create vectors");
      	$("#PreOutput").text("");
        return
      }

    	var str = "$$ \\operatorname{SSE} = \\sum_{i=1}^N (y_i - \\hat{y_i})^2 = "

      var delta = []

      var sum = 0
      for(var i = 0; i<dimensionCount; i++) {
        var a = parseFloat($("#Vector1-"+i).val())
        var e = parseFloat($("#Vector2-"+i).val())
        if(i>0) {
          str+="+"
        }
        var d = a - e
        str+='('+a+'-'+e+')^2'

        delta.push(d)
        sum += d*d
      }
      str+='=\\\\'

      for(var i = 0; i<dimensionCount;i++) {
        if(i>0) {
          str+="+"
        }
        str+=delta[i].toFixed(4)
        str+="^2"
      }
      str+='=\\\\\n\\\\'

      for(var i = 0; i<dimensionCount;i++) {
        if(i>0) {
          str+="+"
        }
        str+=(delta[i]*delta[i]).toFixed(4)
      }
      str+='=\\\\'

      var sse = sum

      str+=sse
      str+="$$"

      var mse = sse/dimensionCount
      var rmse = Math.sqrt(mse)

      str+="$$ \\operatorname{MSE} = \\frac{\\operatorname{SSE}}{N} = "
      str+='\\frac{'+sum+'}{'+dimensionCount+'}='
      str+=mse
      str+="$$"

      str+="$$ \\operatorname{RMSE} = \\sqrt{\\operatorname{MSE}} = \\sqrt{\\operatorname{"+mse+"}} = "
      str+=rmse
      str+="$$"

      $("#DivOutput").text(str);
    	$("#PreOutput").text(str);
      MathJax.Hub.Typeset()


  });

});
