// -------------------------------------------------------
// Navigation + Slideshow
// -------------------------------------------------------
(function () {
  const nav = document.getElementById("nav");
  const menuIcon = document.querySelector(".menu-icon");

  if (nav && menuIcon) {
    function toggleMenu() {
      nav.classList.toggle("active");
      menuIcon.classList.toggle("active");
    }

    function hideMenu() {
      nav.classList.remove("active");
      menuIcon.classList.remove("active");
    }

    menuIcon.addEventListener("click", toggleMenu);
    document.querySelectorAll("nav a").forEach((link) => {
      link.addEventListener("click", hideMenu);
    });
  }

  // Slideshow
  let currentImageIndex = 0;
  const slides = document.querySelectorAll(".slide");

  if (slides.length > 0) {
    function switchImage() {
      slides[currentImageIndex].classList.remove("active");
      currentImageIndex = (currentImageIndex + 1) % slides.length;
      slides[currentImageIndex].classList.add("active");
    }
    setInterval(switchImage, 5000);
  }
})();

// -------------------------------------------------------
// Scroll Spy — highlight active nav link as user scrolls
// -------------------------------------------------------
(function () {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll("nav a[href^='#']");

  function onScroll() {
    const scrollY = window.scrollY;
    let currentId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120; // offset for fixed header
      if (scrollY >= sectionTop) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "nav-active",
        link.getAttribute("href") === `#${currentId}`
      );
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run once on load
})();

// -------------------------------------------------------
// Category cards — overlay emerges from hovered card
// -------------------------------------------------------
(function () {
  const overlay = document.getElementById("projectsOverlay");
  const overlayIcon = document.getElementById("overlayIcon");
  const overlayTitle = document.getElementById("overlayTitle");
  const overlayBubbles = document.getElementById("overlayBubbles");
  const cards = document.querySelectorAll(".category-card");
  let hideTimeout = null;

  const isTouch = () => window.matchMedia("(hover: none)").matches;

  function showOverlay(card) {
    clearTimeout(hideTimeout);

    // Calculate card center relative to grid center
    const gridRect = overlay.parentElement.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const offsetX =
      cardRect.left + cardRect.width / 2 - (gridRect.left + gridRect.width / 2);
    const offsetY =
      cardRect.top + cardRect.height / 2 - (gridRect.top + gridRect.height / 2);

    // Snap overlay to collapsed state at card position
    overlay.style.transition = "none";
    overlay.style.setProperty("--origin-x", `${offsetX}px`);
    overlay.style.setProperty("--origin-y", `${offsetY}px`);
    overlay.classList.remove("visible");

    // Populate content
    overlayIcon.className = card.querySelector(".category-icon i").className;
    overlayTitle.textContent =
      card.querySelector(".category-label").textContent;
    overlayBubbles.innerHTML = card.querySelector(".project-bubbles").innerHTML;

    // Staggered bubble entrance
    overlayBubbles.querySelectorAll(".proj-bubble").forEach((b, i) => {
      b.style.animation = "none";
      void b.offsetWidth; // force reflow so the browser registers animation:none before we re-enable it
      b.style.animationDelay = `${0.2 + i * 0.07}s`;
      b.style.animation = "";
    });

    // Force reflow so collapsed transform is painted, then re-enable transition and expand
    void overlay.offsetWidth;
    overlay.style.transition = "";
    overlay.classList.add("visible");
  }

  function hideOverlay() {
    hideTimeout = setTimeout(() => overlay.classList.remove("visible"), 120);
  }

  cards.forEach((card) => {
    // Desktop: hover
    card.addEventListener("mouseenter", () => {
      if (isTouch()) return;
      cards.forEach((c) => c.classList.remove("open"));
      card.classList.add("open");
      showOverlay(card);
    });

    card.addEventListener("mouseleave", () => {
      if (isTouch()) return;
      card.classList.remove("open");
      hideOverlay();
    });

    // Touch: tap to toggle
    card.addEventListener("click", (e) => {
      if (!isTouch()) return;
      if (e.target.closest(".proj-bubble") || e.target.closest(".proj-links"))
        return;

      const isOpen = card.classList.contains("open");
      cards.forEach((c) => c.classList.remove("open"));
      if (!isOpen) {
        card.classList.add("open");
        showOverlay(card);
      } else {
        overlay.classList.remove("visible");
      }
    });
  });

  // Keep overlay alive when hovering
  overlay.addEventListener("mouseenter", () => clearTimeout(hideTimeout));
  overlay.addEventListener("mouseleave", () => {
    cards.forEach((c) => c.classList.remove("open"));
    hideOverlay();
  });

  // Touch: close overlay when tapping anywhere outside the cards or overlay.
  document.addEventListener(
    "touchstart",
    (e) => {
      if (!isTouch()) return;
      if (![...cards].some((c) => c.classList.contains("open"))) return;

      const tappedInsideOverlay = overlay.contains(e.target);
      const tappedInsideCard = [...cards].some((c) => c.contains(e.target));

      if (!tappedInsideOverlay && !tappedInsideCard) {
        cards.forEach((c) => c.classList.remove("open"));
        overlay.classList.remove("visible");
      }
    },
    true,
  );
})();

// -------------------------------------------------------
// About section — scroll-triggered entrance animations
// -------------------------------------------------------
(function () {
  const cards = document.querySelectorAll(".about-grid div");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 80}ms`;
    observer.observe(card);
  });
})();

// -------------------------------------------------------
// Banner
// -------------------------------------------------------
const bannerContent = document.getElementById("bannerContent");
const messageHTML =
  '<span class="contact-message">Get in touch at laura.laane@gmail.com \u2014 Let\'s build something great together! \u2736 </span>';
bannerContent.innerHTML = messageHTML.repeat(20);

// -------------------------------------------------------
// Copyright year
// -------------------------------------------------------
const yearEl = document.getElementById("copyright-year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
