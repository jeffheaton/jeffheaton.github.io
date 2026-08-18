document.addEventListener('DOMContentLoaded', function(){
  window.prev_delta = [0,0,0,0,0,0,0,0,0];
  var calculateButton = document.getElementById("calculateButton");
  if (calculateButton) {
    calculateButton.addEventListener('click', function(){
	calculate_display();

  	});
  }

  var fileInput = document.querySelector("input[type=file]");
  if (fileInput) {
    fileInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });
  }
});

function imageIsLoaded(e) {
	var img = document.getElementById('myImg');
	img.setAttribute('src', e.target.result);
	var canvas = document.createElement('canvas');
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
	document.getElementById("calculationDisplay").innerHTML = str;
};
