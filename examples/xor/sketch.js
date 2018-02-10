let nn;
let training_data = [{
  inputs: [0, 0],
  targets: [0]
}, {
  inputs: [1, 0],
  targets: [1]
}, {
  inputs: [0, 1],
  targets: [1]
}, {
  inputs: [1, 1],
  targets: [0]
}];

nn = new NeuralNetwork(2,12,1,true)
// nn.setLearningRate(0.50);

function setup(){
  for (let index = 0; index < 50000; index++) {
      // choose a random input 
      let data = random(training_data)
      nn.train(data.inputs,data.targets)    
  }
  console.log(nn.predict([1,0]));
  console.log(nn.predict([0,1],false));
  console.log(nn.predict([0,0],false));
  console.log(nn.predict([1,1],false));
}