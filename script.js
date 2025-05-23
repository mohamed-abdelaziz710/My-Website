// Enhanced Spaceship UI/UX Theme JavaScript

document.addEventListener("DOMContentLoaded", function () {
  initScrollAnimations(); // Enhanced scroll animations
  initChat(); // Existing chat functionality (UI improved via CSS)
  initMobileMenu(); // Existing mobile menu (UI improved via CSS)
  initLanguageToggle(); // Existing language toggle (UI improved via CSS)
  initParticles(); // Updated particle configuration
  initHeroEffects(); // Added effects for hero section
  initHoverEffects(); // Added subtle hover effects
  createQuantumMatrix(); // New quantum matrix animation
});

// 1. Enhanced Scroll Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".scroll-animate");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Optional: Unobserve after animation to save resources
            // observerInstance.unobserve(entry.target);
          }
          // Optional: Reset animation if element scrolls out of view
          // else {
          //   entry.target.classList.remove("visible");
          // }
        });
      },
      {
        threshold: 0.15, // Trigger a bit earlier/later if needed
        // rootMargin: "0px 0px -50px 0px" // Adjust trigger margin
      }
    );

    animatedElements.forEach((el) => {
      observer.observe(el);
    });
  } else {
    // Fallback for browsers without IntersectionObserver (rare)
    animatedElements.forEach((el) => {
      el.classList.add("visible");
    });
  }
}

// 2. Hero Section Effects (Example: Subtle Parallax/Mouse Interaction)
function initHeroEffects() {
  const heroVisual = document.querySelector(".hero-visual .futuristic-sphere");
  const heroSection = document.querySelector(".hero-section");

  if (heroVisual && heroSection) {
    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element.
      const y = e.clientY - rect.top; // y position within the element.

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) * 0.01; // Adjust multiplier for sensitivity
      const deltaY = (y - centerY) * 0.01;

      // Apply a subtle tilt effect
      heroVisual.style.transform = `perspective(1000px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg) scale(1.05)`;
      heroVisual.style.transition = "transform 0.1s ease-out"; // Smooth transition
    });

    heroSection.addEventListener("mouseleave", () => {
      heroVisual.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)";
      heroVisual.style.transition = "transform 0.5s ease-in-out"; // Slower return transition
    });
  }

  // Optional: Add JS-driven typing/glitch effect if CSS isn't sufficient
  // (Current implementation uses CSS for typing effect)
}

