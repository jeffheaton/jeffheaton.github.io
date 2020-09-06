function read_matrix(prefix,rows,cols) {
  var matrix = []
  for(var row=0;row<rows;row++) {
    var matrix_row = []
    for(var col=0;col<cols;col++) {
      var name = prefix+row+"-"+col
      var value = parseFloat($("#"+name).val())
      matrix_row.push(value)
    }
    matrix.push(matrix_row)
  }
  return matrix
}

function latex_matrix(matrix) {
  rows = matrix.length
  cols = matrix[0].length

  output = "\\begin{bmatrix}"
  for(var row=0;row<rows;row++) {
    for(var col=0;col<cols;col++) {
      if( col>0 ) {
        output += " &"
      }
      output += matrix[row][col]
    }
    output += "\\\\"
  }
  output += "\\end{bmatrix}"
  return output
}

$(document).ready(function(){
  $("#generateButton").click(function(){
  	var rowsA = parseInt($("#rowsA").val())
		var rowsB = parseInt($("#rowsB").val())
		var colsA = parseInt($("#colsA").val())
		var colsB = parseInt($("#colsB").val())

		if( rowsA<1 || rowsB<1 || rowsA>25 || rowsB>25) {
			$("#gridsOutput").html("Rows must be between 1 and 25")
			return
		}

		if( colsA<1 || colsB<1 || colsA>25 || colsB>25) {
			$("#gridsOutput").html("Columns must be between 1 and 25")
			return
		}

    	// write out the one-of-n encoding
    	var output = ""

		output += "<b>Matrix A:</b><br>"
		output += "<table>"
    	for(var row=0;row<rowsA;row++) {
			output+="<tr>"
			for(var col=0;col<colsA;col++) {
				var name = "a"+row+"-"+col
        var v = Math.floor(Math.random() * 9) + 1
				output+='<td><input value="'+v+'" size="3" id="'+name+'"></td>'
			}
			output+="</tr>"
    	}
		output+="</table>"

		output += "<b>Matrix B:</b><br>"
		output += "<table>"
    	for(var row=0;row<rowsB;row++) {
			output+="<tr>"
			for(var col=0;col<colsB;col++) {
				var name = "b"+row+"-"+col
        var v = Math.floor(Math.random() * 9) + 1
				output+='<td><input value="'+v+'" size="3" id="'+name+'"></td>'
			}
			output+="</tr>"
    	}
		output+="</table>"



    	$("#gridsOutput").html(output)
      $("#calculateOutput").html("")
  });

  $("#multiplyButton").click(function(){
  		var rowsA = parseInt($("#rowsA").val())
		var rowsB = parseInt($("#rowsB").val())
		var colsA = parseInt($("#colsA").val())
		var colsB = parseInt($("#colsB").val())

    if( !$("#a0-0").val()) {
      $("#calculateOutput").html("Generate grids first.")
      return
    }

    if( colsA != rowsB) {
      $("#calculateOutput").html("To multiply the count of columns for A must be the same as the rows of B.")
      return
    }

    matrixA = read_matrix("a",rowsA,colsA)
    matrixB = read_matrix("b",rowsB,colsB)

		// Generate LaTex
		var output = "Multiply: <br>$$"
    output += latex_matrix(matrixA)
    output += " \\times "
    output += latex_matrix(matrixB)
    output += " =$$<br>"

    // multiply
    matrixOut = []
    matrixAnswer = []

    for (var i=0; i<rowsA; ++i) {
      var matrixRow = []
      var matrixRow2 = []
      for (var j=0; j<colsB; ++j) {
        var str = ""
        var sum = 0
        for (var k=0; k<colsA; ++k) {
          if(k>0) {
            str+=" + "
          }
          //str += matrixA[i][k] + " \\times " + matrixB[k][j]
          str += matrixA[i][k]  + " \\times " + matrixB[k][j]
          sum += matrixA[i][k] * matrixB[k][j]
        }
        matrixRow.push(str)
        matrixRow2.push(sum)
      }
      matrixOut.push(matrixRow)
      matrixAnswer.push(matrixRow2)
    }

    output+= "$$" + latex_matrix(matrixOut) + "=$$<br>"
    output+= "$$" + latex_matrix(matrixAnswer) + ".$$<br>"
    output+= '<h3>LaTeX</h3>:<br><textarea rows="5" cols="80">'+output+'</textarea>'

		$("#calculateOutput").html(output)
		MathJax.Hub.Typeset()
  });

  $("#addButton").click(function(){
  		var rowsA = parseInt($("#rowsA").val())
		var rowsB = parseInt($("#rowsB").val())
		var colsA = parseInt($("#colsA").val())
		var colsB = parseInt($("#colsB").val())

    if( !$("#a0-0").val()) {
      $("#calculateOutput").html("Generate grids first.")
      return
    }

    if( colsA != colsB || rowsA != rowsB ) {
      $("#calculateOutput").html("To add matrix A and B must be the same size.")
      return
    }

    matrixA = read_matrix("a",rowsA,colsA)
    matrixB = read_matrix("b",rowsB,colsB)

		// Generate LaTex
		var output = "Add: <br>$$"
    output += latex_matrix(matrixA)
    output += " + "
    output += latex_matrix(matrixB)
    output += " =$$<br>"

    // multiply
    matrixOut = []
    matrixAnswer = []

    for (var i=0; i<rowsA; ++i) {
      matrixRow = []
      matrixRow2 = []
      for (var j=0; j<colsA; ++j) {
        matrixRow.push( matrixA[i][j]  + " + " + matrixB[i][j] )
        matrixRow2.push( matrixA[i][j] + matrixB[i][j] )
      }
      matrixOut.push(matrixRow)
      matrixAnswer.push(matrixRow2)
    }

    output+= "$$" + latex_matrix(matrixOut) + "=$$<br>"
    output+= "$$" + latex_matrix(matrixAnswer) + ".$$<br>"
    output+= '<h3>LaTeX</h3>:<br><textarea rows="5" cols="80">'+output+'</textarea>'

		$("#calculateOutput").html(output)
		MathJax.Hub.Typeset()
  });

  $("#subtractButton").click(function(){
      var rowsA = parseInt($("#rowsA").val())
    var rowsB = parseInt($("#rowsB").val())
    var colsA = parseInt($("#colsA").val())
    var colsB = parseInt($("#colsB").val())

    if( !$("#a0-0").val()) {
      $("#calculateOutput").html("Generate grids first.")
      return
    }

    if( colsA != colsB || rowsA != rowsB ) {
      $("#calculateOutput").html("To subtract matrix A and B must be the same size.")
      return
    }

    matrixA = read_matrix("a",rowsA,colsA)
    matrixB = read_matrix("b",rowsB,colsB)

    // Generate LaTex
    var output = "Subtract: <br>$$"
    output += latex_matrix(matrixA)
    output += " - "
    output += latex_matrix(matrixB)
    output += " =$$<br>"

    // multiply
    matrixOut = []
    matrixAnswer = []

    for (var i=0; i<rowsA; ++i) {
      matrixRow = []
      matrixRow2 = []
      for (var j=0; j<colsA; ++j) {
        matrixRow.push( matrixA[i][j]  + " - " + matrixB[i][j] )
        matrixRow2.push( matrixA[i][j] - matrixB[i][j] )
      }
      matrixOut.push(matrixRow)
      matrixAnswer.push(matrixRow2)
    }

    output+= "$$" + latex_matrix(matrixOut) + "=$$<br>"
    output+= "$$" + latex_matrix(matrixAnswer) + ".$$<br>"
    output+= '<h3>LaTeX</h3>:<br><textarea rows="5" cols="80">'+output+'</textarea>'

    $("#calculateOutput").html(output)
    MathJax.Hub.Typeset()
  });

});
