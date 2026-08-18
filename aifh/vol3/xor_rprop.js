document.addEventListener('DOMContentLoaded', function(){
  window.last_g = [0,0,0,0,0,0,0,0,0];
  window.update_values = [0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1];
  window.last_delta = [0,0,0,0,0,0,0,0,0];

  document.getElementById("calculateButton").addEventListener('click', function(){
	calculate_display();

  	});

  	document.getElementById("calcAllButton").addEventListener('click', function(){
  		var prev_delta;
		last_g = window.last_g;
		update_values = window.update_values;
		last_delta = window.last_delta;
		trainRPROP(last_g,last_delta,update_values);
  	});

	document.getElementById("randomizeButton").addEventListener('click', function(){
		randomize();
	});
});
