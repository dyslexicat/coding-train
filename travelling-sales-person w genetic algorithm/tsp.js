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

function calcFitness() {
  let currentRecord = Infinity;
  for (let i = 0; i < population.length; i++) {
    let d = calcDistance(cities, population[i]);
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = population[i];
    }

    if (d < currentRecord) {
      currentRecord = d;
      currentBest = population[i];
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
    let orderA = pickOne(population, fitness);
    let orderB = pickOne(population, fitness);
    let order = crossover(orderA, orderB);
    mutate(order, 0.06);
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

function crossover(orderA, orderB) {
  let start = Math.floor(Math.random() * orderA.length);
  let end = Math.floor(Math.random() * (orderA.length - start)) + start + 1;
  let newOrder = orderA.slice(start, end);

  for (let i = 0; i < orderB.length; i++) {
    let city = orderB[i];
    if (!newOrder.includes(city)) {
      newOrder.push(city);
    }
  }

  return newOrder;
}

function mutate(order, mutationRate) {
  for (let i = 0; i < cities.length; i++) {
    if (Math.random() < mutationRate) {
      let i = Math.floor(Math.random() * order.length);
      let j = (i + 1) % totalCities;

      swap(order, i, j);
    }
  }
}
