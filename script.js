// Commented out Firebase import temporarily for dark mode testing
// import { app } from "./firebase-Config";
// console.log("Firebase Initialized:", app);

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click' , () => {
        nav.classList.add('active');
    })
}

if(close){
    close.addEventListener('click' , () => {
        nav.classList.remove('active');
    })
}

// Dark Mode Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';

// Apply the current theme on page load
function applyTheme(theme) {
    console.log('Applying theme:', theme); // Debug log
    if (theme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        console.log('Dark mode activated'); // Debug log
    } else {
        body.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        console.log('Light mode activated'); // Debug log
    }
}

// Initialize theme on page load
applyTheme(currentTheme);

// Check for system preference if no saved preference
if (!localStorage.getItem('theme')) {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDarkScheme.matches) {
        applyTheme('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    console.log('Theme toggle clicked'); // Debug log
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    console.log('Switching from', currentTheme, 'to', newTheme); // Debug log
    
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add a subtle animation effect
    body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// Accessibility: Add keyboard support for theme toggle
themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
    }
});

// Add ARIA attributes for accessibility
themeToggle.setAttribute('role', 'button');
themeToggle.setAttribute('aria-label', 'Toggle dark mode');
themeToggle.setAttribute('tabindex', '0');

console.log('Dark mode script loaded successfully'); // Debug log
