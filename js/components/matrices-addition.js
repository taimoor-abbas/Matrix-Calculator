export default function matricesAddition(matrix_1, matrix_2, m1Dimension, m2Dimension) {

  let container = $("#find-matrices-addition .js-target")

  if (m1Dimension[0] === m2Dimension[0] && m1Dimension[1] === m2Dimension[1]) {
    let matrix = findMatricesAddition(matrix_1, matrix_2, m1Dimension)

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
  } else container.html("not valid dimension for matrix addition").css("color", "red").removeClass("matrix")
}

const findMatricesAddition = (matrix_1, matrix_2, m1Dimension) => {

  let matrix = matrix_1.map(object => ([...object]))

  // adding matrix
  for (let i = 0; i < m1Dimension[0]; ++i)
    for (let j = 0; j < m1Dimension[1]; ++j)
      matrix[i][j] = matrix_1[i][j] + matrix_2[i][j];

  return matrix
}