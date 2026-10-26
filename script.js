// =========================
// 1. DARK / LIGHT MODE
// =========================
const themeButton = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");

// Use the saved theme if the visitor picked one before.
if (savedTheme === "light" || savedTheme === "dark") {
  document.documentElement.dataset.theme = savedTheme === "light" ? "light" : "dark";
}

function updateThemeButton() {
  const isLight = document.documentElement.dataset.theme === "light";
  themeButton.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  themeButton.setAttribute("title", isLight ? "Switch to dark mode" : "Switch to light mode");
}

updateThemeButton();

themeButton.addEventListener("click", () => {
  const isLight = document.documentElement.dataset.theme === "light";
  const nextTheme = isLight ? "dark" : "light";

  if (nextTheme === "light") {
    document.documentElement.dataset.theme = "light";
  } else {
    delete document.documentElement.dataset.theme;
  }

  localStorage.setItem("portfolio-theme", nextTheme);
  updateThemeButton();
});

// =========================
// 2. MOBILE NAVIGATION MENU
// =========================
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

// Close the mobile menu after someone selects a section.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// =========================
// 3. REVEAL SECTIONS ON SCROLL
// =========================
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  // Fallback for older browsers.
  revealItems.forEach((item) => item.classList.add("visible"));
}

// =========================
// 4. CONTACT FORM
// =========================
// This starter form uses your email app instead of a backend server.
// Replace the email below with your real email address.
const portfolioEmail = "lloydjohnvillalobos15@gmail.com";
const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

document.getElementById("email-link").href = `mailto:${portfolioEmail}`;
document.getElementById("email-link").textContent = portfolioEmail;

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("sender-name").value.trim();
  const senderEmail = document.getElementById("sender-email").value.trim();
  const message = document.getElementById("sender-message").value.trim();

  if (!name || !senderEmail || !message) {
    formNote.textContent = "Please complete all fields before preparing your email.";
    return;
  }

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${senderEmail}\n\nMessage:\n${message}`
  );

  formNote.textContent = "Opening your email app. Review the message and send it from there.";
  window.location.href = `mailto:${portfolioEmail}?subject=${subject}&body=${body}`;
});

// =========================
// 5. CURRENT YEAR
// =========================
document.getElementById("year").textContent = new Date().getFullYear();
