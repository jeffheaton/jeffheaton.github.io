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
			c.push(parseFloat(document.getElementById("r"+row+"c"+col).value))
		}
		matrix.push(c)
	}


	// Collect state
	state = []
	state.push(parseFloat(document.getElementById("n0").value))
  	state.push(parseFloat(document.getElementById("n1").value))
	state.push(parseFloat(document.getElementById("n2").value))
	state.push(parseFloat(document.getElementById("n3").value))

	// Calculate value
	sum = 0
	for (var fromNeuron = 0; fromNeuron < state.length; fromNeuron++) {
		sum += state[fromNeuron] * matrix[fromNeuron][toNeuron]
	}

	if( sum>0 ) {
		document.getElementById("n"+toNeuron).value = "1"
	} else {
		document.getElementById("n"+toNeuron).value = "0"
	}
}

document.addEventListener('DOMContentLoaded', function(){
  document.getElementById("addButton").addEventListener('click', function(){
	str = document.getElementById("i0").value+document.getElementById("i1").value+document.getElementById("i2").value+document.getElementById("i3").value
	document.getElementById('trainingList').insertAdjacentHTML('beforeend', '<option value="'+str+'">'+str+'</option>')
  });
  document.getElementById("clearButton").addEventListener('click', function(){
	document.getElementById('trainingList').innerHTML = ''
  });
  document.getElementById("trainHebbianButton").addEventListener('click', function(){
	training = []
	document.querySelectorAll('#trainingList option').forEach(function(option) {
		var str = option.value
		pattern = [ parseFloat(str.charAt(0)), parseFloat(str.charAt(1)), parseFloat(str.charAt(2)), parseFloat(str.charAt(3)) ]
		training.push(pattern)
	});

	var matrix = []
	for(var row=0;row<4;row++) {
		c = []
		for(var col=0;col<4;col++) {
			c.push(document.getElementById("r"+row+"c"+col))
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
			matrix[i][j].value = sumMatrix[i][j]/training.length
		}
	}
  });

  document.getElementById("trainStorkeyButton").addEventListener('click', function(){
	training = []
	document.querySelectorAll('#trainingList option').forEach(function(option) {
		var str = option.value
		pattern = [ parseFloat(str.charAt(0)), parseFloat(str.charAt(1)), parseFloat(str.charAt(2)), parseFloat(str.charAt(3)) ]
		training.push(pattern)
	});

	var matrix = []
	for(var row=0;row<4;row++) {
		c = []
		for(var col=0;col<4;col++) {
			c.push(document.getElementById("r"+row+"c"+col))
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
			matrix[i][j].value = sumMatrix[i][j]
		}
	}
  });
  document.getElementById("runI0Button").addEventListener('click', function(){
	runNeuron(0)
  });
  document.getElementById("runI1Button").addEventListener('click', function(){
	runNeuron(1)
  });
  document.getElementById("runI2Button").addEventListener('click', function(){
	runNeuron(2)
  });
  document.getElementById("runI3Button").addEventListener('click', function(){
	runNeuron(3)
  });
  document.getElementById("runAllButton").addEventListener('click', function(){
	for(var i=0;i<4;i++) {
		runNeuron(i)
	}
  });

});
