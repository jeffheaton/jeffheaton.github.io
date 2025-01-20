'use strict'
$(document).ready(function(){

        var drawing, drawingPen;
        var universe, backgroundTimer;
        var weights;
        var corrections;
        var samples;
        var SAMPLE_COUNT = 16;
        var GRID_WIDTH = 50;
        var GRID_HEIGHT = 50;
        var rbfWidth = 0;
        var learnRate = 0;
        var MAX_ITERATION = 1000;
        var pixW, pixH;
        var iteration = 0;
        
        
        var START_RATE = 0.8;
        var END_RATE = 0.003;
        var START_WIDTH = 30;
        var END_WIDTH = 5;
        
        var rateStep = (START_RATE - END_RATE)/MAX_ITERATION;
        var widthStep = (START_WIDTH - END_WIDTH)/MAX_ITERATION;

        /////////////////////////////////////////////////////////////////////////////
        // Event functions
        /////////////////////////////////////////////////////////////////////////////

        function ev_start(ev)
        {
            backgroundTimer = self.setInterval(ev_animate,100);
            $("#btnStart").prop("disabled",true);
            $("#btnStop").prop("disabled",false);
            $("#btnSingle").prop("disabled",true);
        }

        function ev_stop(ev)
        {
            self.clearInterval(backgroundTimer);
            $("#btnStart").prop("disabled",false);
            $("#btnStop").prop("disabled",true);
            $("#btnSingle").prop("disabled",false);
        }

        function ev_clear(ev)
        {
            for(var row=0;row<GRID_HEIGHT*GRID_WIDTH;row++) {
        		for(var col=0;col<3;col++) {
        			weights[row][col] = (Math.random()*2)-1;
        		}
        	}
        	iteration = 0;
        	learnRate = START_RATE;
        	rbfWidth = START_WIDTH;
        }
        
        function findBMUIndex(sample) {
        	var bestIndex = -1;
        	var bestDistance = 0;
        	
        	for(var i=0;i<weights.length;i++) {
        		var dist = 0
        		for(var j=0;j<sample.length;j++) {
        			var delta = sample[j] - weights[i][j];
        			dist+=delta*delta;
        		}
        		dist = Math.sqrt(dist);
        		
        		if( bestIndex==-1 || dist<bestDistance ) {
        			bestIndex = i;
        			bestDistance = dist;
        		}
        	}
        	return bestIndex;
        }
        
        function learn(bmu,sample) {
        	var bmuRow = Math.floor(bmu/GRID_WIDTH);
        	var bmuCol = bmu-(bmuRow*GRID_WIDTH);
        
        	for(var row = 0;row<weights.length;row++) {
        		for(var col = 0; col<3; col++) {
        			var locationRow = Math.floor(row/GRID_WIDTH);
        			var locationCol = row-(locationRow*GRID_WIDTH);
        			
        			var deltaRow = bmuRow - locationRow;
        			var deltaCol = bmuCol - locationCol;
        			deltaRow = deltaRow * deltaRow;
        			deltaCol = deltaCol * deltaCol;
        			var sum = (deltaRow/(2.0*rbfWidth*rbfWidth)) + 
        			          (deltaCol/(2.0*rbfWidth*rbfWidth));
        			var neighbor = Math.exp(-sum);
        			//window.alert(row + " " + locationRow + " " + locationCol);
        			var d = sample[col]-weights[row][col]; 
        			corrections[row][col] = weights[row][col] + (d * neighbor * learnRate); // weights[row][col] + (neighbor * learnRate * d);
        		}
        	}
        }
        
        function correct() {
        	for(var row=0;row<GRID_HEIGHT*GRID_WIDTH;row++) {
        		for(var col=0;col<3;col++) {
        			weights[row][col] = corrections[row][col];
        		}
        	}
        }

        function ev_single(ev)
        {
            if( iteration<=MAX_ITERATION ) {
            	iteration+=1
            	
            	// choose a random sample
            	var sampleIndex = Math.floor((Math.random() * samples.length));
            	var sample = samples[sampleIndex];
            	var bmuIndex = findBMUIndex(sample);
            	learn(bmuIndex,sample);
            	correct()
            	learnRate-=rateStep;
            	rbfWidth-=widthStep;
            	
            	universe.render();
            	//console.log(iteration + ":" + learnRate + "," + rbfWidth)
            } else {
            	ev_stop()
            }
        }

        function ev_animate()
        {
            ev_single()
        }



        // Find the canvas element.
        universe = ENCOG.GUI.CellGrid.create('drawing-area',GRID_HEIGHT,GRID_WIDTH,500,500);
        universe.outline = true;
        universe.pointerMode = ENCOG.GUI.CellGrid.MODE_CELL;
        universe.determineColor = function(row,col) {
        	var idx = (row*GRID_WIDTH)+col
        	var r = Math.min(Math.round(((weights[idx][0]+1)/2)*255),255)
        	var g = Math.min(Math.round(((weights[idx][1]+1)/2)*255),255)
        	var b = Math.min(Math.round(((weights[idx][2]+1)/2)*255),255)
        	var str =  "#"+(r).toString(16)+(g).toString(16)+(b).toString(16)
        	return str
        }

        $("#btnStart").click(ev_start)
        $("#btnStop").click(ev_stop)
        $("#btnClear").click(ev_clear)
        $("#btnSingle").click(ev_single)

        weights = [[]]
        for(var row=0;row<GRID_HEIGHT*GRID_WIDTH;row++) {
        	var tmp = [];
        	for(var col=0;col<3;col++) {
        		tmp[col] = 0;
        	}
        	weights[row] = tmp;
        }
        
        corrections = [[]]
        for(var row=0;row<GRID_HEIGHT*GRID_WIDTH;row++) {
        	var tmp = [];
        	for(var col=0;col<3;col++) {
        		tmp[col] = 0;
        	}
        	corrections[row] = tmp;
        }
        
        samples = [[]]
        for(var row=0;row<SAMPLE_COUNT;row++) {
        	var tmp = [];
        	for(var col=0;col<3;col++) {
        		tmp[col] = (Math.random()*2)-1;
        	}
        	samples[row] = tmp;
        }

        
        ev_clear();
        ev_start();
        
})