const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

function setMenu(isOpen) {
  navLinks.classList.toggle("open", isOpen);
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.setAttribute(
    "aria-label",
    isOpen ? "Fermer le menu" : "Ouvrir le menu"
  );
}

menuBtn.addEventListener("click", () => {
  setMenu(!navLinks.classList.contains("open"));
});

navLinks.addEventListener("click", () => setMenu(false));

if (typeof Swiper !== "undefined") {
  new Swiper(".swiper", {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 20,
  });
}

// Animations au défilement (IntersectionObserver, sans dépendance)
const revealGroups = [
  ".header__container h1",
  ".header__container .section__description",
  ".header__link",
  ".shop__card",
  ".about__image",
  ".about__content .section__header",
  ".about__content .section__description",
  ".about__stats",
  ".choose__header",
  ".swiper",
  ".banner__container p",
];

const revealItems = [];
revealGroups.forEach((selector) => {
  document.querySelectorAll(selector).forEach((el, index) => {
    el.classList.add("reveal");
    el.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 0.15}s`);
    revealItems.push(el);
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealItems.forEach((el) => observer.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add("is-visible"));
}
