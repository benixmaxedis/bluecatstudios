const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

const particlesArray = [];
const colors = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.size -= 0.1;
    if (this.size < 0) this.size = 0;
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}

function createParticles(e) {
  const xPos = e.x;
  const yPos = e.y;

  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle(xPos, yPos));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    if (particlesArray[i].size <= 0.1) {
      particlesArray.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animateParticles);
}

canvas.addEventListener("click", createParticles);

canvas.addEventListener("mousemove", createParticles);

animateParticles();
