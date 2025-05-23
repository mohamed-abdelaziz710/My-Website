// JavaScript content provided by user at May 23 2025 17:44:30 +0000
// Enhanced Spaceship UI/UX Theme JavaScript - Manus v2 - Language Toggle Update

document.addEventListener("DOMContentLoaded", function () {
  initScrollAnimations(); // Enhanced scroll animations
  initChat(); // Existing chat functionality (UI improved via CSS)
  initMobileMenu(); // Existing mobile menu (UI improved via CSS)
  initLanguageToggle(); // Existing language toggle (UI improved via CSS)
  initParticles(); // Updated particle configuration
  initHeroEffects(); // Added effects for hero section
  initHoverEffects(); // Added subtle hover effects
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

    animatedElements.forEach((el, index) => {
      // Add staggered delay based on index
      el.style.transitionDelay = `${index * 0.05}s`; 
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

  // Typing effect for subtitle (if needed, currently CSS handles it)
  // const subtitleSpan = document.querySelector(".hero-subtitle .typewriter");
  // if (subtitleSpan) { /* Add typing logic here */ }
}

// 3. Enhanced Hover Effects (Example: Card Tilt)
function initHoverEffects() {
  const cards = document.querySelectorAll(".card, .panel, .skill-category, .project-item, .certification-item, .badge-item"); // Added badges

  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) * 0.03; // Adjust sensitivity
      const rotateY = (centerX - x) * 0.03;
      const scale = card.classList.contains("badge-item") ? 1.05 : 1.03; // Smaller scale for badges

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`; 
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
  const sendMessageBtn = document.getElementById("sendMessage"); // Renamed for clarity
  const chatMessages = document.getElementById("chatMessages");

  if (!chatBubble || !chatWindow || !closeChat || !messageInput || !sendMessageBtn || !chatMessages) {
    console.warn("Chat elements not found.");
    return;
  }

  // Add classes for CSS transitions
  chatWindow.classList.add("chat-window-transition");

  // Add initial bot messages
  function addInitialMessages() {
      const lang = document.documentElement.lang || 'en';
      const initialMsg1 = getTranslation("chat-msg1", lang);
      const initialMsg2 = getTranslation("chat-msg2", lang);
      appendMessage(initialMsg1, "bot");
      setTimeout(() => appendMessage(initialMsg2, "bot"), 600); // Delayed second message
  }

  chatBubble.addEventListener("click", function () {
    chatWindow.classList.add("open");
    chatWindow.style.display = "flex"; // Ensure display is flex
    chatBubble.style.display = "none";
    // Add initial messages only if chat is empty
    if (chatMessages.children.length === 0) {
        addInitialMessages();
    }
    // Scroll to bottom after animation
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 300); // Match CSS transition duration
  });

  closeChat.addEventListener("click", function () {
    chatWindow.classList.remove("open");
    // Wait for animation to finish before hiding
    setTimeout(() => {
        if (!chatWindow.classList.contains("open")) { // Check if still closed
             chatWindow.style.display = "none";
        }
    }, 300); 
    chatBubble.style.display = "flex";
  });

  function appendMessage(message, type) {
    const messageWrapper = document.createElement("div");
    messageWrapper.className = `message ${type}-message`; // Base classes

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";
    messageContent.textContent = message;

    const messageTime = document.createElement("div");
    messageTime.className = "message-time";
    const now = new Date();
    messageTime.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messageWrapper.appendChild(messageContent);
    messageWrapper.appendChild(messageTime);
    chatMessages.appendChild(messageWrapper);

    // Add animation class after appending
    requestAnimationFrame(() => {
        messageWrapper.classList.add("message-animate");
    });

    // Ensure scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
      // Remove existing indicator if any
      const existingIndicator = chatMessages.querySelector(".typing-indicator");
      if (existingIndicator) {
          chatMessages.removeChild(existingIndicator);
      }
      
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
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (typingIndicatorElement && typingIndicatorElement.parentNode === chatMessages) {
            chatMessages.removeChild(typingIndicatorElement);
        }
        let reply = "";
        // Safely access nested properties
        if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          reply = data.candidates[0].content.parts[0].text;
        } else {
          // Fallback messages
          const fallbackKey = Math.random() < 0.5 ? "chat-fallback-1" : "chat-fallback-2";
          reply = getTranslation(fallbackKey, isRTL ? 'ar' : 'en');
        }
        appendMessage(reply, "bot");
      })
      .catch((error) => {
        console.error("Error connecting to backend:", error);
        if (typingIndicatorElement && typingIndicatorElement.parentNode === chatMessages) {
            chatMessages.removeChild(typingIndicatorElement);
        }
        // Error messages
        const errorKey = Math.random() < 0.5 ? "chat-error-1" : "chat-error-2";
        const errorMessage = getTranslation(errorKey, isRTL ? 'ar' : 'en');
        appendMessage(errorMessage, "bot");
      });
    // --- End Backend Fetch ---
  }

  sendMessageBtn.addEventListener("click", handleSendMessage);
  messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  });
}

// 5. Mobile Menu Functionality (Enhanced)
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
  const socialLinks = document.querySelector(".nav-social-links");
  const langToggle = document.querySelector(".language-toggle"); // Get lang toggle

  if (!nav || !navLinks || !socialLinks || !langToggle) { // Check all elements
    console.warn("Navigation elements not found for mobile menu.");
    return;
  }

  // Insert button at the end of nav
  nav.appendChild(menuBtn);

  menuBtn.addEventListener("click", function () {
    const isActive = nav.classList.contains("menu-open");
    nav.classList.toggle("menu-open");
    navLinks.classList.toggle("active");
    socialLinks.classList.toggle("active");
    langToggle.classList.toggle("active"); // Toggle language toggle visibility
    menuBtn.setAttribute("aria-expanded", String(!isActive));
    // Toggle icon SVG
    menuBtn.innerHTML = !isActive
      ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
         </svg>` // Close icon
      : `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
         </svg>`; // Menu icon
    // Prevent body scroll when menu is open
    document.body.style.overflow = !isActive ? "hidden" : "";
  });

  // Function to close menu
  function closeMenu() {
      nav.classList.remove("menu-open");
      navLinks.classList.remove("active");
      socialLinks.classList.remove("active");
      langToggle.classList.remove("active");
      menuBtn.innerHTML = 
        `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
         </svg>`;
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
  }

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (!event.target.closest("nav") && nav.classList.contains("menu-open")) {
      closeMenu();
    }
  });

  // Close menu when clicking a link
  const links = navLinks.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", function () {
        if (window.innerWidth <= 992) { // Only close on mobile
            closeMenu();
        }
        // Smooth scroll logic (if needed, otherwise handled by browser/CSS)
        const targetId = this.getAttribute("href");
        if (targetId && targetId.startsWith("#")) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Add smooth scroll if browser doesn't support scroll-behavior: smooth
                // targetElement.scrollIntoView({ behavior: "smooth" }); 
            }
        }
    });
  });

  // Close menu on Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("menu-open")) {
      closeMenu();
    }
  });
}

