// HERO PAGE JAVASCRIPT LOGIC
// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "var(--navy)";
    navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.2)";
  } else {
    navbar.style.backgroundColor = "rgba(7, 18, 38, 0.9)";
    navbar.style.boxShadow = "none";
  }
});

// Video fallback for mobile devices
document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector("video");
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // For mobile devices, we might want to use a poster image instead
    // or implement a different strategy for background video
    video.setAttribute(
      "poster",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    );
  }
});

// Back to Top Button
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// pricing section
document.addEventListener("DOMContentLoaded", function () {
  const planCards = document.querySelectorAll(".plan-card");
  const planButtons = document.querySelectorAll(".plan-btn");

  function handlePlanSelection(plan, price) {
    // Store plan selection temporarily
    sessionStorage.setItem("selectedPlan", plan);
    sessionStorage.setItem("selectedPrice", price);

    // Always go to signup page - backend will handle auth check
    window.location.href = "signup-plan.html";
  }

  // Event listeners
  planCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (!e.target.classList.contains("plan-btn")) {
        const plan = card.getAttribute("data-plan");
        const price = card.getAttribute("data-price");
        handlePlanSelection(plan, price);
      }
    });
  });

  planButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = button.closest(".plan-card");
      const plan = card.getAttribute("data-plan");
      const price = card.getAttribute("data-price");
      handlePlanSelection(plan, price);
    });
  });
});