// 3. Enhanced Hover Effects (Example: Card Tilt)
function initHoverEffects() {
  const cards = document.querySelectorAll(".card, .panel, .skill-category, .project-item, .certification-item");

  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) * 0.03; // Adjust sensitivity
      const rotateY = (centerX - x) * 0.03;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`; // Combine with existing hover scale
      card.style.transition = "transform 0.1s ease-out";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"; // Reset transform
      card.style.transition = "transform 0.5s ease-in-out";
    });
  });
}

// 4. Chat Functionality (Improved UI Interaction)
function initChat() {
  const chatBubble = document.getElementById("chatBubble");
  const chatWindow = document.getElementById("chatWindow");
  const closeChat = document.getElementById("closeChat");
  const messageInput = document.getElementById("messageInput");
  const sendMessage = document.getElementById("sendMessage");
  const chatMessages = document.getElementById("chatMessages");

  if (!chatBubble || !chatWindow || !closeChat || !messageInput || !sendMessage || !chatMessages) {
    console.warn("Chat elements not found.");
    return;
  }

  // Add classes for CSS transitions
  chatWindow.classList.add("chat-window-transition");

  chatBubble.addEventListener("click", function () {
    // chatWindow.style.display = "flex"; // Replaced by class toggle
    chatWindow.classList.add("open");
    chatBubble.style.display = "none";
    // Scroll to bottom after animation
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 300); // Match CSS transition duration
  });

  closeChat.addEventListener("click", function () {
    // chatWindow.style.display = "none"; // Replaced by class toggle
    chatWindow.classList.remove("open");
    chatBubble.style.display = "flex";
  });

  function appendMessage(message, type) {
    const messageWrapper = document.createElement("div");
    messageWrapper.className = `message ${type}-message message-animate`; // Add animation class

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";
    messageContent.textContent = message;

    const messageTime = document.createElement("div");
    messageTime.className = "message-time";
    messageTime.textContent = "Just now"; // Or format timestamp

    messageWrapper.appendChild(messageContent);
    messageWrapper.appendChild(messageTime);
    chatMessages.appendChild(messageWrapper);

    // Ensure scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
      const typingIndicator = document.createElement("div");
      typingIndicator.className = "message bot-message typing-indicator";
      typingIndicator.innerHTML = 
          `<div class="message-content">
              <span class="dot"></span><span class="dot"></span><span class="dot"></span>
           </div>`;
      chatMessages.appendChild(typingIndicator);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return typingIndicator; // Return reference to remove later
  }

  function handleSendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText === "") return;

    appendMessage(messageText, "user");
    messageInput.value = "";

    const isRTL = document.body.classList.contains("rtl");
    const typingIndicatorElement = showTypingIndicator();

    // --- Backend Fetch (Keep existing logic) ---
    fetch("https://0e45fe78-86ad-4c8f-b665-f561edd3e592-00-ezbtmwl50c4e.riker.replit.dev:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: messageText }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        if (typingIndicatorElement.parentNode === chatMessages) {
            chatMessages.removeChild(typingIndicatorElement);
        }
        let reply = "";
        // Safely access nested properties
        if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          reply = data.candidates[0].content.parts[0].text;
        } else {
          // Fallback messages
          const fallbackMessagesEN = [
            "Sorry, there was a connection error. You can reach me through the social media platforms listed in the contact section.",
            "I'm experiencing some technical issues at the moment. I'll be back soon! 🔧",
          ];
          const fallbackMessagesAR = [
            "عذراً، حدث خطأ في الاتصال. يمكنك التواصل معي عبر وسائل التواصل الاجتماعي المذكورة في قسم الاتصال.",
            "أواجه بعض المشاكل التقنية حالياً. سأكون متاحاً قريباً! 🔧",
          ];
          reply = (isRTL ? fallbackMessagesAR : fallbackMessagesEN)[
            Math.floor(Math.random() * 2)
          ];
        }
        appendMessage(reply, "bot");
      })
      .catch((error) => {
        console.error("Error connecting to backend:", error);
        if (typingIndicatorElement.parentNode === chatMessages) {
            chatMessages.removeChild(typingIndicatorElement);
        }
        // Error messages
        const errorMessagesEN = [
          "Sorry, there seems to be an issue connecting to the server. You can reach me directly through social media. 🔌",
          "I can't reach the server right now. Could you try again later? 🛠️",
        ];
        const errorMessagesAR = [
          "عذراً، يبدو أن هناك مشكلة في الاتصال بالخادم. يمكنك التواصل معي مباشرة عبر وسائل التواصل الاجتماعي. 🔌",
          "لا يمكنني الوصول إلى الخادم حالياً. هل يمكنك المحاولة مرة أخرى لاحقاً؟ 🛠️",
        ];
        const errorMessage = (isRTL ? errorMessagesAR : errorMessagesEN)[
          Math.floor(Math.random() * 2)
        ];
        appendMessage(errorMessage, "bot");
      });
    // --- End Backend Fetch ---
  }

  sendMessage.addEventListener("click", handleSendMessage);
  messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  });
}

// 5. Mobile Menu Functionality (Keep existing logic, UI improved via CSS)
function initMobileMenu() {
  const menuBtn = document.createElement("button");
  menuBtn.className = "menu-btn";
  menuBtn.innerHTML = 
    `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
     </svg>`; // Use SVG for cleaner icon
  menuBtn.setAttribute("aria-label", "Toggle navigation menu");
  menuBtn.setAttribute("aria-expanded", "false");

  const nav = document.querySelector("nav");
  const navLinks = document.querySelector(".nav-links");

  if (!nav || !navLinks) {
    console.warn("Navigation elements not found for mobile menu.");
    return;
  }

  // Insert before the navLinks list
  nav.insertBefore(menuBtn, navLinks);

  menuBtn.addEventListener("click", function () {
    const isActive = navLinks.classList.contains("active");
    navLinks.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", String(!isActive));
    // Toggle icon SVG
    menuBtn.innerHTML = isActive
      ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
         </svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
         </svg>`;
    // Prevent body scroll when menu is open
    document.body.style.overflow = isActive ? "" : "hidden";
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (!event.target.closest("nav") && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      menuBtn.innerHTML = 
        `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
         </svg>`;
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });

  // Close menu when clicking a link
  const links = navLinks.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
      menuBtn.innerHTML = 
        `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
         </svg>`;
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      // Smooth scroll logic (if needed, otherwise handled by browser)
      // const targetId = this.getAttribute("href").substring(1);
      // const targetElement = document.getElementById(targetId);
      // if (targetElement) {
      //   targetElement.scrollIntoView({ behavior: "smooth" });
      // }
    });
  });

  // Close menu on Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      menuBtn.innerHTML = 
        `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
         </svg>`;
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });
}

