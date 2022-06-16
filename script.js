"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeVal = document.getElementById("size");
const clearBtn = document.getElementById("clear");
const colorBtn = document.getElementById("color");
let size = 20;
let color = "black";
let isDrawing = false;
let x = 0;
let y = 0;

decreaseBtn.addEventListener("click", () => {
  size -= 5;
  if (size < 10) size = 10;
  updateSize();
});

increaseBtn.addEventListener("click", () => {
  size += 5;
  if (size > 50) size = 50;
  updateSize();
});

function updateSize() {
  sizeVal.innerText = size;
}

colorBtn.addEventListener("change", (e) => {
  color = e.target.value;
});

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener("mousedown", (e) => {
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    line(x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
    circle(x, y);
  }
});

canvas.addEventListener("mouseup", (e) => {
  if (isDrawing) {
    line(x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

function circle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function line(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}
