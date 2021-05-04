export default function scalarAddition(matrix_1, scalar) {

  let matrix = matrix_1.map(object => ([...object]))

  matrix = findScalarAddition(matrix, scalar)
  let container = document.querySelector("#find-scalar-addition span")

  // generate ui
  $("#find-scalar-addition span").html("")
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

const findScalarAddition = (matrix, scalar) => {

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {

      // add scalar value
      matrix[i][j] = scalar + matrix[i][j]
    }
  }

  return matrix
}