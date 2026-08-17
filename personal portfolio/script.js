document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".primary-navigation");
    const navigationLinks = [...document.querySelectorAll(".primary-navigation a")];
    const progress = document.querySelector(".scroll-progress");
    const year = document.querySelector("#current-year");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const closeMenu = () => {
        menuButton.setAttribute("aria-expanded", "false");
        navigation.classList.remove("open");
        document.body.classList.remove("menu-open");
        menuButton.querySelector(".sr-only").textContent = "Open navigation";
    };

    menuButton.addEventListener("click", () => {
        const isOpen = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", String(!isOpen));
        navigation.classList.toggle("open", !isOpen);
        document.body.classList.toggle("menu-open", !isOpen);
        menuButton.querySelector(".sr-only").textContent = isOpen ? "Open navigation" : "Close navigation";
    });

    navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navigation.classList.contains("open")) {
            closeMenu();
            menuButton.focus();
        }
    });

    const updateProgress = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
        progress.style.width = `${percentage}%`;
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    if (year) year.textContent = String(new Date().getFullYear());

    const revealItems = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealItems.forEach((item) => revealObserver.observe(item));
    }

    const sections = document.querySelectorAll("main section[id]");
    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navigationLinks.forEach((link) => {
                    const matches = link.getAttribute("href") === `#${entry.target.id}`;
                    link.classList.toggle("active", matches);
                    if (matches) link.setAttribute("aria-current", "location");
                    else link.removeAttribute("aria-current");
                });
            });
        }, { rootMargin: "-35% 0px -55%", threshold: 0 });

        sections.forEach((section) => sectionObserver.observe(section));
    }
});
