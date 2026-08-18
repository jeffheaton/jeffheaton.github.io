function read_matrix(prefix,rows,cols) {
  var matrix = []
  for(var row=0;row<rows;row++) {
    var matrix_row = []
    for(var col=0;col<cols;col++) {
      var name = prefix+row+"-"+col
      var value = parseFloat(document.getElementById(name).value)
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

document.addEventListener('DOMContentLoaded', function(){
  document.getElementById("generateButton").addEventListener('click', function(){
  	var rowsA = parseInt(document.getElementById("rowsA").value)
		var rowsB = parseInt(document.getElementById("rowsB").value)
		var colsA = parseInt(document.getElementById("colsA").value)
		var colsB = parseInt(document.getElementById("colsB").value)

		if( rowsA<1 || rowsB<1 || rowsA>25 || rowsB>25) {
			document.getElementById("gridsOutput").innerHTML = "Rows must be between 1 and 25"
			return
		}

		if( colsA<1 || colsB<1 || colsA>25 || colsB>25) {
			document.getElementById("gridsOutput").innerHTML = "Columns must be between 1 and 25"
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



    	document.getElementById("gridsOutput").innerHTML = output
      document.getElementById("calculateOutput").innerHTML = ""
  });

  document.getElementById("multiplyButton").addEventListener('click', function(){
  		var rowsA = parseInt(document.getElementById("rowsA").value)
		var rowsB = parseInt(document.getElementById("rowsB").value)
		var colsA = parseInt(document.getElementById("colsA").value)
		var colsB = parseInt(document.getElementById("colsB").value)

    var a00 = document.getElementById("a0-0")
    if( !a00 || !a00.value) {
      document.getElementById("calculateOutput").innerHTML = "Generate grids first."
      return
    }

    if( colsA != rowsB) {
      document.getElementById("calculateOutput").innerHTML = "To multiply the count of columns for A must be the same as the rows of B."
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

		document.getElementById("calculateOutput").innerHTML = output
		MathJax.Hub.Typeset()
  });

  document.getElementById("addButton").addEventListener('click', function(){
  		var rowsA = parseInt(document.getElementById("rowsA").value)
		var rowsB = parseInt(document.getElementById("rowsB").value)
		var colsA = parseInt(document.getElementById("colsA").value)
		var colsB = parseInt(document.getElementById("colsB").value)

    var a00 = document.getElementById("a0-0")
    if( !a00 || !a00.value) {
      document.getElementById("calculateOutput").innerHTML = "Generate grids first."
      return
    }

    if( colsA != colsB || rowsA != rowsB ) {
      document.getElementById("calculateOutput").innerHTML = "To add matrix A and B must be the same size."
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

		document.getElementById("calculateOutput").innerHTML = output
		MathJax.Hub.Typeset()
  });

  document.getElementById("subtractButton").addEventListener('click', function(){
      var rowsA = parseInt(document.getElementById("rowsA").value)
    var rowsB = parseInt(document.getElementById("rowsB").value)
    var colsA = parseInt(document.getElementById("colsA").value)
    var colsB = parseInt(document.getElementById("colsB").value)

    var a00 = document.getElementById("a0-0")
    if( !a00 || !a00.value) {
      document.getElementById("calculateOutput").innerHTML = "Generate grids first."
      return
    }

    if( colsA != colsB || rowsA != rowsB ) {
      document.getElementById("calculateOutput").innerHTML = "To subtract matrix A and B must be the same size."
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

    document.getElementById("calculateOutput").innerHTML = output
    MathJax.Hub.Typeset()
  });

});
