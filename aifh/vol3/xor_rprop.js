$(document).ready(function(){
  window.last_g = [0,0,0,0,0,0,0,0,0];
  window.update_values = [0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1];	
  window.last_delta = [0,0,0,0,0,0,0,0,0];	
			
  $("#calculateButton").click(function(){
	calculate_display();

  	});
  	
  	$("#calcAllButton").click(function(){
  		var prev_delta;
		last_g = window.last_g;
		update_values = window.update_values;
		last_delta = window.last_delta;
		trainRPROP(last_g,last_delta,update_values);
  	});
  	
	$("#randomizeButton").click(function(){
		randomize();
	});
});