// 6. Language Toggle Functionality (Keep existing logic, UI improved via CSS)
function initLanguageToggle() {
  const toggleContainer = document.createElement("div");
  toggleContainer.className = "language-toggle";
  toggleContainer.innerHTML = 
    `<span class="lang-label">EN</span>
     <label class="switch">
       <input type="checkbox" id="languageSwitch">
       <span class="slider round"></span>
     </label>
     <span class="lang-label">AR</span>`;

  const nav = document.querySelector("nav");
  if (nav) {
      // Append next to nav links if possible, or at the end
      const navLinks = nav.querySelector(".nav-links");
      if (navLinks && navLinks.parentNode === nav) {
          nav.insertBefore(toggleContainer, navLinks.nextSibling);
      } else {
          nav.appendChild(toggleContainer);
      }
  } else {
      console.warn("Navigation element not found for language toggle.");
      return;
  }

  const languageSwitch = document.getElementById("languageSwitch");
  const savedLanguage = localStorage.getItem("language");

  if (savedLanguage === "ar") {
    document.body.classList.add("rtl");
    languageSwitch.checked = true;
    updateLanguageContent("ar");
  } else {
    // Default to English
    document.body.classList.remove("rtl");
    languageSwitch.checked = false;
    updateLanguageContent("en");
  }

  languageSwitch.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("rtl");
      localStorage.setItem("language", "ar");
      updateLanguageContent("ar");
    } else {
      document.body.classList.remove("rtl");
      localStorage.setItem("language", "en");
      updateLanguageContent("en");
    }
  });
}

// 7. Update Language Content (Keep existing logic)
function updateLanguageContent(lang) {
  const translations = {
    en: {
      "nav-about": "About",
      "nav-skills": "Skills",
      "nav-projects": "Projects",
      "nav-contact": "Contact",
      "hero-title": "Mohamed Abdelaziz",
      "hero-subtitle": "Cybersecurity Engineer & AI Innovator",
      "hero-description": "Securing the digital frontier with innovative AI solutions",
      "hero-btn": "Contact Me",
      "profile-title": "Mohamed Abdelaziz",
      "profile-subtitle-1": "Cybersecurity Engineer",
      "profile-subtitle-2": "AI Innovator",
      "tagline": "Cybersecurity Strategist. AI Innovator. Driven by Vision.",
      "about-p1": "Egyptian American, 26 years old, specializing in Cybersecurity and Artificial Intelligence. Currently living in Cairo, Egypt. Will graduate in May 2026 as a Cybersecurity Engineer, looking forward to contributing to the development of innovative security solutions using AI technologies.",
      "about-p2": "Currently writing a book called \"CodeX\" about quantum computing and AI integration and cryptocurrency.",
      "badge-1": "Cybersecurity Engineer",
      "badge-2": "AI Tools Builder",
      "badge-3": "KSU \'26 – Cybersecurity Student",
      "badge-4": "Multilingual: AR / EN",
      "badge-5": "Replit Dev",
      "badge-6": "Based in Cairo – Global Reach",
      "skills-title": "Skills Matrix", // Updated title
      "certifications-title": "Certifications",
      "experience-title": "Experience Log", // Updated title
      "education-title": "Education Record", // Updated title
      "projects-title": "Projects Log", // Updated title
      "contact-title": "Contact Comms", // Updated title
      "chat-header": "SPACE COMMS v1.0", // Updated title
      "chat-msg1": "Hello! I'm Mohamed's AI assistant. Welcome to the command center!",
      "chat-msg2": "How can I assist you regarding cybersecurity, AI, or Mohamed's work?",
      "chat-input": "Transmit message...", // Updated placeholder
      "footer-name": `© ${new Date().getFullYear()} Mohamed Abdelaziz`, // Dynamic year
      "footer-role": "Cybersecurity Engineer & AI Innovator",
      "footer-signature": "Amrikyy",
    },
    ar: {
      "nav-about": "نبذة",
      "nav-skills": "المهارات",
      "nav-projects": "المشاريع",
      "nav-contact": "اتصال",
      "hero-title": "محمد عبد العزيز",
      "hero-subtitle": "مهندس أمن سيبراني ومبتكر ذكاء اصطناعي",
      "hero-description": "تأمين الحدود الرقمية بحلول ذكاء اصطناعي مبتكرة",
      "hero-btn": "اتصل بي",
      "profile-title": "محمد عبد العزيز",
      "profile-subtitle-1": "مهندس أمن سيبراني",
      "profile-subtitle-2": "مبتكر ذكاء اصطناعي",
      "tagline": "استراتيجي أمن سيبراني. مبتكر ذكاء اصطناعي. مدفوع بالرؤية.",
      "about-p1": "مصري أمريكي، 26 عامًا، متخصص في الأمن السيبراني والذكاء الاصطناعي. أعيش حاليًا في القاهرة، مصر. سأتخرج في مايو 2026 كمهندس أمن سيبراني، وأتطلع إلى المساهمة في تطوير حلول أمنية مبتكرة باستخدام تقنيات الذكاء الاصطناعي.",
      "about-p2": "أعمل حاليًا على كتابة كتاب يسمى \"CodeX\" حول الحوسبة الكمومية ودمج الذكاء الاصطناعي والعملات المشفرة.",
      "badge-1": "مهندس أمن سيبراني",
      "badge-2": "مطور أدوات ذكاء اصطناعي",
      "badge-3": "طالب أمن سيبراني - KSU \'26",
      "badge-4": "متعدد اللغات: عربي / إنجليزي",
      "badge-5": "مطور Replit",
      "badge-6": "مقيم في القاهرة - تواصل عالمي",
      "skills-title": "مصفوفة المهارات", // Updated title
      "certifications-title": "الشهادات",
      "experience-title": "سجل الخبرة", // Updated title
      "education-title": "السجل التعليمي", // Updated title
      "projects-title": "سجل المشاريع", // Updated title
      "contact-title": "نظام الاتصال", // Updated title
      "chat-header": "اتصالات الفضاء v1.0", // Updated title
      "chat-msg1": "مرحباً! أنا مساعد محمد الافتراضي. أهلاً بك في مركز القيادة!",
      "chat-msg2": "كيف يمكنني مساعدتك بخصوص الأمن السيبراني، الذكاء الاصطناعي، أو أعمال محمد؟",
      "chat-input": "أرسل رسالة...", // Updated placeholder
      "footer-name": `© ${new Date().getFullYear()} محمد عبد العزيز`, // Dynamic year
      "footer-role": "مهندس أمن سيبراني ومبتكر ذكاء اصطناعي",
      "footer-signature": "Amrikyy",
    },
  };

  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // Update chat input placeholder specifically
  const messageInput = document.getElementById("messageInput");
  if (messageInput) {
    messageInput.placeholder = translations[lang]["chat-input"];
  }

  // Update HTML lang attribute
  document.documentElement.lang = lang;
}

