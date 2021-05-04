export default function inverse(matrix_1, m1Dimension) {

  let matrix = matrix_1.map(object => ([...object]))

  if (m1Dimension[0] === m1Dimension[1]) {
    $("#find-inverse span").html("").css("color", "black")
    $("#find-inverse .js-target").addClass("matrix")
  }
  else {
    $("#find-inverse span").html("not a square matrix").css("color", "red")
    $("#find-inverse .js-target").removeClass("matrix")
    return
  }

  matrix = matrixInvert(matrix)
  let container = document.querySelector("#find-inverse span")

  // generate ui
  $("#find-inverse span").html("")
  if (matrix)
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {

        let element = document.createElement("span")
        element.innerHTML = parseFloat(matrix[i][j])
        element.className = "p-5"
        container.appendChild(element)
      }

      // line break after row
      container.appendChild(document.createElement("br"))
    }
}

const matrixInvert = (matrix) => {

  //if the matrix isn't square: exit
  if (matrix.length !== matrix[0].length) { return; }

  //create the identity matrix (invMatrix), and a copy (C) of the original
  var i = 0, ii = 0, j = 0, dim = matrix.length, e = 0, t = 0;
  var invMatrix = [], C = [];
  for (i = 0; i < dim; i += 1) {
    // Create the row
    invMatrix[invMatrix.length] = [];
    C[C.length] = [];
    for (j = 0; j < dim; j += 1) {

      //if we're on the diagonal, put a 1 (for identity)
      if (i == j) { invMatrix[i][j] = 1; }
      else { invMatrix[i][j] = 0; }

      // Also, make the copy of the original
      C[i][j] = matrix[i][j];
    }
  }

  // Perform elementary row operations
  for (i = 0; i < dim; i += 1) {
    // get the element e on the diagonal
    e = C[i][i];

    // if we have a 0 on the diagonal (we'll need to swap with a lower row)
    if (e == 0) {
      //look through every row below the i'th row
      for (ii = i + 1; ii < dim; ii += 1) {
        //if the ii'th row has a non-0 in the i'th col
        if (C[ii][i] != 0) {
          //it would make the diagonal have a non-0 so swap it
          for (j = 0; j < dim; j++) {
            e = C[i][j];       //temp store i'th row
            C[i][j] = C[ii][j];//replace i'th row by ii'th
            C[ii][j] = e;      //repace ii'th by temp
            e = invMatrix[i][j];       //temp store i'th row
            invMatrix[i][j] = invMatrix[ii][j];//replace i'th row by ii'th
            invMatrix[ii][j] = e;      //repace ii'th by temp
          }
          //don't bother checking other rows since we've swapped
          break;
        }
      }
      //get the new diagonal
      e = C[i][i];
      //if it's still 0, not invertable (error)
      if (e == 0) { return }
    }

    // Scale this row down by e (so we have a 1 on the diagonal)
    for (j = 0; j < dim; j++) {
      C[i][j] = C[i][j] / e; //apply to original matrix
      invMatrix[i][j] = invMatrix[i][j] / e; //apply to identity
    }

    // Subtract this row (scaled appropriately for each row) from ALL of
    // the other rows so that there will be 0's in this column in the
    // rows above and below this one
    for (ii = 0; ii < dim; ii++) {
      // Only apply to other rows (we want a 1 on the diagonal)
      if (ii == i) { continue; }

      // We want to change this element to 0
      e = C[ii][i];

      // Subtract (the row above(or below) scaled by e) from (the
      // current row) but start at the i'th column and assume all the
      // stuff left of diagonal is 0 (which it should be if we made this
      // algorithm correctly)
      for (j = 0; j < dim; j++) {
        C[ii][j] -= e * C[i][j]; //apply to original matrix
        invMatrix[ii][j] -= e * invMatrix[i][j]; //apply to identity
      }
    }
  }

  //we've done all operations, C should be the identity
  //matrix invMatrix should be the inverse:

  return invMatrix;
}