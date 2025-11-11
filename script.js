window.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }
  });
});
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('overlay');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  overlay.classList.toggle('active');
});
overlay.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navLinks.classList.remove('active');
  overlay.classList.remove('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
  });
});

// Custom Smooth Scroll
function smoothScroll(target, duration) {
  const targetElement = document.querySelector(target);
  if (!targetElement) return;

  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80; // 80px for header
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    smoothScroll(targetId, 1000); // 1000ms = 1 second duration
  });
});

// Confetti Effect
const calendarioIcon = document.getElementById('calendario-icon');
const confettiCanvas = document.getElementById('confetti-canvas');
const confettiCtx = confettiCanvas.getContext('2d');
let confettiParticles = [];
let animationFrameId;

const colors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3',
    '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
    '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'
];

function ConfettiParticle() {
    this.x = Math.random() * confettiCanvas.width;
    this.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
    this.size = Math.random() * 10 + 5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speed = Math.random() * 3 + 1;
    this.opacity = 1;
    this.angle = Math.random() * 360;
    this.angularSpeed = Math.random() * 0.5 - 0.25;
}

ConfettiParticle.prototype.update = function() {
    this.y += this.speed;
    this.angle += this.angularSpeed;
    if (this.y > confettiCanvas.height) {
        this.y = -this.size;
        this.x = Math.random() * confettiCanvas.width;
    }
};

ConfettiParticle.prototype.draw = function() {
    confettiCtx.save();
    confettiCtx.translate(this.x, this.y);
    confettiCtx.rotate(this.angle * Math.PI / 180);
    confettiCtx.fillStyle = this.color;
    confettiCtx.globalAlpha = this.opacity;
    confettiCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    confettiCtx.restore();
};

function createConfetti() {
    confettiParticles = [];
    for (let i = 0; i < 100; i++) {
        confettiParticles.push(new ConfettiParticle());
    }
}

function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    animationFrameId = requestAnimationFrame(animateConfetti);
}

calendarioIcon.addEventListener('mouseover', () => {
    confettiCanvas.width = calendarioIcon.parentElement.parentElement.offsetWidth;
    confettiCanvas.height = calendarioIcon.parentElement.parentElement.offsetHeight;
    createConfetti();
    animateConfetti();
});

calendarioIcon.addEventListener('mouseout', () => {
    cancelAnimationFrame(animationFrameId);
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
});