// 6. Language Toggle Functionality (Enhanced Insertion)
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
  const socialLinks = document.querySelector(".nav-social-links"); // Find social links
  if (nav) {
      // Insert before social links if they exist, otherwise append to nav
      if (socialLinks) {
          nav.insertBefore(toggleContainer, socialLinks);
      } else {
          nav.appendChild(toggleContainer);
      }
  } else {
      console.warn("Navigation element not found for language toggle.");
      return;
  }

  const languageSwitch = document.getElementById("languageSwitch");
  const savedLanguage = localStorage.getItem("language") || 'en'; // Default to 'en'

  if (savedLanguage === "ar") {
    document.body.classList.add("rtl");
    languageSwitch.checked = true;
  } else {
    document.body.classList.remove("rtl");
    languageSwitch.checked = false;
  }
  // Initial content update based on saved/default language
  updateLanguageContent(savedLanguage);

  languageSwitch.addEventListener("change", function () {
    const newLang = this.checked ? "ar" : "en";
    if (this.checked) {
      document.body.classList.add("rtl");
    } else {
      document.body.classList.remove("rtl");
    }
    localStorage.setItem("language", newLang);
    updateLanguageContent(newLang);
  });
}

// Centralized Translations Object
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
      "tagline": "Launching Secure Futures",
      "about-title": "About Me",
      "about-p1": "I'm Mohamed Abdelaziz, a passionate Cybersecurity Engineer and AI Innovator based in Cairo. I specialize in building robust security systems and intelligent AI solutions to tackle the challenges of tomorrow's digital landscape.",
      "about-p2": "As a dedicated lifelong learner, I'm constantly exploring new technologies and methodologies to enhance my skills and deliver cutting-edge solutions. Let's connect and explore the endless possibilities in the realms of Cybersecurity and AI.",
      "badge-1": "Cybersecurity Engineer",
      "badge-2": "AI Tools Builder",
      "badge-3": "KSU '26 – Cybersecurity Student",
      "badge-4": "Multilingual: AR / EN",
      "badge-5": "Replit Dev",
      "badge-6": "Based in Cairo – Global Reach",
      "skills-title": "Skills Matrix", 
      "certifications-title": "Certifications",
      "experience-title": "Experience Log", 
      "projects-title": "Projects Log", 
      "project-link": "View Project",
      "contact-title": "Contact Comms", 
      "contact-btn": "Send a Message",
      "chat-header": "SPACE COMMS v1.0", 
      "chat-msg1": "Hello! I'm Mohamed's AI assistant. Welcome to the command center!",
      "chat-msg2": "How can I assist you regarding cybersecurity, AI, or Mohamed's work?",
      "chat-input": "Transmit message...", 
      "chat-fallback-1": "Sorry, there was a connection error. You can reach me through the social media platforms listed.",
      "chat-fallback-2": "I'm experiencing some technical issues. I'll be back soon! 🔧",
      "chat-error-1": "Sorry, there seems to be an issue connecting. You can reach me directly through social media. 🔌",
      "chat-error-2": "I can't reach the server right now. Could you try again later? 🛠️",
      "footer-name": `© ${new Date().getFullYear()} Mohamed Abdelaziz`, 
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
      "tagline": "إطلاق مستقبل آمن",
      "about-title": "عني",
      "about-p1": "أنا محمد عبد العزيز، مهندس أمن سيبراني شغوف ومبتكر في مجال الذكاء الاصطناعي مقيم في القاهرة. متخصص في بناء أنظمة أمنية قوية وحلول ذكاء اصطناعي لمواجهة تحديات المشهد الرقمي المستقبلي.",
      "about-p2": "كمتعلم دائم ملتزم، أستكشف باستمرار التقنيات والمنهجيات الجديدة لتعزيز مهاراتي وتقديم حلول متطورة. لنتواصل ونستكشف الإمكانيات اللامحدودة في مجالات الأمن السيبراني والذكاء الاصطناعي.",
      "badge-1": "مهندس أمن سيبراني",
      "badge-2": "مطور أدوات ذكاء اصطناعي",
      "badge-3": "طالب أمن سيبراني - KSU '26",
      "badge-4": "متعدد اللغات: عربي / إنجليزي",
      "badge-5": "مطور Replit",
      "badge-6": "مقيم في القاهرة - تواصل عالمي",
      "skills-title": "مصفوفة المهارات", 
      "certifications-title": "الشهادات",
      "experience-title": "سجل الخبرة", 
      "projects-title": "سجل المشاريع", 
      "project-link": "عرض المشروع",
      "contact-title": "نظام الاتصال", 
      "contact-btn": "أرسل رسالة",
      "chat-header": "اتصالات الفضاء v1.0", 
      "chat-msg1": "مرحباً! أنا مساعد محمد الافتراضي. أهلاً بك في مركز القيادة!",
      "chat-msg2": "كيف يمكنني مساعدتك بخصوص الأمن السيبراني، الذكاء الاصطناعي، أو أعمال محمد؟",
      "chat-input": "أرسل رسالة...", 
      "chat-fallback-1": "عذراً، حدث خطأ في الاتصال. يمكنك التواصل معي عبر وسائل التواصل الاجتماعي المذكورة.",
      "chat-fallback-2": "أواجه بعض المشاكل التقنية حالياً. سأكون متاحاً قريباً! 🔧",
      "chat-error-1": "عذراً، يبدو أن هناك مشكلة في الاتصال. يمكنك التواصل معي مباشرة عبر وسائل التواصل الاجتماعي. 🔌",
      "chat-error-2": "لا يمكنني الوصول إلى الخادم حالياً. هل يمكنك المحاولة مرة أخرى لاحقاً؟ 🛠️",
      "footer-name": `© ${new Date().getFullYear()} محمد عبد العزيز`, 
      "footer-role": "مهندس أمن سيبراني ومبتكر ذكاء اصطناعي",
      "footer-signature": "Amrikyy",
    },
};

