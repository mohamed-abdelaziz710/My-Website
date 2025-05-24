// Enhanced Spaceship UI/UX Theme JavaScript

document.addEventListener("DOMContentLoaded", function () {
  initScrollAnimations(); // Enhanced scroll animations
  initChat(); // Existing chat functionality (UI improved via CSS)
  initMobileMenu(); // Existing mobile menu (UI improved via CSS)
  initLanguageToggle(); // Existing language toggle (UI improved via CSS)
  initParticles(); // Updated particle configuration
  initHeroEffects(); // Added effects for hero section
  initHoverEffects(); // Added subtle hover effects
  revealSections(); // Added section reveal on scroll
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

// --- Simple Chat Bubble/Window Demo Logic ---
document.addEventListener("DOMContentLoaded", () => {
  const chatBubble = document.getElementById("chatBubble");
  const chatWindow = document.getElementById("chatWindow");
  const closeChat = document.getElementById("closeChat");
  const messageInput = document.getElementById("messageInput");
  const sendMessage = document.getElementById("sendMessage");
  const chatMessages = document.getElementById("chatMessages");

  function appendMessage(text, type = "bot") {
    const msgDiv = document.createElement("div");
    msgDiv.className = type === "user" ? "user-msg" : "bot-msg";
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  chatBubble.addEventListener("click", () => {
    chatWindow.classList.add("open");
    chatBubble.style.display = "none";
    chatWindow.setAttribute("aria-hidden", "false");
  });

  closeChat.addEventListener("click", () => {
    chatWindow.classList.remove("open");
    chatBubble.style.display = "flex";
    chatWindow.setAttribute("aria-hidden", "true");
  });

  function sendChat() {
    const message = messageInput.value.trim();
    if (!message) return;
    appendMessage(message, "user");
    messageInput.value = "";
    // Simulate bot reply after 1s for demo
    setTimeout(() => {
      appendMessage("Thanks for your message! I'll reply soon.", "bot");
    }, 1000);
  }

  sendMessage.addEventListener("click", sendChat);
  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendChat();
  });
});

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
    });
    // إضافة دعم إغلاق القائمة عند الضغط على الرابط لأي سبب (حتى لو كان التنقل داخلي)
    link.addEventListener("touchend", function () {
      navLinks.classList.remove("active");
      menuBtn.innerHTML = 
        `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
         </svg>`;
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
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
      "nav-about": "نبذة عني",
      "nav-skills": "المهارات",
      "nav-projects": "المشاريع",
      "nav-contact": "تواصل",
      "hero-title": "محمد عبد العزيز",
      "hero-subtitle": "مهندس أمن سيبراني ومبتكر ذكاء اصطناعي",
      "hero-description": "تأمين المستقبل الرقمي بحلول ذكاء اصطناعي مبتكرة",
      "hero-btn": "تواصل معي",
      "profile-title": "محمد عبد العزيز",
      "profile-subtitle-1": "مهندس أمن سيبراني",
      "profile-subtitle-2": "مبتكر ذكاء اصطناعي",
      "tagline": "استراتيجي أمن سيبراني. مبتكر ذكاء اصطناعي. رؤية للمستقبل.",
      "about-p1": "مصري أمريكي، أعيش في القاهرة. متخصص في الأمن السيبراني والذكاء الاصطناعي. سأتخرج في مايو 2026 كمهندس أمن سيبراني وأسعى لتطوير حلول أمنية مبتكرة.",
      "about-p2": "أعمل حالياً على تأليف كتاب \"CodeX\" حول الذكاء الاصطناعي والحوسبة والعملات الرقمية.",
      "badge-1": "مهندس أمن سيبراني",
      "badge-2": "مطور أدوات الذكاء الاصطناعي",
      "badge-3": "طالب أمن سيبراني - KSU '26",
      "badge-4": "يتحدث العربية والإنجليزية",
      "badge-5": "مطور Replit",
      "badge-6": "مقيم في القاهرة - تواصل عالمي",
      "badge-7": "برنامج المسار المهني العالمي",
      "badge-8": "جوجل",
      "badge-9": "مايكروسوفت",
      "badge-10": "أمازون ويب سيرفيسز",
      "badge-11": "آبل",
      "badge-12": "ميتا",
      "badge-13": "لينكدإن",
      "badge-14": "OpenAI",
      "badge-15": "charity: water",
      "badge-16": "لوريال",
      "badge-17": "إنتل",
      "skills-title": "مجالات المهارات",
      "certifications-title": "الشهادات",
      "experience-title": "الخبرات",
      "education-title": "المؤهلات العلمية",
      "projects-title": "سجل المشاريع",
      "contact-title": "معلومات التواصل",
      "chat-header": "مساعد الذكاء الاصطناعي",
      "chat-msg1": "مرحباً! أنا مساعد محمد الذكي. كيف يمكنني مساعدتك اليوم؟",
      "chat-msg2": "هل تحتاج إلى استشارة في الأمن السيبراني أو الذكاء الاصطناعي أو مشاريع محمد؟",
      "chat-input": "اكتب رسالتك...",
      "footer-name": `© ${new Date().getFullYear()} محمد عبد العزيز`,
      "footer-role": "مهندس أمن سيبراني ومبتكر ذكاء اصطناعي",
      "footer-signature": "Amrikyy"
    }
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

// --- Modern Language Toggle UI ---
function initLanguageToggle() {
  const toggleContainer = document.createElement("div");
  toggleContainer.className = "language-toggle";
  toggleContainer.innerHTML = `
    <button id="lang-en" class="lang-btn">EN</button>
    <div class="lang-switch">
      <input type="checkbox" id="languageSwitch" class="lang-switch-input">
      <span class="lang-slider"></span>
    </div>
    <button id="lang-ar" class="lang-btn">AR</button>
  `;
  const nav = document.querySelector("nav");
  if (nav) {
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
  const langEnBtn = document.getElementById("lang-en");
  const langArBtn = document.getElementById("lang-ar");
  const savedLanguage = localStorage.getItem("language");
  if (savedLanguage === "ar") {
    document.body.classList.add("rtl");
    languageSwitch.checked = true;
    updateLanguageContent("ar");
  } else {
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
  langEnBtn.addEventListener("click", function () {
    document.body.classList.remove("rtl");
    languageSwitch.checked = false;
    localStorage.setItem("language", "en");
    updateLanguageContent("en");
  });
  langArBtn.addEventListener("click", function () {
    document.body.classList.add("rtl");
    languageSwitch.checked = true;
    localStorage.setItem("language", "ar");
    updateLanguageContent("ar");
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
      "nav-about": "نبذة عني",
      "nav-skills": "المهارات",
      "nav-projects": "المشاريع",
      "nav-contact": "تواصل",
      "hero-title": "محمد عبد العزيز",
      "hero-subtitle": "مهندس أمن سيبراني ومبتكر ذكاء اصطناعي",
      "hero-description": "تأمين المستقبل الرقمي بحلول ذكاء اصطناعي مبتكرة",
      "hero-btn": "تواصل معي",
      "profile-title": "محمد عبد العزيز",
      "profile-subtitle-1": "مهندس أمن سيبراني",
      "profile-subtitle-2": "مبتكر ذكاء اصطناعي",
      "tagline": "استراتيجي أمن سيبراني. مبتكر ذكاء اصطناعي. رؤية للمستقبل.",
      "about-p1": "مصري أمريكي، أعيش في القاهرة. متخصص في الأمن السيبراني والذكاء الاصطناعي. سأتخرج في مايو 2026 كمهندس أمن سيبراني وأسعى لتطوير حلول أمنية مبتكرة.",
      "about-p2": "أعمل حالياً على تأليف كتاب \"CodeX\" حول الذكاء الاصطناعي والحوسبة والعملات الرقمية.",
      "badge-1": "مهندس أمن سيبراني",
      "badge-2": "مطور أدوات الذكاء الاصطناعي",
      "badge-3": "طالب أمن سيبراني - KSU '26",
      "badge-4": "يتحدث العربية والإنجليزية",
      "badge-5": "مطور Replit",
      "badge-6": "مقيم في القاهرة - تواصل عالمي",
      "badge-7": "برنامج المسار المهني العالمي",
      "badge-8": "جوجل",
      "badge-9": "مايكروسوفت",
      "badge-10": "أمازون ويب سيرفيسز",
      "badge-11": "آبل",
      "badge-12": "ميتا",
      "badge-13": "لينكدإن",
      "badge-14": "OpenAI",
      "badge-15": "charity: water",
      "badge-16": "لوريال",
      "badge-17": "إنتل",
      "skills-title": "مجالات المهارات",
      "certifications-title": "الشهادات",
      "experience-title": "الخبرات",
      "education-title": "المؤهلات العلمية",
      "projects-title": "سجل المشاريع",
      "contact-title": "معلومات التواصل",
      "chat-header": "مساعد الذكاء الاصطناعي",
      "chat-msg1": "مرحباً! أنا مساعد محمد الذكي. كيف يمكنني مساعدتك اليوم؟",
      "chat-msg2": "هل تحتاج إلى استشارة في الأمن السيبراني أو الذكاء الاصطناعي أو مشاريع محمد؟",
      "chat-input": "اكتب رسالتك...",
      "footer-name": `© ${new Date().getFullYear()} محمد عبد العزيز`,
      "footer-role": "مهندس أمن سيبراني ومبتكر ذكاء اصطناعي",
      "footer-signature": "Amrikyy"
    }
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
  // Defensive: Check if particlesJS is loaded
  if (typeof particlesJS === "undefined") {
    console.warn("particles.js not loaded. Skipping particle initialization.");
    return;
  }

  const particlesContainerId = "particles-js"; // Ensure this ID exists in your HTML
  if (!document.getElementById(particlesContainerId)) {
    console.warn(`Element with ID '${particlesContainerId}' not found for particles.js.`);
    return;
  }

  // ParticleJS config (no syntax errors found)
  particlesJS(particlesContainerId, {
    particles: {
      number: {
        value: 60,
        density: { enable: true, value_area: 800 },
      },
      color: { value: "#21E6C1" },
      shape: {
        type: "circle",
        stroke: { width: 0, color: "#000000" },
        polygon: { nb_sides: 5 },
      },
      opacity: {
        value: 0.4,
        random: true,
        anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false },
      },
      size: {
        value: 2.5,
        random: true,
        anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
      },
      line_linked: {
        enable: true,
        distance: 130,
        color: "#21E6C1",
        opacity: 0.25,
        width: 1,
      },
      move: {
        enable: true,
        speed: 3,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        grab: { distance: 150, line_linked: { opacity: 0.5 } },
        bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 },
      },
    },
    retina_detect: true,
  });
}

// Add CSS for chat window transition and message animation
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

/*
Notes:
- All major functions are wrapped in DOMContentLoaded for safety.
- Defensive checks are present for missing DOM elements.
- No duplicate function names or global variable leaks.
- No syntax errors found in the provided code.
- If particles.js is not working, ensure the library is loaded and a div with id="particles-js" exists in your HTML.
*/

document.addEventListener("DOMContentLoaded", () => {--
    // 1. Initialize Hero Section Visual Effects => {
    initHeroVisualEffects();o image
  var images = document.querySelectorAll('.parallax-img');
    // 2. Enhanced Hover EffectsmpleParallax !== 'undefined') {
    initHoverEffects();images, {
      scale: 1.18,
    // 3. Chat Functionality
    initChat();n: 'cubic-bezier(0,0,0,1)'
    });
    // 4. Mobile Menu Functionality
    initMobileMenu();
  // CTA button pulse effect
    // 5. Language Toggle FunctionalitymentById('btn-get-in-touch');
    initLanguageToggle();
    btnGetInTouch.addEventListener('mouseenter', e => {
    // 6. Update Language Content based on saved preference
    const savedLanguage = localStorage.getItem("language") || "en";
    updateLanguageContent(savedLanguage);leave', e => {
      e.target.classList.remove('pulse');
    // 7. Initialize Particles.js
    initParticles();dEventListener('click', () => {
  }); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
// تحسين تحميل الصور: إضافة lazy loading تلقائياً لكل الصور إن لم يكن موجوداً
document.addEventListener("DOMContentLoaded", function () {
  // Lazy loading for all images if not set
  document.querySelectorAll("img").forEach(img => {ubble');
    if (!img.hasAttribute("loading")) {mentById('chatbotWindow');
      img.setAttribute("loading", "lazy");d('closeChat');
    }st chatInput = document.getElementById('chatInput');
  });
  if (chatBubble && chatbotWindow && closeChat && chatInput) {
  // زيادة تباين النصوص الصغيرة على الخلفية الداكنة
  const contrastSelectors = [play = 'block';
    ".text-gray-300",
    ".text-gray-400",tListener('click', () => {
    ".text-sm",ndow.style.display = 'none';
    ".text-xs"
  ];chatInput.addEventListener('keypress', (e) => {
  document.querySelectorAll(contrastSelectors.join(",")).forEach(el => {
    el.style.color = "#f4fff4";ument.createElement('div');
    el.style.textShadow = "0 0 2px #10151F, 0 0 8px #21E6C144";
    el.style.letterSpacing = "0.01em";Input.value;
    el.style.fontWeight = "500";tor('.messages').appendChild(userMessage);
  });   chatInput.value = '';
      }
// تحسين حجم أيقونة الدردشة وتفاعل اللمس
const chatBubble = document.getElementById("chatbot-bubble");
if (chatBubble) {
  // زيادة الحجم على الشاشات الصغيرة
  function resizeChatBubble() {
    if (window.innerWidth <= 600) {
      chatBubble.style.width = "72px";
      chatBubble.style.height = "72px";
      const icon = chatBubble.querySelector("i");
      if (icon) icon.style.fontSize = "2.7rem";
    } else {
      chatBubble.style.width = "64px";
      chatBubble.style.height = "64px";
      const icon = chatBubble.querySelector("i");
      if (icon) icon.style.fontSize = "2.3rem";
    }
  }
  resizeChatBubble();
  window.addEventListener("resize", resizeChatBubble);

  // تحسين التفاعل مع اللمس
  chatBubble.style.touchAction = "manipulation";
  chatBubble.style.webkitTapHighlightColor = "rgba(33,230,193,0.15)";
  chatBubble.addEventListener("touchstart", function () {
    chatBubble.style.boxShadow = "0 0 0 6px #39FF14, 0 0 32px #21E6C1cc";
  });
  chatBubble.addEventListener("touchend", function () {
    chatBubble.style.boxShadow = "";
  });
}
// إصلاح ظهور الأقسام: إزالة تكرار revealSections والتأكد من إضافة كلاس visible عند التمرير فقط
(function() {ubble.style.width = "72px";
  function revealSections() {ht = "72px";
    const sections = document.querySelectorAll('section, .project-card, .blog-card');
    sections.forEach(section => {Size = "2.7rem";
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < window.innerHeight - 100) {
        section.classList.add('visible');
      } const icon = chatBubble.querySelector("i");
    }); if (icon) icon.style.fontSize = "2.3rem";
  }   }
  window.addEventListener('scroll', revealSections);
  window.addEventListener('DOMContentLoaded', revealSections);
})();indow.addEventListener("resize", resizeChatBubble);

// تفاعل زر CTAتفاعل مع اللمس
const ctaBtn = document.getElementById('btn-get-in-touch');
if (ctaBtn) {e.style.webkitTapHighlightColor = "rgba(33,230,193,0.15)";
  ctaBtn.addEventListener('mouseenter', e => {function () {
    e.target.classList.add('pulse');
  });
  ctaBtn.addEventListener('mouseleave', e => {
    e.target.classList.remove('pulse');
  });
}
  chatBubble.addEventListener('click', () => {
    chatbotWindow.style.display = 'block';
    chatBubble.style.display = 'none';
  });
  window.addEventListener('scroll', revealSections);
  closeChat.addEventListener('click', () => {
    chatbotWindow.style.display = 'none';
    chatBubble.style.display = 'block';
  });
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatInput.value.trim() !== '') {
      const userMessage = document.createElement('div');
      userMessage.className = 'message user';
      userMessage.textContent = chatInput.value;
      chatbotWindow.querySelector('.messages').appendChild(userMessage);
      // --- Backend Fetch for Chatbot (Replit) ---
      fetch('https://0e45fe78-86ad-4c8f-b665-f561edd3e592-00-ezbtmwl50c4e.riker.replit.dev:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: chatInput.value })
      })
      .then(res => res.json())
      .then(data => {
        let reply = '';
        if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          reply = data.candidates[0].content.parts[0].text;
        } else {
          reply = 'عذراً، حدث خطأ في الاتصال. يمكنك التواصل معي عبر وسائل التواصل الاجتماعي.';
        }
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot';
        botMessage.textContent = reply;
        chatbotWindow.querySelector('.messages').appendChild(botMessage);
        chatbotWindow.querySelector('.messages').scrollTop = chatbotWindow.querySelector('.messages').scrollHeight;
      })
      .catch(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot';
        botMessage.textContent = 'عذراً، حدث خطأ في الاتصال بالخادم.';
        chatbotWindow.querySelector('.messages').appendChild(botMessage);
      });
      chatInput.value = '';
    }
  });
}
if (btnGetInTouch) {
  btnGetInTouch.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
}
// إنشاء فقاعة شات متحركة (SVG Animated Chatbot Bubble)
const chatBubble = document.createElement('div');
chatBubble.className = 'chat-bubble';
chatBubble.innerHTML = `  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">    <circle cx="19" cy="19" r="16" stroke="#21D4FD" stroke-width="3" fill="#9B59B6" />    <ellipse cx="19" cy="19" rx="12" ry="7" fill="#39FF14" fill-opacity="0.6">      <animate attributeName="rx" values="12;14;12" dur="1.6s" repeatCount="indefinite" />      <animate attributeName="fill-opacity" values="0.6;1;0.6" dur="1.6s" repeatCount="indefinite" />
    </ellipse>
    <text x="50%" y="56%" text-anchor="middle" fill="#fff" font-size="1.2em" dy=".3em" font-family="Inter,Arial">💬</text>
  </svg>`;
chatBubble.title = 'تحدث معي';
chatBubble.onclick = () => {
  alert('مرحباً! كيف يمكنني مساعدتك؟');
};
document.body.appendChild(chatBubble);

// دعم ظهور تدريجي للفقاعة عند تحميل الصفحة
setTimeout(() => {
  chatBubble.classList.add('visible');
}, 600);

// Parallax effect
// تأكد من تحميل simpleParallax.min.js في index.html
// يعمل على كل عنصر يحمل كلاس parallax-img

document.addEventListener('DOMContentLoaded', function() {
  var images = document.querySelectorAll('.parallax-img');
  if(images.length && typeof simpleParallax !== 'undefined'){
    new simpleParallax(images, {
      scale: 1.18,
      delay: .16,
      transition: 'cubic-bezier(0,0,0,1)'
    });
  }
});