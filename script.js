// script.js for Smart VIP Card Theme

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTabs();
  initScrollAnimations();
});

// Initialize Particles.js
function initParticles() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 35, density: { enable: true, value_area: 600 } },
        color: { value: ['#21D4FD', '#9B59B6', '#39FF14'] },
        shape: { type: 'circle' },
        opacity: { value: 0.25, random: true },
        size: { value: 3, random: true },
        move: { enable: true, speed: 1.2 }
      },
      interactivity: {
        events: { onhover: { enable: true, mode: 'repulse' } },
        modes: { repulse: { distance: 100 } }
      },
      retina_detect: true
    });
  }
}

// Tab functionality
function initTabs() {
  const buttons = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Activate button
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Show related content
      const target = btn.getAttribute('data-tab');
      contents.forEach(c => {
        c.id === target ? c.classList.add('active') : c.classList.remove('active');
      });
    });
  });
}

// Scroll reveal animations
function initScrollAnimations() {
  const elems = document.querySelectorAll('.scroll-animate');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    elems.forEach(el => obs.observe(el));
  } else {
    elems.forEach(el => el.classList.add('visible'));
  }
}
