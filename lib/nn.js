// Other techniques for learning
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function dsigmoid(y) {
  // return sigmoid(x) * (1 - sigmoid(x));
  return y * (1 - y);
}
// naming convetion ih -> input to hidden, ho -> hidden to output 
class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes,debug = false) {
    // inicializar variables 
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;

    // inicializar los weight
    this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
    
    // randomize los weight. 
    this.weights_ih.randomize();
    this.weights_ho.randomize();
    
    // inicializar los bias and randomize 
    this.bias_h = new Matrix(this.hidden_nodes, 1);
    this.bias_o = new Matrix(this.output_nodes, 1);
    this.bias_h.randomize();
    this.bias_o.randomize();
    this.setLearningRate();


    this.debug = debug;
    if (this.debug){
      let weight_computation = (this.input_nodes * this.hidden_nodes) + this.hidden_nodes // bias
      

      
      logger("Neural Network Architecture:")
      logger(`  Input nodes: ${this.input_nodes}`)
      logger(`  Hidden nodes: ${this.hidden_nodes}`)
      logger(`  Output nodes: ${this.output_nodes}`)
      logger(`  Learning Rate: ${this.learning_rate}`)
      logger(`  Number of weight and bias computation needed ~= ${weight_computation} multiplication plus bias`)
      logger("---------------------")
    }
    
  }

  predict(input_array, debugPredict = this.debug) {
    if (this.debug && debugPredict){
      logger("Predictions: ")
      logger("layer 1")
    }
    // Generating the Hidden Outputs
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs,debugPredict);
    hidden.add(this.bias_h,debugPredict);
    // activation function!
    hidden.map(sigmoid,debugPredict);

    if(this.debug && debugPredict){
      logger(`Hidden output`,true,hidden.data)
      logger("layer 2")
    }

    // Generating the output's output!
    let output = Matrix.multiply(this.weights_ho, hidden,debugPredict);
    output.add(this.bias_o,debugPredict);
    output.map(sigmoid,debugPredict);

    if(this.debug && debugPredict){
      logger("Prediction(guess)",true,output.data)
    }

    // Sending back to the caller!
    return output.toArray();
  }
  
  setLearningRate(learning_rate = 0.1) {
    this.learning_rate = learning_rate;    
  }

  train(input_array, target_array) {    
    // Generating the Hidden Outputs
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    // activation function!
    hidden.map(sigmoid);

    // Generating the output's output!
    let outputs = Matrix.multiply(this.weights_ho, hidden);
    outputs.add(this.bias_o);
    outputs.map(sigmoid);

    // Convert array to matrix object
    let targets = Matrix.fromArray(target_array);

    // Calculate the error
    // ERROR = TARGETS - OUTPUTS
    let output_errors = Matrix.subtract(targets, outputs);

    // let gradient = outputs * (1 - outputs);
    // Calculate gradient
    let gradients = Matrix.map(outputs, dsigmoid);
    gradients.multiply(output_errors);
    gradients.multiply(this.learning_rate);


    // Calculate deltas
    let hidden_T = Matrix.transpose(hidden);
    let weight_ho_deltas = Matrix.multiply(gradients, hidden_T);

    // Adjust the weights by deltas
    this.weights_ho.add(weight_ho_deltas);
    // Adjust the bias by its deltas (which is just the gradients)
    this.bias_o.add(gradients);

    // Calculate the hidden layer errors
    let who_t = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(who_t, output_errors);

    // Calculate hidden gradient
    let hidden_gradient = Matrix.map(hidden, dsigmoid);
    hidden_gradient.multiply(hidden_errors);
    hidden_gradient.multiply(this.learning_rate);

    // Calcuate input->hidden deltas
    let inputs_T = Matrix.transpose(inputs);
    let weight_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);

    this.weights_ih.add(weight_ih_deltas);
    // Adjust the bias by its deltas (which is just the gradients)
    this.bias_h.add(hidden_gradient);

    // outputs.print();
    // targets.print();
    // error.print();
  }

}
