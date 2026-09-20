document.addEventListener('DOMContentLoaded', function(){
  window.prev_delta = [0,0,0,0,0,0,0,0,0];

  document.getElementById("calculateButton").addEventListener('click', function(){
	calculate_display();

  	});

  	document.getElementById("calcAllButton").addEventListener('click', function(){
		trainOnline([0,0],0,window.prev_delta);
		trainOnline([1,0],1,window.prev_delta);
		trainOnline([0,1],1,window.prev_delta);
		trainOnline([1,1],0,window.prev_delta);
  	});

	document.getElementById("randomizeButton").addEventListener('click', function(){
		randomize();
	});
	document.getElementById("train000Button").addEventListener('click', function(){
		trainOnline([0,0],0,window.prev_delta);
	});
	document.getElementById("train101Button").addEventListener('click', function(){
		trainOnline([1,0],1,window.prev_delta);
	});
	document.getElementById("train011Button").addEventListener('click', function(){
		trainOnline([0,1],1,window.prev_delta);
	});
	document.getElementById("train110Button").addEventListener('click', function(){
		trainOnline([1,1],0,window.prev_delta);
	});
});
