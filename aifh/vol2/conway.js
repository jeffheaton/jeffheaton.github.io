'use strict'
$(document).ready(function(){

        /////////////////////////////////////////////////////////////////////////////
        // Event functions
        /////////////////////////////////////////////////////////////////////////////

        function ev_start(ev)
        {
            backgroundTimer = self.setInterval(ev_animate,100);
            $("#btnStart").prop("disabled",true)
            $("#btnStop").prop("disabled",false)
            $("#btnSingle").prop("disabled",true)
        }

        function ev_stop(ev)
        {
            self.clearInterval(backgroundTimer);
            $("#btnStart").prop("disabled",false)
            $("#btnStop").prop("disabled",true)
            $("#btnSingle").prop("disabled",false)
        }

        function ev_clear(ev)
        {
            for(var row = 0; row<sourceGrid.length; row++)
            {
                for(var col = 0; col<sourceGrid[row].length; col++)
                {
                    if( Math.random()>0.5 )
                        targetGrid[row][col] = sourceGrid[row][col] = true;
                    else
                        targetGrid[row][col] = sourceGrid[row][col] = false;
                }
            }
        }

        function ev_single(ev)
        {
            ev_animate();
        }

        function ev_animate()
        {
            universe.render();

            for(var row = 0; row<targetGrid.length; row++)
            {
                var above = targetGrid[row-1];
                var below = targetGrid[row+1];

                for(var col = 0; col<targetGrid[row].length; col++)
                {
                    var total = 0;

                    for(var i=0;i<TRANS_X.length;i++)
                    {
                        var x = col + TRANS_X[i];
                        var y = row + TRANS_Y[i];
                        if( isValid(x,y) )
                        {
                            if( sourceGrid[y][x] )
                            {
                                total++;
                            }
                        }
                    }

                    var alive = sourceGrid[row][col];

                    if( alive )
                    {
                        // 1. Any live cell with fewer than two live neighbors dies, as if caused by under-population.
                        if( total <2 )
                        {
                            alive = false;
                        }
                        // 2. Any live cell with two or three live neighbors lives on to the next generation. (not needed)
                        // 3. Any live cell with more than three live neighbors dies, as if by overcrowding.
                        else if( total>3 )
                        {
                            alive = false;
                        }
                    }
                    else
                    {
                        // 4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
                        if( total==3 )
                        {
                            alive = true;
                        }
                    }

                    targetGrid[row][col] = alive;
                }
            }

            // swap
            var temp = sourceGrid;
            sourceGrid = targetGrid;
            targetGrid = temp;
        }

        function isValid(x,y)
        {
            if( x<0 || y<0 )
                return false;

            if( x>=GRID_WIDTH || y>=GRID_HEIGHT )
                return false;

            return true;
        }


        var drawing, drawingPen;
        var universe, backgroundTimer;
        var grid1,grid2,sourceGrid,targetGrid;
        var GRID_WIDTH = 50;
        var GRID_HEIGHT = 50;
        var pixW, pixH;

        var TRANS_X = new Array( 0, 1, 1, 1,    0, -1, -1, -1);
        var TRANS_Y = new Array(-1,-1, 0, 1,    1,  1,  0, -1);

        // Find the canvas element.
        universe = ENCOG.GUI.CellGrid.create('drawing-area',GRID_HEIGHT,GRID_WIDTH,500,500);
        universe.outline = true;
        universe.pointerMode = ENCOG.GUI.CellGrid.MODE_CELL;
        universe.determineColor = function(row,col) {
        if( targetGrid[row][col] ) {
        	return "black";
        } else {
        	return "white";
        }
        }

        universe.pointerDown = function(row,col)
        {
			drawing = true;
			drawingPen = !targetGrid[row][col];
            sourceGrid[row][col] = drawingPen;
            targetGrid[row][col] = drawingPen;
            universe.render();
        }
        universe.pointerUp = function(row,col)
        {
            drawing = false;
        }
        universe.pointerMove = function(row,col)
        {
        	if( drawing ) {
            	sourceGrid[row][col] = drawingPen;
            	targetGrid[row][col] = drawingPen;
            	universe.render();
            }
        }

        $("#btnStart").click(ev_start)
        $("#btnStop").click(ev_stop)
        $("#btnClear").click(ev_clear)
        $("#btnSingle").click(ev_single)

        grid1 = ENCOG.ArrayUtil.allocateBoolean2D(GRID_HEIGHT,GRID_WIDTH);
        grid2 = ENCOG.ArrayUtil.allocateBoolean2D(GRID_HEIGHT,GRID_WIDTH);

        targetGrid = grid1;
        sourceGrid = grid2;

        ev_clear();
        ev_start();
        
})