// 8. Particle JS Initialization (Updated Configuration)
function initParticles() {
  if (typeof particlesJS === "undefined") {
    console.warn("particles.js not loaded. Skipping particle initialization.");
    return;
  }

  const particlesContainerId = "particles-js"; // Ensure this ID exists in your HTML
  if (!document.getElementById(particlesContainerId)) {
      console.warn(`Element with ID '${particlesContainerId}' not found for particles.js.`);
      return;
  }

  particlesJS(particlesContainerId, {
    particles: {
      number: {
        value: 60, // Slightly fewer particles
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#21E6C1", // Use primary accent color
      },
      shape: {
        type: "circle", // Keep circle or try "edge"
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0.4, // Slightly less opaque
        random: true, // Add randomness
        anim: {
          enable: true,
          speed: 0.5,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 2.5, // Slightly smaller
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 130, // Slightly shorter links
        color: "#21E6C1", // Use primary accent color
        opacity: 0.25, // More subtle links
        width: 1,
      },
      move: {
        enable: true,
        speed: 3, // Slower movement
        direction: "none",
        random: true, // Random movement
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab", // Changed from repulse to grab
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 150,
          line_linked: {
            opacity: 0.5, // Slightly more visible grab lines
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });
}

// Quantum Matrix & Aurora Trails micro-animations
function createQuantumMatrix() {
  const container = document.getElementById('micro-bg-anim');
  if (!container) return;
  // Quantum hex grid
  for (let i = 0; i < 7; i++) {
    const hex = document.createElement('div');
    hex.className = 'quantum-hex';
    hex.style.left = Math.random() * 100 + 'vw';
    hex.style.top = Math.random() * 100 + 'vh';
    hex.style.animationDuration = (14 + Math.random() * 8) + 's';
    // Place 6 nodes in a hex pattern
    for (let j = 0; j < 6; j++) {
      const node = document.createElement('div');
      node.className = 'hex-node';
      const angle = (Math.PI / 3) * j;
      node.style.left = 34 + 28 * Math.cos(angle) + 'px';
      node.style.top = 40 + 32 * Math.sin(angle) + 'px';
      node.style.animationDelay = (Math.random() * 2) + 's';
      hex.appendChild(node);
    }
    container.appendChild(hex);
  }
  // Aurora trails
  for (let i = 0; i < 3; i++) {
    const trail = document.createElement('div');
    trail.className = 'aurora-trail';
    trail.style.top = Math.random() * 100 + 'vh';
    trail.style.left = (-20 + Math.random() * 20) + 'vw';
    trail.style.animationDuration = (10 + Math.random() * 8) + 's';
    trail.style.animationDelay = (Math.random() * 8) + 's';
    container.appendChild(trail);
  }
}

document.addEventListener('DOMContentLoaded', createQuantumMatrix);

// (CSS code removed from JS file. Please place the following in your main CSS file)

/*
.chat-window-transition {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  pointer-events: none;
}
.chat-window-transition.open {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}
.message-animate {
  opacity: 0;
  transform: translateY(10px);
  animation: messageFadeIn 0.4s ease-out forwards;
}
@keyframes messageFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
*/

