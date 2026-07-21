$(document).ready(function(){
  window.prev_delta = [0,0,0,0,0,0,0,0,0];
  $("#calculateButton").click(function(){
	calculate_display();

  	});
  	
  	$("#calcAllButton").click(function(){
  	});
  	
	$("#randomizeButton").click(function(){
	});
});

$(function () {
    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });
});

function imageIsLoaded(e) {
	$('#myImg').attr('src', e.target.result);
	var img = $('#myImg')[0];
	var canvas = $('<canvas/>')[0];
	canvas.width = img.width;
	canvas.height = img.height;
	canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
	var pixelData = canvas.getContext('2d').getImageData(0, 0, img.width, img.height).data;
	var str = "";
	for(var i=0;i<pixelData.length/4;i++) {
		var idx = i*4;
		p = (pixelData[idx] + pixelData[idx+1] + pixelData[idx+2])/3
		str+=Math.round(p);
		str+=" "
	}
	$("#calculationDisplay").html(str);
};
