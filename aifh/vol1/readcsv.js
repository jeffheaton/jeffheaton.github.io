$(document).ready(function(){
  $("#btnParse").click(function(){
    contents = Papa.parse($("#textCSV").val())
    var tableStr = "<table><thead></tr>"
    for(var col=0;col<contents.data[0].length;col++) {
		tableStr+="<th>";
    	tableStr+=contents.data[0][col];
    	tableStr+="</th>";
    }
    tableStr+="</tr></thead><tbody>";
    for(var row=1; row<contents.data.length; row++) {
    	tableStr+="<tr>";
    	for(var col=0;col<contents.data[row].length;col++) {
    		tableStr+="<td>";
    		tableStr+=contents.data[row][col];
    		tableStr+="</td>";
    	}
    	tableStr+="</tr>";
    }
    tableStr+="</tbody></table>";
    $("#example-output").html(tableStr);
  });

  $("#btnPreload").click(function(){
  	var url = $("#example-preload").val();
  	$.get(url,
    	function(data) {
        	$("#textCSV").val(data);
        });

  })
});
