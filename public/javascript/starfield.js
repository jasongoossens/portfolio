const particles = [];

function setup() {
  let starfield = createCanvas(window.innerWidth, window.innerHeight);
  starfield.style("display", "block");
  starfield.style("z-index", "-1");
  let x =
    width < 480 ? (windowWidth - width) / 2 : (windowWidth - width - 20) / 2;
  let y = (windowHeight - height) / 2;
  starfield.position(x, y);
  starfield.parent("home");

  const particlesAmount = Math.floor(window.innerWidth / 2);

  for (let i = 0; i < particlesAmount; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(30, 63, 102);
  let staticParticles = particles.slice(0, particles.length * 0.7);
  let flickeringParticles = particles.slice(particles.length * 0.7);
  staticParticles.forEach((p) => {
    p.drawStatic();
  });
  flickeringParticles.forEach((p) => {
    const brightness = random(0.3, 1);
    p.drawFlickering(brightness);
  });
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.size = random(0.01, 1);
  }

  drawStatic() {
    noStroke();
    fill("rgba(255,255,255, .8)");
    circle(this.pos.x, this.pos.y, this.size);
  }

  drawFlickering(randomBrightness) {
    noStroke();
    fill("rgba(255,255,255, " + randomBrightness + ")");
    circle(this.pos.x, this.pos.y, this.size);
  }
}
