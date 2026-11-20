const texts = [
    "Web Developer",
    "Programmer",
    "Student"
];

const typingText = document.getElementById("typing-text");
 
let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentText = texts[textIndex];

    if (!deleting) {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            textIndex++;

            if (textIndex === texts.length) {
                textIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, deleting ? 70 : 120);
}

typeEffect();


// LIGHT AND DARK MODE TOGGLE

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", function() {
    document.body.classList.toggle("light-mode");
});

const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
const navSections = navLinks
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

function updateActiveNav() {
    let activeSection = navSections[0];
    const activationPoint = document.querySelector("header").offsetHeight + 80;

    navSections.forEach(section => {
        if (section.getBoundingClientRect().top <= activationPoint) {
            activeSection = section;
        }
    });

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        activeSection = navSections[navSections.length - 1];
    }

    navLinks.forEach(link => {
        if (link.getAttribute("href") === `#${activeSection.id}`) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

let activeNavUpdateScheduled = false;
window.addEventListener("scroll", function() {
    if (!activeNavUpdateScheduled) {
        window.requestAnimationFrame(function() {
            updateActiveNav();
            activeNavUpdateScheduled = false;
        });
        activeNavUpdateScheduled = true;
    }
}, { passive: true });

window.addEventListener("resize", updateActiveNav);
updateActiveNav();

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(
    ".hero > div:not(.background-word), #about .about-image, #about .about-text, #skills > .section-title, " +
    "#projects > .section-title, .project, #contact > .section-title, .contact-item"
);

if (!prefersReducedMotion && "IntersectionObserver" in window) {
    revealTargets.forEach(target => target.classList.add("reveal"));

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    revealTargets.forEach(target => revealObserver.observe(target));
}