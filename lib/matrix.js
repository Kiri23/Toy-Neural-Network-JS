// let m = new Matrix(3,2);

// Clase Matrix. Clase que se encarga de hacer todas las matrix operacione
// relacionadas al neural network
class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    // Make a 2d dimensional array. 
    this.data = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
  }

  // Convert an matrix from an array 
  static fromArray(arr) {
    return new Matrix(arr.length, 1).map((e, i) => arr[i]);
  }


  // Elemenet Wise subtraction 
  static subtract(a, b) {
    // Return a new Matrix a-b
    return new Matrix(a.rows, a.cols)
      .map((_, i, j) => a.data[i][j] - b.data[i][j]);
  }

  //Convert a matrix to array 
  toArray() {
    let arr = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        arr.push(this.data[i][j]);
      }
    }
    return arr;
  }

  // return a number betwen -1 and 1
  randomize() {
    // math random return a number betwen 0 and 1 
    return this.map(e => Math.random() * 2 - 1);
  }

  add(second_matrix,debug) {
    if (second_matrix instanceof Matrix) {
      if (debug){
        logger(`  There is going to be ${this.data.length} additions`)
      }
      return this.map((e, i, j) =>  e + second_matrix.data[i][j]);
    } else {
      // when second_matrix is a constant
      return this.map(e => e + second_matrix);
    }
  }

  // change row for columns 
  static transpose(matrix) {
    return new Matrix(matrix.cols, matrix.rows)
      .map((_, i, j) => matrix.data[j][i]);
  }

  static multiply(a, b,debug) {
    // Matrix product
    if (a.cols !== b.rows) {
      console.log('Columns of A must match rows of B.')
      return;
    }

    if(debug){
      logger(`   There is going to be ${a.cols} matrix multiplications:`)
    }

    return new Matrix(a.rows, b.cols)
      .map((e, i, j) => {
        // Dot product of values in col
        let sum = 0;
        for (let k = 0; k < a.cols; k++) {
          // row of a * colums of b 
          sum += a.data[i][k] * b.data[k][j];

        }
        return sum;
      });
  }

  multiply(n) {
    if (n instanceof Matrix) {
      // hadamard product
      // e is the this.matrix
      return this.map((e, i, j) => e * n.data[i][j]);
    } else {
      // Scalar product
      return this.map(e => e * n);
    }
  }

  map(func,debug) {
    if (debug){
      logger(`  ${(this.rows * this.cols)} time the function ${func.name} is going to be applied`)
    }
    // Apply a function to every element of matrix
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let val = this.data[i][j];
        this.data[i][j] = func(val, i, j);
      }
    }
    return this;
  }

  static map(matrix, func) {
    // Apply a function to every element of matrix
    return new Matrix(matrix.rows, matrix.cols)
      .map((e, i, j) => func(matrix.data[i][j], i, j));
  }

  print() {
    console.table(this.data);
    return this;
  }
}

//  hack to work in client mode 
if (typeof module !== 'undefined') {
  module.exports = Matrix;
}