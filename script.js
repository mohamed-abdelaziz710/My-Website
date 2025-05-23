document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize chat functionality
    initChat();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize language toggle
    initLanguageToggle();
    
    // Initialize particles.js
    initParticles();
});

// Animation for cards
function initAnimations() {
    const cards = document.querySelectorAll('.card');
    
    // Add animate class to all cards initially
    cards.forEach(card => {
        card.classList.add('animate');
    });
    
    // Animate cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Chat functionality
function initChat() {
    const chatBubble = document.getElementById('chatBubble');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const messageInput = document.getElementById('messageInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    
    // Open chat window when bubble is clicked
    chatBubble.addEventListener('click', function() {
        chatWindow.style.display = 'flex';
        chatBubble.style.display = 'none';
        // Scroll to bottom of messages
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
    
    // Close chat window when close button is clicked
    closeChat.addEventListener('click', function() {
        chatWindow.style.display = 'none';
        chatBubble.style.display = 'flex';
    });
    
    // Send message when send button is clicked or Enter key is pressed
    function sendUserMessage() {
        const message = messageInput.value.trim();
        if (message !== '') {
            // Add user message
            addMessage(message, 'user');
            messageInput.value = '';
            
            // Get current language
            const isArabic = document.body.classList.contains('rtl');
            
            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'message bot-message typing-indicator';
            typingIndicator.innerHTML = `
                <div class="message-content">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            `;
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Connect to Replit backend API
            fetch('https://0e45fe78-86ad-4c8f-b665-f561edd3e592-00-ezbtmwl50c4e.riker.replit.dev:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message
                } )
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Remove typing indicator
                chatMessages.removeChild(typingIndicator);
                
                // Extract response text from the API response
                let responseText = '';
                if (data && data.candidates && data.candidates[0] && 
                    data.candidates[0].content && data.candidates[0].content.parts && 
                    data.candidates[0].content.parts[0]) {
                    responseText = data.candidates[0].content.parts[0].text;
                } else {
                    // Fallback responses if API response format is unexpected
                    const fallbackResponses = isArabic ? [
                        "عذراً، حدث خطأ في الاتصال. يمكنك التواصل معي عبر وسائل التواصل الاجتماعي المذكورة في قسم الاتصال.",
                        "أواجه بعض المشاكل التقنية حالياً. سأكون متاحاً قريباً! 🔧"
                    ] : [
                        "Sorry, there was a connection error. You can reach me through the social media platforms listed in the contact section.",
                        "I'm experiencing some technical issues at the moment. I'll be back soon! 🔧"
                    ];
                    responseText = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
                }
                
                // Add the response to the chat
                addMessage(responseText, 'bot');
            })
            .catch(error => {
                console.error('Error connecting to backend:', error);
                
                // Remove typing indicator
                if (typingIndicator.parentNode === chatMessages) {
                    chatMessages.removeChild(typingIndicator);
                }
                
                // Fallback responses in case of connection error
                const errorResponses = isArabic ? [
                    "عذراً، يبدو أن هناك مشكلة في الاتصال بالخادم. يمكنك التواصل معي مباشرة عبر وسائل التواصل الاجتماعي. 🔌",
                    "لا يمكنني الوصول إلى الخادم حالياً. هل يمكنك المحاولة مرة أخرى لاحقاً؟ 🛠️"
                ] : [
                    "Sorry, there seems to be an issue connecting to the server. You can reach me directly through social media. 🔌",
                    "I can't reach the server right now. Could you try again later? 🛠️"
                ];
                
                const errorResponse = errorResponses[Math.floor(Math.random() * errorResponses.length)];
                addMessage(errorResponse, 'bot');
            });
        }
    }
    
    // Add CSS for typing indicator
    const style = document.createElement('style');
    style.textContent = `
        .typing-indicator .message-content {
            background-color: #1a1a1a !important;
            padding: 10px 15px !important;
        }
        
        .typing-indicator .dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #00ff00;
            margin-right: 3px;
            animation: typing-animation 1.4s infinite ease-in-out;
        }
        
        .typing-indicator .dot:nth-child(1) {
            animation-delay: 0s;
        }
        
        .typing-indicator .dot:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .typing-indicator .dot:nth-child(3) {
            animation-delay: 0.4s;
            margin-right: 0;
        }
        
        @keyframes typing-animation {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(style);
    
    sendMessage.addEventListener('click', sendUserMessage);
    
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });
    
    // Function to add a message to the chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = 'Just now';
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        
        chatMessages.appendChild(messageDiv);
        
        // Scroll to the new message
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Add subtle animation to chat bubble when page loads
    setTimeout(function() {
        chatBubble.style.transform = 'scale(1.1)';
        setTimeout(function() {
            chatBubble.style.transform = 'scale(1)';
        }, 200);
    }, 1000);
}

// Mobile menu functionality
function initMobileMenu() {
    const menuBtn = document.createElement('button');
    menuBtn.className = 'menu-btn';
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    menuBtn.setAttribute('aria-label', 'Toggle navigation menu');
    menuBtn.setAttribute('aria-expanded', 'false');
    
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Insert menu button before nav links
    nav.insertBefore(menuBtn, navLinks);
    
    // Toggle menu on button click
    menuBtn.addEventListener('click', function() {
        const isExpanded = navLinks.classList.contains('active');
        navLinks.classList.toggle('active');
        menuBtn.setAttribute('aria-expanded', !isExpanded);
        
        // Change icon based on menu state
        menuBtn.innerHTML = isExpanded ? 
            '<i class="fas fa-bars"></i>' : 
            '<i class="fas fa-times"></i>';
            
        // Prevent body scroll when menu is open
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            menuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            menuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Handle escape key to close menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            menuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

// Language toggle functionality
function initLanguageToggle() {
    // Create language toggle HTML
    const languageToggle = document.createElement('div');
    languageToggle.className = 'language-toggle';
    languageToggle.innerHTML = `
        <span class="lang-label">EN</span>
        <label>
            <input type="checkbox" id="languageSwitch">
            <span class="slider"></span>
        </label>
        <span class="lang-label">AR</span>
    `;
    
    // Add language toggle to navigation
    const nav = document.querySelector('nav');
    nav.appendChild(languageToggle);
    
    // Get language switch element
    const languageSwitch = document.getElementById('languageSwitch');
    
    // Check if language preference is stored
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'ar') {
        document.body.classList.add('rtl');
        languageSwitch.checked = true;
        updateLanguageContent('ar');
    }
    
    // Toggle language on switch change
    languageSwitch.addEventListener('change', function() {
        if (this.checked) {
            // Switch to Arabic
            document.body.classList.add('rtl');
            localStorage.setItem('language', 'ar');
            updateLanguageContent('ar');
        } else {
            // Switch to English
            document.body.classList.remove('rtl');
            localStorage.setItem('language', 'en');
            updateLanguageContent('en');
        }
    });
}

// Update content based on selected language
function updateLanguageContent(language) {
    const translations = {
        en: {
            // Navigation
            'nav-about': 'About',
            'nav-skills': 'Skills',
            'nav-projects': 'Projects',
            'nav-contact': 'Contact',
            
            // Hero section
            'hero-title': 'Mohamed Abdelaziz',
            'hero-subtitle': 'Cybersecurity Engineer & AI Innovator',
            'hero-description': 'Securing the digital frontier with innovative AI solutions',
            'hero-btn': 'Contact Me',
            
            // Profile section
            'profile-title': 'Mohamed Abdelaziz',
            'profile-subtitle-1': 'Cybersecurity Engineer',
            'profile-subtitle-2': 'AI Innovator',
            'tagline': 'Cybersecurity Strategist. AI Innovator. Driven by Vision.',
            'about-p1': 'Egyptian American, 26 years old, specializing in Cybersecurity and Artificial Intelligence. Currently living in Cairo, Egypt. Will graduate in May 2026 as a Cybersecurity Engineer, looking forward to contributing to the development of innovative security solutions using AI technologies.',
            'about-p2': 'Currently writing a book called "CodeX" about quantum computing and AI integration and cryptocurrency.',
            
            // Badges
            'badge-1': 'Cybersecurity Engineer',
            'badge-2': 'AI Tools Builder',
            'badge-3': 'KSU \'26 – Cybersecurity Student',
            'badge-4': 'Multilingual: AR / EN',
            'badge-5': 'Replit Dev',
            'badge-6': 'Based in Cairo – Global Reach',
            
            // Section titles
            'skills-title': 'Skills',
            'certifications-title': 'Certifications',
            'experience-title': 'Work Experience',
            'education-title': 'Education',
            'projects-title': 'Projects',
            'contact-title': 'Contact',
            
            // Chat
            'chat-header': 'Chat with Mohamed',
            'chat-msg1': 'Hello, I\'m Muhammad. Welcome to my personal site!',
            'chat-msg2': 'Feel free to ask me anything about cybersecurity, AI, or my journey. ✏️',
            'chat-input': 'Type your message...',
            
            // Footer
            'footer-name': '© 2025 Mohamed Abdelaziz',
            'footer-role': 'Cybersecurity Engineer & AI Innovator',
            'footer-signature': 'Amrikyy'
        },
        ar: {
            // Navigation
            'nav-about': 'نبذة عني',
            'nav-skills': 'المهارات',
            'nav-projects': 'المشاريع',
            'nav-contact': 'اتصل بي',
            
            // Hero section
            'hero-title': 'محمد عبد العزيز',
            'hero-subtitle': 'مهندس أمن سيبراني ومبتكر ذكاء اصطناعي',
            'hero-description': 'تأمين الحدود الرقمية بحلول ذكاء اصطناعي مبتكرة',
            'hero-btn': 'اتصل بي',
            
            // Profile section
            'profile-title': 'محمد عبد العزيز',
            'profile-subtitle-1': 'مهندس أمن سيبراني',
            'profile-subtitle-2': 'مبتكر ذكاء اصطناعي',
            'tagline': 'استراتيجي أمن سيبراني. مبتكر ذكاء اصطناعي. مدفوع بالرؤية.',
            'about-p1': 'مصري أمريكي، 26 عامًا، متخصص في الأمن السيبراني والذكاء الاصطناعي. أعيش حاليًا في القاهرة، مصر. سأتخرج في مايو 2026 كمهندس أمن سيبراني، وأتطلع إلى المساهمة في تطوير حلول أمنية مبتكرة باستخدام تقنيات الذكاء الاصطناعي.',
            'about-p2': 'أعمل حاليًا على كتابة كتاب يسمى "CodeX" حول الحوسبة الكمومية ودمج الذكاء الاصطناعي والعملات المشفرة.',
            
            // Badges
            'badge-1': 'مهندس أمن سيبراني',
            'badge-2': 'مطور أدوات ذكاء اصطناعي',
            'badge-3': 'طالب أمن سيبراني - KSU \'26',
            'badge-4': 'متعدد اللغات: عربي / إنجليزي',
            'badge-5': 'مطور Replit',
            'badge-6': 'مقيم في القاهرة - تواصل عالمي',
            
            // Section titles
            'skills-title': 'المهارات',
            'certifications-title': 'الشهادات',
            'experience-title': 'الخبرة العملية',
            'education-title': 'التعليم',
            'projects-title': 'المشاريع',
            'contact-title': 'اتصل بي',
            
            // Chat
            'chat-header': 'دردش مع محمد',
            'chat-msg1': 'مرحبًا، أنا محمد. أهلاً بك في موقعي الشخصي!',
            'chat-msg2': 'لا تتردد في سؤالي عن أي شيء يتعلق بالأمن السيبراني، الذكاء الاصطناعي، أو مسيرتي المهنية. ✏️',
            'chat-input': 'اكتب رسالتك...',
            
            // Footer
            'footer-name': '© 2025 محمد عبد العزيز',
            'footer-role': 'مهندس أمن سيبراني ومبتكر ذكاء اصطناعي',
            'footer-signature': 'Amrikyy'
        }
    };
    
    // Get elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    
    // Update content based on language
    elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            el.textContent = translations[language][key];
        }
    });
    
    // Update placeholder text for chat input
    const chatInput = document.getElementById('messageInput');
    if (chatInput) {
        chatInput.placeholder = translations[language]['chat-input'];
    }
}

// Initialize particles.js
function initParticles() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#39ff14"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#39ff14",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}
