export default function determinant(matrix_1, m1Dimension) {
  let matrix = matrix_1.map(object => ([...object]))

  m1Dimension[0] === m1Dimension[1]
    ? $("#find-determinant span").html(findDeterminant(matrix, m1Dimension[0])).css("color", "black")
    : $("#find-determinant span").html("not a square matrix").css("color", "red")
}

const findDeterminant = (matrix, n) => {

  let num1,
    num2,
    det = 1,
    index,
    total = 1

  // temporary array for storing row
  let temp = [n + 1]

  // loop for traversing the diagonal elements
  for (let i = 0; i < n; i++) {
    index = i // initialize the index

    // finding the index which has non zero value
    if (!matrix[index][i]) return 0

    while (matrix[index][i] == 0 && index < n) {
      index++
    }
    if (index == n) continue     // if there is non zero element , the determinat of matrix as zero

    if (index != i) {
      // loop for swaping the diagonal element row and
      // index row
      for (let j = 0; j < n; j++) {
        let ahm_x = matrix[index][j]
        matrix[index][j] = matrix[i][j]
        matrix[i][j] = ahm_x
      }
      // determinant sign changes when we shift rows
      // go through determinant properties
      det = det * Math.pow(-1, index - i);
    }

    // storing the values of diagonal row elements
    for (let j = 0; j < n; j++) {
      temp[j] = matrix[i][j];
    }
    // traversing every row below the diagonal element
    for (let j = i + 1; j < n; j++) {
      num1 = temp[i]; // value of diagonal element
      num2 = matrix[j][i]; // value of next row element

      // traversing every column of row
      // and multiplying to every row
      for (let k = 0; k < n; k++) {
        // multiplying to make the diagonal
        // element and next row element equal
        matrix[j][k]
          = (num1 * matrix[j][k]) - (num2 * temp[k]);
      }
      total = total * num1; // Det(kA)=kDet(A);
    }
  }

  // mulitplying the diagonal elements to get determinant
  for (let i = 0; i < n; i++) {
    det = det * matrix[i][i];
  }

  return (det / total); // Det(kA)/k=Det(A);
}