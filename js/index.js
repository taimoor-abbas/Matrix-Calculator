import determinant from "./components/matrix-determinant.js"
import transpose from "./components/matrix-transpose.js"
import inverse from "./components/matrix-inverse.js"
import scalarAddition from "./components/matrix-scalar-addition.js"
import scalarMultiplication from "./components/matrix-scalar-multiplication.js"
import matricesMultplication from "./components/matrices-multiplication.js"
import matricesAddition from "./components/matrices-addition.js"
import matricesSubtraction from "./components/matrices-subtraction.js"

let mQuantity = 0
let m1Dimension = [2, 2]
let m2Dimension = [2, 2]
let scalarAdditionInput = $("#scalar-addition-input")
let scalarAdditionValue = parseFloat($("#scalar-addition-input").val())
let scalarMultiplicationInput = $("#scalar-multiplication-input")
let scalarMultiplicationValue = parseFloat($("#scalar-multiplication-input").val())
const maxDimensions = 5

let matrix_1 = new Array()
let matrix_2 = new Array()

// target by ids
let r1 = $("#row-1")
let r2 = $("#row-2")
let c1 = $("#column-1")
let c2 = $("#column-2")

// set number of matrices

$("#dimension, #matrix-values, #matrix-actions").addClass("d-none")

$("#quantity-1").click(() => {
  mQuantity = 1

  // make section visible on matrix quantity
  $("#dimension, #matrix-values, #matrix-actions").removeClass("d-none")
  $("#dimension-2, #matrix-2, #multiple-martix-actions").addClass("d-none")
  $("#single-martix-actions").removeClass("d-none")
  $("#multiple-martix-actions").addClass("d-none")
  matrixGenerator(m1Dimension, "#matrix-1")
})

$("#quantity-2").click(() => {
  mQuantity = 2

  // make section visible on matrix quantity
  $("#dimension, #matrix-values, #matrix-actions").removeClass("d-none")
  $("#dimension-2, #matrix-2, #multiple-martix-actions").removeClass("d-none")
  $("#single-martix-actions").addClass("d-none")
  $("#multiple-martix-actions").removeClass("d-none")
  matrixGenerator(m1Dimension, "#matrix-1")
  matrixGenerator(m1Dimension, "#matrix-2")
})

// get dimension
r1.on("change", () => {
  m1Dimension[0] = parseInt(r1.val())
  matrixGenerator(m1Dimension, "#matrix-1")
})
c1.on("change", () => {
  m1Dimension[1] = parseInt(c1.val())
  matrixGenerator(m1Dimension, "#matrix-1")
})

r2.on("change", () => {
  m2Dimension[0] = parseInt(r2.val())
  matrixGenerator(m2Dimension, "#matrix-2")
})
c2.on("change", () => {
  m2Dimension[1] = parseInt(c2.val())
  matrixGenerator(m2Dimension, "#matrix-2")
})

scalarAdditionInput.on("input", () => {
  scalarAdditionValue = parseFloat($("#scalar-addition-input").val())
  scalarAddition(matrix_1, scalarAdditionValue)
})

scalarMultiplicationInput.on("input", () => {
  scalarMultiplicationValue = parseFloat($("#scalar-multiplication-input").val())
  scalarMultiplication(matrix_1, scalarMultiplicationValue)
})

const matrixGenerator = (dimension, id) => {
  let element = $(id)
  let n = id[id.length - 1]
  let tempArray = new Array()

  n == 1 && (matrix_1 = []) //reset m1
  n == 2 && (matrix_2 = []) //reset m2

  // empty matrix div
  element.css("grid-template-columns", `repeat(${dimension[1]}, 1fr)`).html("")

  for (var i = 0; i < dimension[0]; i++) {
    tempArray = []
    for (var j = 0; j < dimension[1]; j++) {

      // create input element with id and type
      let input = document.createElement("input")
      input.id = `m${n}-r${i}-c${j}`  //set dynamic id
      input.type = "number"

      // append in matrix div
      element.append(input)
      tempArray.push(0)
    }
    n == 1 && matrix_1.push(tempArray) //add row in m1
    n == 2 && matrix_2.push(tempArray) //add row in m2
  }
  monitorInputs(n, dimension)
}

const monitorInputs = (n, dimension) => {

  $(`#matrix-${n} input`).on("input", (e) => {
    let id = e.target.id
    // let r = id[4]       //row number
    // let c = id[7]       //column number

    for (var i = 0; i < dimension[0]; i++) {
      for (var j = 0; j < dimension[1]; j++) {
        // fill matrix by targeting input ids
        n == 1 && (matrix_1[i][j] = parseFloat($(`#matrix-${n} #m${n}-r${i}-c${j}`).val()))
        n == 2 && (matrix_2[i][j] = parseFloat($(`#matrix-${n} #m${n}-r${i}-c${j}`).val()))
      }
    }

    // one matrix actions
    if (n == 1) {
      determinant(matrix_1, m1Dimension)
      transpose(matrix_1, m1Dimension)
      inverse(matrix_1, m1Dimension)
      scalarAddition(matrix_1, scalarAdditionValue)
      scalarMultiplication(matrix_1, scalarMultiplicationValue)
    }

    if (matrix_2[0, 0]) { //if second matrix even single matrix exist
      matricesMultplication(matrix_1, matrix_2, m1Dimension, m2Dimension, "")
      matricesMultplication(matrix_2, matrix_1, m2Dimension, m1Dimension, "reverse")
      matricesAddition(matrix_1, matrix_2, m1Dimension, m2Dimension)
      matricesSubtraction(matrix_1, matrix_2, m1Dimension, m2Dimension, "")
      matricesSubtraction(matrix_2, matrix_1, m2Dimension, m1Dimension, "reverse")
    }

    // if (n == 2 ) {
    // }

  })
}





// const resetValue = (matrix, id) => {
//   let n = id[id.length - 1]         //target matrix by splitting id (last number)

//   for (var i = 0; i < dimension[0]; i++) {
//     for (var j = 0; j < dimension[1]; j++) {
//       matrix[i][j] = parseInt($(`#matrix-${n} #m${n}-r${i}-c${j}`).val())
//     }
//   }

//   return matrix
// }

// $(document).click(() => {
// })





// m1Dimension = [2, 4];
// // set base matrix
// matrix = [
//   [1, 2, 3, 4, 0],
//   [5, 6, 7, 8, 0],
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0]
// ]
// m1Dimension = [4, 2];
// matrix = [
//   [1, 5, 0, 0, 0],
//   [2, 6, 0, 0, 0],
//   [3, 7, 0, 0, 0],
//   [4, 8, 0, 0, 0],
//   [0, 0, 0, 0, 0]
// ]
// m1Dimension = [3, 3];
// matrix = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ]
// scalarAddition(matrix, m1Dimension, scalarAdditionInput)




// // inverse(matrix, m1Dimension)
// // Multiplying matrix a and b and storing in array mult.
// for(i = 0; i < r1; ++i)
// for(j = 0; j < c2; ++j)
//     for(k = 0; k < c1; ++k)
//     {
//         mult[i][j] += a[i][k] * b[k][j];
//     }


// let m1 = [
//   [1, 2],
//   [3, 4],
// ]
// let m2 = [
//   [5, 6],
//   [7, 8],
// ]
// console.log(m1Dimension)
// console.log(m2Dimension)

// matricesMultplication(m1, m2, m1Dimension, m2Dimension)
