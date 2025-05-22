document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize chat functionality
    initChat();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize language toggle
    initLanguageToggle();
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
            
            // Simulate response (in a real implementation, this would be handled by a backend)
            setTimeout(function() {
                const responses = [
                    "Thanks for reaching out! I'm currently focused on cybersecurity and AI projects.",
                    "That's an interesting question about my work. I'm currently writing a book called 'CodeX' about quantum computing and AI integration.",
                    "I'd be happy to discuss my projects or experience in more detail.",
                    "Feel free to connect with me on LinkedIn or other social platforms listed in the contact section."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'bot');
            }, 1000);
        }
    }
    
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
    
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Insert menu button before nav links
    nav.insertBefore(menuBtn, navLinks);
    
    // Toggle menu on button click
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Change icon based on menu state
        if (navLinks.classList.contains('active')) {
            menuBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
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
            'hero-btn': 'Contact',
            
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
            'footer-signature': 'أمريكي'
        }
    };
    
    // Get translation for current language
    const translation = translations[language];
    
    // Update navigation links
    document.querySelectorAll('.nav-links a').forEach((link, index) => {
        const key = `nav-${link.getAttribute('href').substring(1)}`;
        if (translation[key]) {
            link.textContent = translation[key];
        }
    });
    
    // Update hero section
    if (document.querySelector('.hero-content h1')) {
        document.querySelector('.hero-content h1').textContent = translation['hero-title'];
        document.querySelector('.hero-content p').textContent = translation['hero-subtitle'];
        document.querySelector('.hero-btn').textContent = translation['hero-btn'];
    }
    
    // Update profile section
    if (document.querySelector('.profile-title h1')) {
        document.querySelector('.profile-title h1').textContent = translation['profile-title'];
        document.querySelector('.profile-subtitle .highlight').textContent = translation['profile-subtitle-1'];
        document.querySelector('.profile-subtitle .highlight-alt').textContent = translation['profile-subtitle-2'];
        document.querySelector('.tagline .highlight').textContent = translation['tagline'];
        
        const aboutParagraphs = document.querySelectorAll('.about-content p:not(.tagline)');
        if (aboutParagraphs.length >= 2) {
            aboutParagraphs[0].textContent = translation['about-p1'];
            aboutParagraphs[1].innerHTML = translation['about-p2'].replace('"CodeX"', '<span class="highlight">"CodeX"</span>');
        }
    }
    
    // Update badges
    document.querySelectorAll('.badge').forEach((badge, index) => {
        const key = `badge-${index + 1}`;
        if (translation[key]) {
            // Keep the icon, update only the text
            const icon = badge.querySelector('i').outerHTML;
            badge.innerHTML = icon + ' ' + translation[key];
        }
    });
    
    // Update section titles
    const sectionTitles = {
        '#skills': 'skills-title',
        '#certifications': 'certifications-title',
        '#experience': 'experience-title',
        '#education': 'education-title',
        '#projects': 'projects-title',
        '#contact': 'contact-title'
    };
    
    for (const [selector, key] of Object.entries(sectionTitles)) {
        const element = document.querySelector(`h2${selector}`);
        if (element && translation[key]) {
            // Keep the icon, update only the text
            const icon = element.querySelector('i').outerHTML;
            element.innerHTML = icon + ' ' + translation[key];
        }
    }
    
    // Update chat elements
    if (document.querySelector('.chat-header h3')) {
        document.querySelector('.chat-header h3').textContent = translation['chat-header'];
        
        const chatMessages = document.querySelectorAll('.chat-messages .bot-message');
        if (chatMessages.length >= 2) {
            chatMessages[0].querySelector('.message-content').textContent = translation['chat-msg1'];
            chatMessages[1].querySelector('.message-content').textContent = translation['chat-msg2'];
        }
        
        document.querySelector('#messageInput').placeholder = translation['chat-input'];
    }
    
    // Update footer
    if (document.querySelector('.footer-name')) {
        document.querySelector('.footer-name').innerHTML = translation['footer-name'].replace('Mohamed Abdelaziz', '<span class="neon-text">' + (language === 'en' ? 'Mohamed Abdelaziz' : 'محمد عبد العزيز') + '</span>');
        document.querySelector('.footer-role').textContent = translation['footer-role'];
        document.querySelector('.footer-signature').textContent = translation['footer-signature'];
    }
}
