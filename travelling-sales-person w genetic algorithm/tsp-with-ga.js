function factorial(n) {
  if (n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

function shuffle(arr, num) {
  for (let n = 0; n < num; n++) {
    let i = Math.floor(Math.random() * arr.length);
    let j = Math.floor(Math.random() * arr.length);
    swap(arr, i, j);
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function nextOrder() {
  let largestI = -1;
  for (let i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1]) {
      largestI = i;
    }
  }

  if (largestI === -1) {
    clearInterval(timer);
  }

  let largestJ = -1;
  for (let j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) {
      largestJ = j;
    }
  }

  swap(order, largestI, largestJ);
  let endArray = order.splice(largestI + 1);
  endArray.reverse();
  order = order.concat(endArray);
}

function calcFitness() {
  for (let i = 0; i < population.length; i++) {
    let d = calcDistance(cities, population[i]);
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = population[i];
    }
    fitness[i] = 1 / d + 1;
  }
}

function normalizeFitness() {
  let sum = 0;
  for (let i = 0; i < fitness.length; i++) {
    sum += fitness[i];
  }

  for (let i = 0; i < fitness.length; i++) {
    fitness[i] = fitness[i] / sum;
  }
}

function nextGeneration() {
  let newPopulation = [];
  for (let i = 0; i < population.length; i++) {
    let order = pickOne(population, fitness);
    mutate(order);
    newPopulation[i] = order;
  }

  population = newPopulation;
}

function pickOne(arr, prob) {
  let index = 0;
  let r = Math.random();

  while (r > 0) {
    r = r - prob[index];
    index++;
  }
  index--;
  return arr[index].slice();
}

function mutate(order, mutationRate) {
  let i = Math.floor(Math.random() * order.length);
  let j = Math.floor(Math.random() * order.length);
  swap(order, i, j);
}
