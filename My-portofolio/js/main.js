
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

  // navbar collapse issue handling
  const navbarCollapse = document.getElementById("navbarSupportedContent");
  const navLinks = navbarCollapse.querySelectorAll(".nav-link");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse =
          bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });


    revealItems.forEach((item) => observer.observe(item));
    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink, { passive: true });

    const contactForm = document.getElementById("contactForm");
    const statusBox = document.getElementById("form-status");

    if (contactForm) {
        const EMAILJS_SERVICE_ID = "service_rgdz9i9";
        const EMAILJS_TEMPLATE_ID = "template_0tm8lg5";
        const EMAILJS_PUBLIC_KEY = "3zIB1NkKaIBQ9-aDJ";

        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            if (!window.emailjs) {
                if (statusBox) {
                    statusBox.textContent = "Email service could not be loaded. Please try again later.";
                    statusBox.style.color = "#f9d976";
                }
                return;
            }

            if (statusBox) {
                statusBox.textContent = "Sending your message...";
                statusBox.style.color = "#7dd3fc";
            }

            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
            }

            try {
                window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
                await window.emailjs.sendForm(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    contactForm
                );

                if (statusBox) {
                    statusBox.textContent = "Your message was sent successfully. Thank you!";
                    statusBox.style.color = "#7dd3fc";
                }
                contactForm.reset();
            } catch (error) {
                console.error("EmailJS could not send the contact form:", error);
                if (statusBox) {
                    statusBox.textContent = "Sorry, your message could not be sent. Please try again later.";
                    statusBox.style.color = "#f9d976";
                }
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                }
            }
        });
    }
});
