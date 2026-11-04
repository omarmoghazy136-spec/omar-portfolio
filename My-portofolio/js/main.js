

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveLink() {
        let currentId = "home";

        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 140 && rect.bottom >= 140) {
                currentId = section.id;
            }
        });

        navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${currentId}`;
            link.classList.toggle("active", isActive);
        });
    }

    const revealItems = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealItems.forEach((item) => observer.observe(item));
    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink, { passive: true });

    const contactForm = document.getElementById("contactForm");
    const statusBox = document.getElementById("form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name")?.value.trim();
            const email = document.getElementById("email")?.value.trim();
            const subject = document.getElementById("subject")?.value.trim();
            const message = document.getElementById("message")?.value.trim();

            if (!name || !email || !subject || !message) {
                if (statusBox) {
                    statusBox.textContent = "Please fill in all fields first.";
                    statusBox.style.color = "#f9d976";
                }
                return;
            }

            const mailtoLink = `mailto:omarmoghazy136@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            window.location.href = mailtoLink;

            if (statusBox) {
                statusBox.textContent = "Your email app is opening. Thanks for the message!";
                statusBox.style.color = "#7dd3fc";
            }

            contactForm.reset();
        });
    }
});
