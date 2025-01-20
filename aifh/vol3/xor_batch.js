$(document).ready(function(){
  window.prev_delta = [0,0,0,0,0,0,0,0,0];
  $("#calculateButton").click(function(){
	calculate_display();

  	});
  	
  	$("#calcAllButton").click(function(){
  		var prev_delta = window.prev_delta;
		prev_delta = window.prev_delta;
		trainBatch(prev_delta);
  	});
  	
	$("#randomizeButton").click(function(){
		randomize();
	});
});
