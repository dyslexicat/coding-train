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
let totalCities = 6;
let recordDistance;
let bestEver;
let order = [];

function setup() {
  for (let i = 0; i < totalCities; i++) {
    let randomX = Math.floor(Math.random() * width);
    let randomY = Math.floor(Math.random() * height);
    let city = new City(randomX, randomY);
    cities.push(city);
    order[i] = i;
  }

  let d = calcDistance(cities, order);
  recordDistance = d;
  bestEver = order.slice();
}

function draw() {
  let r = 5;

  ctx.lineWidth = 1;
  cities.forEach((city) => {
    ctx.beginPath();
    ctx.arc(city.x, city.y, r, 0, 2 * Math.PI);
    ctx.strokeStyle = "#fff";
    ctx.stroke();
  });

  drawVertices(order);

  ctx.lineWidth = 3;
  ctx.strokeStyle = "#3e3e";
  drawVertices(bestEver);
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
  draw();
  nextOrder();
  // swap(cities, i, j);

  let d = calcDistance(cities, order);
  if (d < recordDistance) {
    recordDistance = d;
    bestEver = order.slice();
    // console.log(recordDistance);
  }
}, 100);
