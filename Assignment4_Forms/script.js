function setupValidation(formId, successId) {
  const form = document.getElementById(formId);
  const success = document.getElementById(successId);

  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (formId === 'registrationForm') {
      const password = document.getElementById('password');
      const confirmPassword = document.getElementById('confirmPassword');
      const confirmFeedback = document.getElementById('confirmFeedback');
      const genderSelected = form.querySelector('input[name="gender"]:checked');
      const genderFeedback = document.getElementById('genderFeedback');

      if (confirmPassword.value !== password.value || confirmPassword.value.length === 0) {
        confirmPassword.setCustomValidity('Passwords do not match');
        confirmFeedback.textContent = 'Passwords must match.';
      } else {
        confirmPassword.setCustomValidity('');
      }

      genderFeedback.style.display = genderSelected ? 'none' : 'block';
    }

    form.classList.add('was-validated');

    if (form.checkValidity()) {
      if (success) success.classList.remove('d-none');
    } else {
      if (success) success.classList.add('d-none');
    }
  });

  form.addEventListener('input', function (event) {
    if (event.target.id === 'password' || event.target.id === 'confirmPassword') {
      const password = document.getElementById('password');
      const confirmPassword = document.getElementById('confirmPassword');
      if (confirmPassword.value === password.value && confirmPassword.value.length > 0) {
        confirmPassword.setCustomValidity('');
      } else if (confirmPassword.value.length > 0) {
        confirmPassword.setCustomValidity('Passwords do not match');
      }
    }
    if (success) success.classList.add('d-none');
  });

  form.addEventListener('reset', function () {
    form.classList.remove('was-validated');
    if (success) success.classList.add('d-none');
    const confirmPassword = document.getElementById('confirmPassword');
    if (confirmPassword) confirmPassword.setCustomValidity('');
    const genderFeedback = document.getElementById('genderFeedback');
    if (genderFeedback) genderFeedback.style.display = '';
  });
}

setupValidation('validationForm', 'validationSuccess');
setupValidation('registrationForm', 'registrationSuccess');
