export default function matricesMultplication(matrix_1, matrix_2, m1Dimension, m2Dimension, direction) {
  direction == "reverse" && (direction = "-reverse") //to add -reverse class for output target div
  let container = $(`#find-matrices-multplication${direction} .js-target`)

  if (m1Dimension[1] === m2Dimension[0]) {
    let matrix = findMatricesMultplication(matrix_1, matrix_2, m1Dimension, m2Dimension)

    container.html("").css("color", "black").addClass("matrix")
    if (matrix)
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {

          let element = document.createElement("span")
          element.innerHTML = parseFloat(matrix[i][j])
          element.className = "p-5"
          container.append(element)
        }

        // line break after row
        container.append(document.createElement("br"))
      }
  } else container.html("not valid dimension for matrix multiplication").css("color", "red").removeClass("matrix")
}

const findMatricesMultplication = (matrix_1, matrix_2, m1Dimension, m2Dimension) => {

  let matrix = matrix_1.map(object => ([...object]))

  // multiplying matrix
  for (let i = 0; i < m1Dimension[0]; ++i) {
    for (let j = 0; j < m2Dimension[1]; ++j) {
      matrix[i][j] = 0
      for (let k = 0; k < m1Dimension[1]; ++k) {
        matrix[i][j] += matrix_1[i][k] * matrix_2[k][j];
      }
    }
  }
  return matrix
}