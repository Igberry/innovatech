// Theme toggle logic
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Load theme preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('innovaTheme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggleBtn.textContent = '☀️';
    } else {
        body.classList.remove('dark-theme');
        themeToggleBtn.textContent = '🌙';
    }
});

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
        themeToggleBtn.textContent = '☀️';
        localStorage.setItem('innovaTheme', 'dark');
    } else {
        themeToggleBtn.textContent = '🌙';
        localStorage.setItem('innovaTheme', 'light');
    }
});

// Contact Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const formResponse = document.getElementById('formResponse');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formResponse.textContent = '';
    formResponse.style.color = '';

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (name.length < 2) {
        formResponse.textContent = 'Please enter a valid name (at least 2 characters).';
        formResponse.style.color = 'crimson';
        contactForm.name.focus();
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formResponse.textContent = 'Please enter a valid email address.';
        formResponse.style.color = 'crimson';
        contactForm.email.focus();
        return;
    }

    if (message.length < 10) {
        formResponse.textContent = 'Message must be at least 10 characters.';
        formResponse.style.color = 'crimson';
        contactForm.message.focus();
        return;
    }

    // Simulate successful submission (replace with real API call if needed)
    formResponse.textContent = 'Thank you for reaching out! We will get back to you soon.';
    formResponse.style.color = '#4f46e5';
    contactForm.reset();
});

document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('nav-menu').classList.toggle('active');
});
