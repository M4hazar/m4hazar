// Typewriter effect
const typewriterTexts = [
    "Web Developer", 
    "Discord Developer",
    "UI/UX Designer",
    "App Developer",
    "Software Engineer"
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter-text');

function typeWriter() {
    const currentText = typewriterTexts[currentTextIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
            setTimeout(typeWriter, 500);
            return;
        }
    } else {
        typewriterElement.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        
        if (currentCharIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000);
            return;
        }
    }
    
    setTimeout(typeWriter, isDeleting ? 50 : 100);
}

// Smooth scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    const headerHeight = document.querySelector('.header').offsetHeight;
    const elementPosition = element.offsetTop - headerHeight;
    
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

// Progress bar
function updateProgressBar() {
    const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.querySelector('.progress-fill').style.width = scrolled + '%';
}

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`Skopiowano: ${text}`);
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(`Skopiowano: ${text}`);
    });
}

// Toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Floating particles animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: ${i % 3 === 0 ? '#00ffff' : i % 3 === 1 ? '#ff00ff' : '#8a2be2'};
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s linear infinite;
            box-shadow: 0 0 6px currentColor;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = ['home', 'about', 'skills', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    let current = '';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
            current = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--neon-cyan) !important;
        background: rgba(0, 255, 255, 0.1) !important;
        text-shadow: 0 0 10px var(--neon-cyan) !important;
    }
    
    @keyframes float {
        0% { transform: translateY(0) translateX(0) rotate(0deg); }
        33% { transform: translateY(-20px) translateX(10px) rotate(120deg); }
        66% { transform: translateY(20px) translateX(-10px) rotate(240deg); }
        100% { transform: translateY(0) translateX(0) rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Start typewriter effect
    setTimeout(typeWriter, 1000);
    
    // Create floating particles
    createParticles();
    
    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.skill-card, .contact-card, .stat');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Navigation click handlers
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
});

// Scroll event listeners
window.addEventListener('scroll', () => {
    updateProgressBar();
    updateActiveNavLink();
});

// Add mobile menu toggle for responsive design
const createMobileMenu = () => {
    const header = document.querySelector('.header .container');
    const nav = document.querySelector('.nav');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: var(--neon-cyan);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        
        @media (max-width: 768px) {
            display: block;
        }
    `;
    
    // Add responsive styles
    const mobileStyle = document.createElement('style');
    mobileStyle.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }
            
            .nav {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: rgba(0, 0, 0, 0.95);
                flex-direction: column;
                padding: 1rem;
                border-top: 1px solid rgba(0, 255, 255, 0.2);
            }
            
            .nav.mobile-open {
                display: flex !important;
            }
        }
    `;
    document.head.appendChild(mobileStyle);
    
    mobileMenuBtn.classList.add('mobile-menu-btn');
    header.appendChild(mobileMenuBtn);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('mobile-open');
    });
    
    // Close mobile menu when clicking nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('mobile-open');
        });
    });
};

// Initialize mobile menu
createMobileMenu();