// Helper function to get translation safely
function getTranslation(key, lang) {
    return translations[lang]?.[key] || translations['en']?.[key] || key; // Fallback to English then key itself
}

// 7. Update Language Content (Refactored)
function updateLanguageContent(lang) {
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    element.textContent = getTranslation(key, lang);
  });

  // Update specific elements like placeholders or titles not using data-translate
  const messageInput = document.getElementById("messageInput");
  if (messageInput) {
    messageInput.placeholder = getTranslation("chat-input", lang);
  }

  // Update HTML lang attribute and body direction class
  document.documentElement.lang = lang;
  if (lang === 'ar') {
      document.body.classList.add('rtl');
  } else {
      document.body.classList.remove('rtl');
  }

  // Re-initialize chat with initial messages if window is open and empty
  const chatWindow = document.getElementById("chatWindow");
  const chatMessages = document.getElementById("chatMessages");
  if (chatWindow && chatWindow.classList.contains('open') && chatMessages && chatMessages.children.length === 0) {
      // Clear potential old messages before adding new ones (optional)
      // chatMessages.innerHTML = ''; 
      addInitialMessages(); // Defined within initChat scope
  }
}

// 8. Particle JS Initialization (Updated Configuration)
function initParticles() {
  if (typeof particlesJS === "undefined") {
    // Attempt to load particles.js if not found (e.g., if script moved)
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.onload = () => {
        console.log("particles.js loaded dynamically.");
        setupParticles();
    };
    script.onerror = () => {
        console.error("Failed to load particles.js dynamically.");
    };
    document.body.appendChild(script);
    return; 
  }
  setupParticles(); // If already loaded
}

