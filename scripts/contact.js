document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  const submitButton = contactForm.querySelector(".submit-btn");
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay hidden";
  document.body.appendChild(modalOverlay);

  function showError(field, message) {
    const errorElement = field.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains("error-message")) {
      const newErrorElement = document.createElement("div");
      newErrorElement.className = "error-message";
      field.parentNode.insertBefore(newErrorElement, field.nextSibling);
    }
    field.nextElementSibling.textContent = message;
    field.nextElementSibling.style.display = "block";
  }

  function clearErrors() {
    document.querySelectorAll(".error-message").forEach((error) => {
      error.style.display = "none";
    });
  }

  function showModal(message, isSuccess) {
    modalOverlay.innerHTML = `
      <div class="modal ${isSuccess ? "success" : "error"}">
        <p>${message}</p>
        <button class="close-modal">Close</button>
      </div>
    `;
    modalOverlay.classList.remove("hidden");

    const closeButton = modalOverlay.querySelector(".close-modal");
    closeButton.addEventListener("click", () => {
      modalOverlay.classList.add("hidden");
    });
  }

  function validateForm() {
    clearErrors();
    let isValid = true;

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const number = contactForm.number.value.trim();
    const message = contactForm.message.value.trim();

    if (name !== "" && (name.length < 2 || name.length > 50)) {
      showError(contactForm.name, "Name must be between 2 and 50 characters.");
      isValid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError(contactForm.email, "Please enter a valid email address.");
      isValid = false;
    }
    if (!/^\d{10}$/.test(number)) {
      showError(
        contactForm.number,
        "Please enter a valid 10-digit phone number."
      );
      isValid = false;
    }
    if (message.length < 10 || message.length > 500) {
      showError(
        contactForm.message,
        "Message must be between 10 and 500 characters."
      );
      isValid = false;
    }
    return isValid;
  }
  let submitting = false;
  document
    .getElementById("submit-btn")
    .addEventListener("click", function (event) {
      event.preventDefault();

      if (!validateForm() || submitting) {
        return;
      }
      submitting = true;

      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      emailjs
        .sendForm(
          "contact_service",
          "contact_form",
          document.getElementById("contact-form")
        )
        .then(() => {
          showModal(
            "<strong>Thank you for reaching out!</strong><br>We've received your message and will get back to you shortly.",
            true
          );
          contactForm.reset();
          submitting = false;
        })
        .catch((error) => {
          console.error("EmailJS error:", error);
          showModal(
            "<strong>Oops! Something went wrong.</strong><br>Please try again later or contact us directly.",
            false
          );
          submitting = false;
        })
        .finally(() => {
          submitButton.disabled = false;
          submitButton.textContent = "Send Message";
        });
    });
});
