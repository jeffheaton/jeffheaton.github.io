$(document).ready(function(){
  $("#generateButton").click(function(){
  		var classCount = parseInt($("#classCount").val());
  		var normalizedHigh = parseFloat($("#normalizedHigh").val());
  		var normalizedLow = parseFloat($("#normalizedLow").val());

    	// write out the one-of-n encoding
    	var tableStr = "<table><thead><tr><th>Class</th>";
    	for(var col=0;col<classCount;col++) {
			tableStr+="<th>";
    		tableStr+="Output " + col;
    		tableStr+="</th>";
    	}
    	tableStr+="</tr></thead><tbody>";
    	for(var row=0; row<classCount; row++) {
    		tableStr+="<tr><td>Class #" + (row+1);
    		tableStr+="</td>";
    		for(var col=0;col<classCount;col++) {
    			tableStr+="<td>";
    			if( col==row ) {
    				tableStr+=normalizedHigh;
    			}
    			else {
    				tableStr+=normalizedLow;
    			}
    			tableStr+="</td>";
    		}
    		tableStr+="</tr>";
    	}
    	tableStr+="</tbody></table>";
    	$("#oneofnOutput").html(tableStr);

    	// write out the equilateral encoding
    	var r = 0.0;
    	var f = 0.0;
        var result = new Array(classCount);

        for(var i=0;i<classCount;i++) {
        	result[i] = new Array(classCount-1);
        }

        result[0][0] = -1;
        result[1][0] = 1;

        for (var k = 2; k < classCount; k++) {
            // scale the matrix so far
            r = k;
            f = Math.sqrt(r * r - 1.0) / r;
            for (var i = 0; i < k; i++) {
                for (var j = 0; j < k - 1; j++) {
                    result[i][j] *= f;
                }
            }

            r = -1 / r;
            for (var i = 0; i < k; i++) {
                result[i][k - 1] = r;
            }

            for (var i = 0; i < k - 1; i++) {
                result[k][i] = 0;
            }
            result[k][k - 1] = 1.0;
        }

        // scale it
        var dataLow = -1;
        var dataHigh = 1;

        for (var row = 0; row < k; row++) {
            for (var col = 0; col < k; col++) {
                result[row][col] = ((result[row][col] - dataLow)
				/ (dataHigh - dataLow))
				* (normalizedHigh - normalizedLow) + normalizedLow;
            }
        }

    	tableStr = "<table><thead><tr><th>Class</th>";
    	for(var col=0;col<(classCount-1);col++) {
			tableStr+="<th>";
    		tableStr+="Output " + col + "&nbsp;"
    		tableStr+="</th>";
    	}
    	tableStr+="</tr></thead><tbody>";
    	for(var row=0; row<classCount; row++) {
    		tableStr+="<tr><td>Class #" + (row+1) + ":&nbsp;";
    		tableStr+="</td>";
    		for(var col=0;col<(classCount-1);col++) {
    			tableStr+="<td>";
    			tableStr+=result[row][col].toFixed(2);
    			tableStr+="</td>";
    		}
    		tableStr+="</tr>";
    	}
    	tableStr+="</tbody></table>";
    	$("#equilateralOutput").html(tableStr);
  });
});
