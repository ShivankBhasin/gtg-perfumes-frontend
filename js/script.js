/* ===============================
   PRODUCT IMAGE SLIDER
================================ */

const images = [
  "assets/images/Group 1000004093.png",
  "assets/images/Group 1000004277.png",
  "assets/images/Group 1000004283.png",
  "assets/images/Group 1000004093.png"
];

let currentIndex = 0;

const mainImage = document.querySelector(".gallery-main img");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".gallery-arrow.prev");
const nextBtn = document.querySelector(".gallery-arrow.next");
const thumbs = document.querySelectorAll(".gallery-thumbs img");

function updateGallery(index) {
  currentIndex = index;
  mainImage.src = images[currentIndex];

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

/* Arrow navigation */
prevBtn.addEventListener("click", () => {
  const newIndex = (currentIndex - 1 + images.length) % images.length;
  updateGallery(newIndex);
});

nextBtn.addEventListener("click", () => {
  const newIndex = (currentIndex + 1) % images.length;
  updateGallery(newIndex);
});

/* Dot navigation */
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => updateGallery(index));
});

/* Thumbnail navigation */
thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => updateGallery(index));
});

/* ===============================
   RADIO SELECTION + CART LOGIC
================================ */

let selectedFragrance = "original";
let selectedPurchase = "single";

const cartButton = document.querySelector(".add-to-cart");

/* Dummy cart URL generator */
function updateCartLink() {
  const url = `https://example.com/cart?fragrance=${selectedFragrance}&purchase=${selectedPurchase}`;
  cartButton.setAttribute("href", url);
}

/* Example radio listeners (IDs assumed) */
document.querySelectorAll('input[name="fragrance"]').forEach(input => {
  input.addEventListener("change", (e) => {
    selectedFragrance = e.target.value;
    updateCartLink();
  });
});

document.querySelectorAll('input[name="purchase"]').forEach(input => {
  input.addEventListener("change", (e) => {
    selectedPurchase = e.target.value;
    toggleSubscriptionDetails();
    updateCartLink();
  });
});

/* Initialize */
updateCartLink();

/* ===============================
   SUBSCRIPTION EXPAND / COLLAPSE
================================ */

const singleSub = document.querySelector(".single-subscription");
const doubleSub = document.querySelector(".double-subscription");

function toggleSubscriptionDetails() {
  if (!singleSub || !doubleSub) return;

  if (selectedPurchase === "single") {
    singleSub.style.display = "block";
    doubleSub.style.display = "none";
  } else if (selectedPurchase === "double") {
    singleSub.style.display = "none";
    doubleSub.style.display = "block";
  }
}

/* ===============================
   COUNT-UP ANIMATION
================================ */

const counters = document.querySelectorAll(".stat-percent");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.target;
        let count = 0;

        const increment = Math.ceil(target / 60);

        const updateCount = () => {
          count += increment;
          if (count >= target) {
            el.textContent = `${target}%`;
          } else {
            el.textContent = `${count}%`;
            requestAnimationFrame(updateCount);
          }
        };

        updateCount();
        observer.unobserve(el);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach(counter => observer.observe(counter));

/* ===============================
   MOBILE MENU TOGGLE
================================ */

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
