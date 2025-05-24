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

// Example: Add your real info for contact, skills, projects, education, experiences
// You can use these objects to populate your site dynamically if needed

const myInfo = {
  name: "Mohamed Abdelaziz",
  phone: "+20 100 123 4567",
  email: "mohamed.abdelaziz@example.com",
  location: "Cairo, Egypt",
  linkedin: "https://www.linkedin.com/in/mohamed-abdelaziz",
  github: "https://github.com/mohamed-abdelaziz710",
  skills: [
    "Cybersecurity",
    "AI Tools Development",
    "Python",
    "JavaScript",
    "Linux",
    "Network Security",
    "Machine Learning",
    "Penetration Testing",
    "Cloud Security",
    "Quantum Computing (Basics)"
  ],
  projects: [
    {
      title: "AI Automation Suite",
      description: "منصة أتمتة تعتمد على الذكاء الاصطناعي لتحسين العمليات.",
      link: "https://github.com/mohamed-abdelaziz710/ai-automation-suite"
    },
    {
      title: "Secure Network Framework",
      description: "إطار عمل لتأمين الشبكات وحماية البيانات.",
      link: "https://github.com/mohamed-abdelaziz710/secure-network-framework"
    },
    {
      title: "Quantum Data Explorer",
      description: "أداة استكشاف البيانات بالمفاهيم الكمية.",
      link: "https://github.com/mohamed-abdelaziz710/quantum-data-explorer"
    }
  ],
  education: [
    {
      degree: "B.Sc. in Cybersecurity Engineering",
      university: "King Saud University (KSU)",
      location: "Riyadh, Saudi Arabia",
      year: "Expected 2026"
    }
  ],
  experiences: [
    {
      title: "Cybersecurity Intern",
      company: "CyberSec Solutions",
      location: "Cairo, Egypt",
      period: "Summer 2023",
      description: "Worked on penetration testing and vulnerability assessment for enterprise clients."
    },
    {
      title: "AI Tools Developer (Freelance)",
      company: "Self-employed",
      location: "Remote",
      period: "2022 - Present",
      description: "Developed custom AI-powered automation tools for small businesses."
    }
  ]
};
