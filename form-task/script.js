const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const clearBtn = document.getElementById('clearBtn');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const passwordCounter = document.getElementById('passwordCounter');
const welcomeMessage = document.getElementById('welcomeMessage');

// Validation functions
function validateName() {
    const value = nameInput.value.trim();
    if (value === '') {
        nameError.textContent = 'Name is required.';
        return false;
    }
    nameError.textContent = '';
    return true;
}

function validateEmail() {
    const value = emailInput.value.trim();
    if (value === '') {
        emailError.textContent = 'Email is required.';
        return false;
    }
    if (!value.includes('@') || !value.includes('.')) {
        emailError.textContent = "Email must contain '@' and '.'.";
        return false;
    }
    emailError.textContent = '';
    return true;
}

function validatePassword() {
    const value = passwordInput.value;
    passwordCounter.textContent = `${value.length}/6 characters`;

    if (value === '') {
        passwordError.textContent = 'Password is required.';
        return false;
    }
    if (value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters.';
        return false;
    }
    passwordError.textContent = '';
    return true;
}

function validateConfirmPassword() {
    const passwordVal = passwordInput.value;
    const confirmVal = confirmPasswordInput.value;

    if (confirmVal === '') {
        confirmPasswordError.textContent = 'Please confirm your password.';
        return false;
    }
    if (confirmVal !== passwordVal) {
        confirmPasswordError.textContent = 'Passwords do not match.';
        return false;
    }
    confirmPasswordError.textContent = '';
    return true;
}

// Live validation events
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', () => {
    validatePassword();
    if (confirmPasswordInput.value !== '') {
        validateConfirmPassword();
    }
});
confirmPasswordInput.addEventListener('input', validateConfirmPassword);

// Submit event
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value
        };

        console.log('Registration Data Submitted:', formData);
        welcomeMessage.textContent = `Submitted successfully! Name: ${formData.name}`;
    } else {
        welcomeMessage.textContent = '';
    }
});

// Clear event
clearBtn.addEventListener('click', function () {
    form.reset();
    nameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';
    passwordCounter.textContent = '0/6 characters';
    welcomeMessage.textContent = '';
});
