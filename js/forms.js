/**
 * Form Handling Module
 * Handles form validation and submission
 */

class FormHandler {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupForms());
    } else {
      this.setupForms();
    }
  }

  setupForms() {
    // Find booking form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
      this.setupBookingForm(bookingForm);
    }
  }

  setupBookingForm(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleBookingSubmit(form);
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });

      input.addEventListener('input', () => {
        // Clear error on input
        const errorElement = input.parentElement.querySelector('.form-error');
        if (errorElement) {
          errorElement.classList.remove('show');
        }
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Remove previous error
    const errorElement = field.parentElement.querySelector('.form-error');
    if (errorElement) {
      errorElement.classList.remove('show');
    }

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      if (typeof i18n !== 'undefined') {
        errorMessage = i18n.t(`booking.validation.${fieldName}Required`);
      } else {
        errorMessage = 'This field is required';
      }
    }

    // Phone validation
    if (fieldName === 'phone' && value) {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        if (typeof i18n !== 'undefined') {
          errorMessage = i18n.t('booking.validation.phoneInvalid');
        } else {
          errorMessage = 'Please enter a valid 10-digit phone number';
        }
      }
    }

    // Email validation
    if (fieldName === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    // Show error if invalid
    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  showFieldError(field, message) {
    // Remove existing error
    const existingError = field.parentElement.querySelector('.form-error');
    if (existingError) {
      existingError.remove();
    }

    // Create error element
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error show';
    errorElement.textContent = message;
    field.parentElement.appendChild(errorElement);

    // Add error class to field
    field.style.borderColor = 'var(--color-error)';
  }

  validateForm(form) {
    const fields = form.querySelectorAll('[required]');
    let isValid = true;

    fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  async handleBookingSubmit(form) {
    // Validate form
    if (!this.validateForm(form)) {
      return;
    }

    // Get form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    if (typeof i18n !== 'undefined') {
      submitButton.textContent = i18n.t('booking.form.submitting');
    } else {
      submitButton.textContent = 'Submitting...';
    }

    try {
      // Get form action (should be set to Formspree or similar)
      const action = form.getAttribute('action') || form.getAttribute('data-action');
      
      if (!action || action === '' || action.includes('YOUR_FORM_ID')) {
        // Fallback: Show success message directly (for demo/testing)
        // In production, configure Formspree or your form handler
        console.warn('No form action specified. Showing success message. Please configure form action in booking.html');
        
        // Simulate successful submission
        setTimeout(() => {
          this.showSuccessMessage(form, data);
          form.reset();
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }, 1000);
        return;
      } else {
        // Submit to actual endpoint
        const response = await fetch(action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          this.showSuccessMessage(form, data);
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      this.showErrorMessage(form);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }

  showSuccessMessage(form, data) {
    // Hide form
    form.style.display = 'none';

    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    
    const currentLang = typeof i18n !== 'undefined' ? i18n.getLanguage() : 'en';
    const content = typeof i18n !== 'undefined' ? i18n.content[currentLang]?.booking?.success : null;

    if (content) {
      successDiv.innerHTML = `
        <h3>${content.title}</h3>
        <p>${content.message}</p>
        <div style="margin-top: 2rem; text-align: left;">
          <h4>${content.nextSteps}</h4>
          <ul style="margin-top: 1rem; padding-left: 1.5rem;">
            <li>${content.step1}</li>
            <li>${content.step2}</li>
            <li>${content.step3}</li>
          </ul>
          <p style="margin-top: 1.5rem; font-weight: 600;">
            ${content.contact} <a href="tel:+91XXXXXXXXXX" class="contact-link">+91 XXXXXXXXXX</a>
          </p>
        </div>
      `;
    } else {
      successDiv.innerHTML = `
        <h3>Booking Request Submitted!</h3>
        <p>Thank you for choosing LaundryDone. We've received your booking request and will contact you shortly.</p>
      `;
    }

    // Insert success message before form
    form.parentElement.insertBefore(successDiv, form);

    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  showErrorMessage(form) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error show';
    errorDiv.style.marginBottom = '1rem';
    errorDiv.style.padding = '1rem';
    errorDiv.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
    errorDiv.style.border = '2px solid var(--color-error)';
    errorDiv.style.borderRadius = 'var(--border-radius)';

    const currentLang = typeof i18n !== 'undefined' ? i18n.getLanguage() : 'en';
    const content = typeof i18n !== 'undefined' ? i18n.content[currentLang]?.booking?.error : null;

    if (content) {
      errorDiv.innerHTML = `<strong>${content.title}</strong><br>${content.message}`;
    } else {
      errorDiv.innerHTML = '<strong>Error</strong><br>There was an error submitting your booking request. Please try again or call us directly.';
    }

    form.insertBefore(errorDiv, form.firstChild);

    // Scroll to error
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Initialize form handler
new FormHandler();

