$(document).ready(function(){
  window.prev_delta = [0,0,0,0,0,0,0,0,0];

  $("#calculateButton").click(function(){
	calculate_display();

  	});
  	
  	$("#calcAllButton").click(function(){
		trainOnline([0,0],0,window.prev_delta);
		trainOnline([1,0],1,window.prev_delta);
		trainOnline([0,1],1,window.prev_delta);
		trainOnline([1,1],0,window.prev_delta);
  	});
  	
	$("#randomizeButton").click(function(){
		randomize();
	});
	$("#train000Button").click(function(){
		trainOnline([0,0],0,window.prev_delta);
	});
	$("#train101Button").click(function(){
		trainOnline([1,0],1,window.prev_delta);
	});
	$("#train011Button").click(function(){
		trainOnline([0,1],1,window.prev_delta);
	});
	$("#train110Button").click(function(){
		trainOnline([1,1],0,window.prev_delta);
	});
});