function setupParticles() {
    const particlesContainerId = "particles-js"; // Ensure this ID exists in your HTML
    const particlesElement = document.getElementById(particlesContainerId);
    if (!particlesElement) {
        console.warn(`Element with ID '${particlesContainerId}' not found for particles.js.`);
        return;
    }

    particlesJS(particlesContainerId, {
      particles: {
        number: {
          value: 50, // Reduced further for performance
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: ["#39ff14", "#ffffff", "#00BFFF"], // Array of colors (Neon Green, White, Crypto Blue)
        },
        shape: {
          type: ["circle", "edge"], // Mix of shapes
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
            speed: 0.6, // Slightly faster flicker
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 2.5, // Slightly smaller
          random: true,
          anim: {
            enable: true, // Enable size animation
            speed: 4, // Slow size pulse
            size_min: 1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 120, // Reduced distance
          color: "#ffffff", // White links
          opacity: 0.15, // Very subtle links
          width: 1,
          triangles: { // Add triangles for a more complex network
              enable: true,
              color: "#0A0F1A", // Match dark background
              opacity: 0.05
          }
        },
        move: {
          enable: true,
          speed: 2, // Slower movement
          direction: "none",
          random: true, // Random movement
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: true, // Enable attract mode
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
            distance: 140,
            line_linked: {
              opacity: 0.3, // More visible grab lines
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

// Add CSS for chat window transition and message animation (already present in HTML via style tag in original JS)
// Consider moving this CSS to the main style.css file for better organization
/*
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
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
`;
document.head.appendChild(styleSheet);
*/
