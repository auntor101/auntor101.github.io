// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Copy email function
function copyEmail() {
    const email = 'auntorchakma@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.background = '#10b981';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy email:', err);
    });
}

// Load CV link and profile picture from localStorage
window.addEventListener('DOMContentLoaded', () => {
    // Load CV link
    const cvButton = document.getElementById('downloadCV');
    if (cvButton) {
        const cvLink = localStorage.getItem('cvUrl');
        if (cvLink) {
            cvButton.href = cvLink;
            cvButton.target = '_blank';
        } else {
            cvButton.addEventListener('click', (e) => {
                e.preventDefault();
                alert('CV not available yet. Please check back later.');
            });
        }
    }

    // Load profile picture
    const profilePic = localStorage.getItem('profilePic');
    if (profilePic) {
        const avatars = document.querySelectorAll('.avatar');
        avatars.forEach(avatar => {
            avatar.innerHTML = `<img src="${profilePic}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
        });
    }
});

// Load publication links from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const pubLinks = document.querySelectorAll('.pub-link');
    pubLinks.forEach(link => {
        const pubId = link.getAttribute('data-pub-id');
        if (pubId) {
            // Check localStorage for saved links (format: pub_0_pdf, pub_0_link, etc.)
            const index = pubId.match(/\d+/)?.[0] || '0';
            const type = pubId.includes('pdf') ? 'pdf' : 'link';
            const storedLink = localStorage.getItem(`pub_${index}_${type}`);
            
            if (storedLink) {
                link.href = storedLink;
                link.target = '_blank';
            } else {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    alert('Link not available yet. Please check back later.');
                });
            }
        }
    });
});

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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.stat-card, .research-card, .project-card, .education-card, .achievement-card, .activity-card, .skill-category, .publication-card, .quick-link-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Active page highlighting in navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});