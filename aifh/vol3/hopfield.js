function calculateLocalField(weights, i, j, pattern) {
	sum = 0
        for(var k=0;k<pattern.length;k++) {
		if(k!=i) {
			sum += weights(i,k) * pattern[k]
		}
        }
        return sum;
}

function runNeuron(toNeuron) {
	// Collect weights
	var matrix = []
	for(var row=0;row<4;row++) {
		c = []
		for(var col=0;col<4;col++) { 
			c.push(parseFloat($("#r"+row+"c"+col).val()))
		}
		matrix.push(c)
	}


	// Collect state
	state = []
	state.push(parseFloat($("#n0").val()))
  	state.push(parseFloat($("#n1").val()))
	state.push(parseFloat($("#n2").val()))
	state.push(parseFloat($("#n3").val()))

	// Calculate value
	sum = 0
	for (var fromNeuron = 0; fromNeuron < state.length; fromNeuron++) {
		sum += state[fromNeuron] * matrix[fromNeuron][toNeuron]
	}

	if( sum>0 ) {
		$("#n"+toNeuron).val("1")
	} else {
		$("#n"+toNeuron).val("0")
	}
}

$(document).ready(function(){
  $("#addButton").click(function(){
	str = $("#i0").val()+$("#i1").val()+$("#i2").val()+$("#i3").val()
	$('#trainingList').append('<option value="'+str+'">'+str+'</option>')   	
  });
  $("#clearButton").click(function(){
	$('#trainingList').empty()   	
  });
  $("#trainHebbianButton").click(function(){
	training = []
	$('#trainingList').find('option').map(function() {
		var str = $(this).val()
		pattern = [ parseFloat(str.charAt(0)), parseFloat(str.charAt(1)), parseFloat(str.charAt(2)), parseFloat(str.charAt(3)) ]
		training.push(pattern)
	});
	
	var matrix = []
	for(var row=0;row<4;row++) {
		c = []
		for(var col=0;col<4;col++) { 
			c.push($("#r"+row+"c"+col))
		}
		matrix.push(c)
	}

	var sumMatrix = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
	for(var idx=0;idx<training.length;idx++) {
		pattern = training[idx]
		for(var i=0;i<4;i++) {
            		for(var j=0;j<4;j++) {
                		if(i==j) {
                    			sumMatrix[i][j] = 0
                		} else {
                    			sumMatrix[i][j] += pattern[i] * pattern[j]
				}
                	}
            	}
	}

	
	for(var i=0;i<4;i++) {
 		for(var j=0;j<4;j++) {
			matrix[i][j].val(sumMatrix[i][j]/training.length)
		}
	}
  });

  $("#trainStorkeyButton").click(function(){
	training = []
	$('#trainingList').find('option').map(function() {
		var str = $(this).val()
		pattern = [ parseFloat(str.charAt(0)), parseFloat(str.charAt(1)), parseFloat(str.charAt(2)), parseFloat(str.charAt(3)) ]
		training.push(pattern)
	});
	
	var matrix = []
	for(var row=0;row<4;row++) {
		c = []
		for(var col=0;col<4;col++) { 
			c.push($("#r"+row+"c"+col))
		}
		matrix.push(c)
	}

	var sumMatrix = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]

	
	for(var idx=0;idx<training.length;idx++) {
		pattern = training[idx]
		n = training.length
		for(var i=0;i<this.sumMatrix.length;i++) {
			for(var j=0;j<this.sumMatrix.length;j++) {
                		var t1 = (pattern[i] * pattern[j])/n
                		var t2 = (pattern[i] * calculateLocalField(sumWeights,j,i,pattern))/n
                		var t3 = (pattern[j] * calculateLocalField(sumWeights,i,j,pattern))/n
                		var d = t1-t2-t3;
                		sumMatrix[i][j]+=d
            		}
        	}
	}

	
	for(var i=0;i<4;i++) {
 		for(var j=0;j<4;j++) {
			matrix[i][j].val(sumMatrix[i][j])
		}
	}
  });
  $("#runI0Button").click(function(){
	runNeuron(0)
  });
  $("#runI1Button").click(function(){
	runNeuron(1)
  });
  $("#runI2Button").click(function(){
	runNeuron(2)
  });
  $("#runI3Button").click(function(){
	runNeuron(3)
  });
  $("#runAllButton").click(function(){
	for(var i=0;i<4;i++) {
		runNeuron(i)
	}
  });

});

