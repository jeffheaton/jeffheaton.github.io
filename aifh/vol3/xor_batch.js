document.addEventListener('DOMContentLoaded', function(){
  window.prev_delta = [0,0,0,0,0,0,0,0,0];
  document.getElementById("calculateButton").addEventListener('click', function(){
	calculate_display();

  	});

  	document.getElementById("calcAllButton").addEventListener('click', function(){
  		var prev_delta = window.prev_delta;
		prev_delta = window.prev_delta;
		trainBatch(prev_delta);
  	});

	document.getElementById("randomizeButton").addEventListener('click', function(){
		randomize();
	});
});
