$(document).ready(function(){
  $("#generateButton").click(function(){
  		var cityCount = parseInt($("#cityCount").val());
  		
    	// write out the one-of-n encoding
    	var tableStr = "<table><thead>";

	tourStr="<tr><th>&nbsp;</th>";
	cityStr="<tr><th>&nbsp;</th>";
	for(var headerTour=0;headerTour<cityCount;headerTour++) {
		tourStr+="<th colspan='"+cityCount+"'>";
		tourStr+="Tour:" + headerTour;
		tourStr+="</th>";
		for(var headerCity=0;headerCity<cityCount;headerCity++) {
			cityStr+="<th>"+headerCity+"</th>"
		}
	}
	cityStr+="</tr>"
	tourStr+="</tr>";

	tableStr+=tourStr;
	tableStr+=cityStr;

	var gamma = 7;

	for (var sourceTour = 0; sourceTour < cityCount; sourceTour++) {
		for (var sourceCity = 0; sourceCity < cityCount; sourceCity++) {
			var sourceIndex = sourceTour * cityCount + sourceCity;
			tableStr+="<tr><th>"+sourceIndex+"("+sourceTour+","+sourceCity+")</th>";
			for (var targetTour = 0; targetTour < cityCount; targetTour++) {
				for (var targetCity = 0; targetCity < cityCount; targetCity++) {
					var targetIndex = targetTour * cityCount + targetCity;
					var weight = "\\";
					if (sourceIndex != targetIndex) {
						var predTargetTour = (targetTour == 0 ? cityCount - 1 : targetTour - 1);
						var succTargetTour = (targetTour == cityCount - 1 ? 0 : targetTour + 1);
						if ((sourceTour == targetTour) || (sourceCity == targetCity)) {
							weight = "-g";
						}
						else if ((sourceTour == predTargetTour) || (sourceTour == succTargetTour)) {
							weight = "-d("+sourceCity+","+targetCity+")";
						} else {
							weight = "0";
						}
					}
					tableStr+="<td>"+weight+"</td>";
				}
				//logic.getThreshold()[sourceIndex] = -gamma / 2;
			}
			tableStr+="</th></tr>"
		}
	}



    	tableStr+="</tbody></table>";
    	$("#weightOutput").html(tableStr);
    	
  });
});

