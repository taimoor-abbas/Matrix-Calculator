export default function transpose(matrix_1, dimension) {

  let matrix = findTranspose(matrix_1, dimension)
  let container = document.querySelector("#find-transpose span")

  // generate ui
  $("#find-transpose span").html("")
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {

      let element = document.createElement("span")
      element.innerHTML = parseInt(matrix[i][j])
      element.className = "p-5"
      container.appendChild(element)
    }

    // line break after row
    container.appendChild(document.createElement("br"))
  }
}

const findTranspose = (matrix_1, dimension) => {
  let matrix = new Array()

  for (var i = 0; i < dimension[1]; i++) {
    // create inner array
    let x = new Array()
    for (var j = 0; j < dimension[0]; j++) {
      // push row element to column inner array
      x.push(matrix_1[j][i])
    }
    // push to main array
    matrix.push(x)
  }

  return (matrix)
}
