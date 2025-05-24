// script.js for Smart VIP Card Theme

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTabs();
  initScrollAnimations();
  initHoverEffects();
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

// Enhanced Hover Effects (Example: Card Tilt)
function initHoverEffects() {
  // Add .smart-card selector for smart card effect
  const cards = document.querySelectorAll(".card, .panel, .skill-category, .project-item, .certification-item, .smart-card");

  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) * 0.03;
      const rotateY = (centerX - x) * 0.03;

      // Enhanced smart card effect
      if (card.classList.contains("smart-card")) {
        card.style.transform = `perspective(1200px) rotateX(${rotateX * 1.5}deg) rotateY(${rotateY * 1.5}deg) scale(1.06)`;
        card.style.boxShadow = "0 8px 32px 0 rgba(33,230,193,0.25), 0 1.5px 8px 0 rgba(0,0,0,0.12)";
      } else {
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        card.style.boxShadow = "";
      }
      card.style.transition = "transform 0.1s ease-out, box-shadow 0.2s";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
      card.style.boxShadow = "";
      card.style.transition = "transform 0.5s ease-in-out, box-shadow 0.4s";
    });
  });
}
