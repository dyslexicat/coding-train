const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

class City {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let cities = [];
let totalCities = 10;
let recordDistance = Infinity;
let bestEver;
let currentBest;
let population = [];
let popSize = 500;
let fitness = [];

function setup() {
  let order = [];
  for (let i = 0; i < totalCities; i++) {
    let randomX = Math.floor(Math.random() * width);
    let randomY = Math.floor(Math.random() * (height / 2));
    let city = new City(randomX, randomY);
    cities.push(city);
    order[i] = i;
  }

  for (let i = 0; i < popSize; i++) {
    population[i] = order.slice();
    shuffle(population[i], 100);
  }
}

function draw() {
  ctx.lineWidth = 1;
  drawCities();

  ctx.lineWidth = 3;
  ctx.strokeStyle = "#3e3e";
  drawVertices(bestEver);

  ctx.translate(0, height / 2);
  ctx.lineWidth = 1;
  drawCities();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#fff";
  drawVertices(currentBest);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function drawCities() {
  let r = 5;
  cities.forEach((city) => {
    ctx.beginPath();
    ctx.arc(city.x, city.y, r, 0, 2 * Math.PI);
    ctx.strokeStyle = "#fff";
    ctx.stroke();
  });
}

function drawVertices(order) {
  ctx.beginPath();
  ctx.moveTo(cities[order[0]].x, cities[order[0]].y);
  for (let i = 1; i < order.length; i++) {
    let n = order[i];
    ctx.lineTo(cities[n].x, cities[n].y);
  }
  ctx.stroke();
}

function calcDistance(arr, order) {
  let sum = 0;
  for (let i = 0; i < order.length - 1; i++) {
    let cityIndexA = order[i];
    let cityA = arr[cityIndexA];
    let cityIndexB = order[i + 1];
    let cityB = arr[cityIndexB];

    let d = getDistance(cityA, cityB);
    sum += d;
  }
  return sum;
}

function getDistance(a, b) {
  return Math.sqrt(
    Math.pow(Math.abs(a.x - b.x), 2) + Math.pow(Math.abs(a.y - b.y), 2)
  );
}

setup();

const timer = window.setInterval(() => {
  // let i = Math.floor(Math.random() * cities.length);
  // let j = Math.floor(Math.random() * cities.length);

  ctx.clearRect(0, 0, width, height);

  calcFitness();
  normalizeFitness();
  draw();
  nextGeneration();
}, 100);
