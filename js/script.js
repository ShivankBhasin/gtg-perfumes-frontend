document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "assets/images/Group 1000004277.png",
    "assets/images/Group 1000004277.png",
    "assets/images/Group 1000004277.png",
    "assets/images/Group 1000004277.png"
  ];

  let currentIndex = 0;

  const mainImage = document.querySelector(".gallery-main img");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dots = document.querySelectorAll(".gallery-dots .dot");

  if (!mainImage || !prevBtn || !nextBtn || dots.length === 0) return;

  function updateGallery() {
    mainImage.src = images[currentIndex];

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateGallery();
  });
});

let selectedFragrance = "original";
let selectedPurchase = "single";
const cartButton = document.querySelector(".add-to-cart");

function updateCartLink() {
  const url = `https://example.com/cart?fragrance=${selectedFragrance}&purchase=${selectedPurchase}`;
  cartButton.setAttribute("href", url);
}
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

updateCartLink();

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

document.querySelectorAll(".fragrance-options").forEach(group => {
  const cards = group.querySelectorAll(".fragrance-card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => {
        c.classList.remove("active");
        const radio = c.querySelector(".fragrance-radio");
        if (radio) radio.classList.remove("selected");
      });
      card.classList.add("active");
      const radio = card.querySelector(".fragrance-radio");
      if (radio) radio.classList.add("selected");
    });
  });
});
const singleRadio = document.querySelector(
  ".subscription-box.popular .subscription-radio"
);
const doubleRadio = document.querySelector(
  ".option-card.double-subscription .subscription-radio"
);

const singleHeader = document.querySelector(
  ".subscription-box.popular .option-card"
);
const doubleHeader = document.querySelector(
  ".option-card.double-subscription"
);

const singleContent = document.querySelector(
  ".subscription-box.popular .subscription-content"
);
const doubleContent = document.querySelector(
  ".double-subscription-box .subscription-content"
);
if (
  singleRadio &&
  doubleRadio &&
  singleContent &&
  doubleContent &&
  singleHeader &&
  doubleHeader
) {
  singleContent.style.display = "block";
  doubleContent.style.display = "none";
  singleHeader.classList.add("active");
  doubleHeader.classList.remove("active");
  singleRadio.querySelector(".radio-inner").style.display = "block";
  doubleRadio.querySelector(".radio-inner").style.display = "none";
  singleRadio.addEventListener("click", (e) => {
    e.stopPropagation(); 
    singleContent.style.display = "block";
    doubleContent.style.display = "none";
    singleHeader.classList.add("active");
    doubleHeader.classList.remove("active");
    singleRadio.querySelector(".radio-inner").style.display = "block";
    doubleRadio.querySelector(".radio-inner").style.display = "none";
  });
  doubleRadio.addEventListener("click", (e) => {
    e.stopPropagation(); 
    singleContent.style.display = "none";
    doubleContent.style.display = "block";
    doubleHeader.classList.add("active");
    singleHeader.classList.remove("active");
    doubleRadio.querySelector(".radio-inner").style.display = "block";
    singleRadio.querySelector(".radio-inner").style.display = "none";
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".collection-item");

  items.forEach(item => {
    const header = item.querySelector(".collection-header");
    const icon = item.querySelector(".collection-icon");

    header.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      items.forEach(i => {
        i.classList.remove("open");
        i.querySelector(".collection-icon").src =
          "assets/images/ic--baseline-plus (5) 2.png";
      });
      if (!isOpen) {
        item.classList.add("open");
        icon.src =
          "assets/images/ic--baseline-minus (1) 1.png";
      }
    });
  });
});
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

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});