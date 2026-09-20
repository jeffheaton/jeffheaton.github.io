document.addEventListener('DOMContentLoaded', function(){
  document.getElementById("btnParse").addEventListener('click', function(){
    contents = Papa.parse(document.getElementById("textCSV").value)
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
    document.getElementById("example-output").innerHTML = tableStr;
  });

  document.getElementById("btnPreload").addEventListener('click', function(){
  	var url = document.getElementById("example-preload").value;
  	fetch(url)
    	.then(function(response) { return response.text(); })
    	.then(function(data) {
        	document.getElementById("textCSV").value = data;
        });

  })
});
