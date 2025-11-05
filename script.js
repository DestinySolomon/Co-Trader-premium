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
// document.addEventListener("DOMContentLoaded", function () {
//   const video = document.querySelector("video");
//   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

//   if (isMobile) {
//     // For mobile devices, we might want to use a poster image instead
//     // or implement a different strategy for background video
//     video.setAttribute(
//       "poster",
//       "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
//     );
//   }
// });

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
    window.location.href = "signup.html";
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

//Signup page JS logic can go here if needed

document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const passwordToggle = document.getElementById("passwordToggle");
  const confirmPasswordToggle = document.getElementById(
    "confirmPasswordToggle"
  );
  const passwordStrength = document.getElementById("passwordStrength");
  const passwordStrengthText = document.getElementById("passwordStrengthText");

  // Password visibility toggle
  function setupPasswordToggle(input, toggleButton) {
    toggleButton.addEventListener("click", function () {
      const type =
        input.getAttribute("type") === "password" ? "text" : "password";
      input.setAttribute("type", type);

      // Toggle eye icon
      const icon = this.querySelector("i");
      if (type === "text") {
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    });
  }

  setupPasswordToggle(passwordInput, passwordToggle);
  setupPasswordToggle(confirmPasswordInput, confirmPasswordToggle);

  // Password strength indicator
  passwordInput.addEventListener("input", function () {
    const password = this.value;
    let strength = 0;
    let message = "Very Weak";
    let color = "var(--loss-red)";

    // Check password criteria
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;

    // Determine strength level
    if (strength === 0) {
      message = "Enter a password";
      color = "var(--slate)";
    } else if (strength < 50) {
      message = "Weak";
      color = "var(--loss-red)";
    } else if (strength < 75) {
      message = "Medium";
      color = "var(--cyan)";
    } else {
      message = "Strong";
      color = "var(--green)";
    }

    // Update strength indicator
    passwordStrength.style.width = strength + "%";
    passwordStrength.style.background = color;
    passwordStrengthText.textContent = `Password strength: ${message}`;
    passwordStrengthText.style.color = color;

    // Validate password for form submission
    validatePassword();
  });

  // Basic validation
  function validateForm() {
    let isValid = true;

    // Name validation
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");

    if (!firstName.value.trim()) {
      showError("firstNameError", "Please enter your first name");
      isValid = false;
    } else {
      hideError("firstNameError");
    }

    if (!lastName.value.trim()) {
      showError("lastNameError", "Please enter your last name");
      isValid = false;
    } else {
      hideError("lastNameError");
    }

    // Email validation
    const email = document.getElementById("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      showError("emailError", "Please enter a valid email address");
      isValid = false;
    } else {
      hideError("emailError");
    }

    // Password validation
    if (!validatePassword()) {
      isValid = false;
    }

    // Confirm password validation
    if (passwordInput.value !== confirmPasswordInput.value) {
      showError("confirmPasswordError", "Passwords do not match");
      isValid = false;
    } else {
      hideError("confirmPasswordError");
    }

    // Terms validation
    const termsCheckbox = document.getElementById("terms");
    if (!termsCheckbox.checked) {
      showError("termsError", "You must accept the terms and conditions");
      isValid = false;
    } else {
      hideError("termsError");
    }

    return isValid;
  }

  function validatePassword() {
    const password = passwordInput.value;
    const errorElement = document.getElementById("passwordError");

    if (!password) {
      showError("passwordError", "Password is required");
      return false;
    }

    if (password.length < 8) {
      showError("passwordError", "Password must be at least 8 characters long");
      return false;
    }

    // Check for strong password requirements
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      showError(
        "passwordError",
        "Password must include uppercase, lowercase, number and special character"
      );
      return false;
    }

    hideError("passwordError");
    return true;
  }

  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add("show");
  }

  function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.classList.remove("show");
  }

  // Real-time validation
  const inputs = signupForm.querySelectorAll("input[required]");
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateForm();
    });

    input.addEventListener("input", function () {
      const errorId = this.id + "Error";
      hideError(errorId);
    });
  });

  // Form submission
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
      // Form is valid - submit to backend
      signupForm.submit();
    }
  });
});
