// js/auth-frontend-only.js

document.addEventListener('DOMContentLoaded', () => {

    // Helper function to show messages
    function showMessage(element, message, type = 'error') {
        element.textContent = message;
        element.className = type === 'success' ? 'success-message' : 'error-message';
        element.style.display = 'block';
    }

    // Helper function to hide messages
    function hideMessage(element) {
        element.textContent = '';
        element.style.display = 'none';
    }

    // Email validation regex (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // --- Login Form Logic ---
    const loginForm = document.getElementById('loginForm');
    const loginEmailInput = document.getElementById('loginEmail');
    const loginPasswordInput = document.getElementById('loginPassword');
    const loginErrorDiv = document.getElementById('loginError');
    const loginSuccessDiv = document.getElementById('loginSuccess');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            hideMessage(loginErrorDiv);
            hideMessage(loginSuccessDiv);

            const email = loginEmailInput.value.trim();
            const password = loginPasswordInput.value.trim();

            if (!email || !password) {
                showMessage(loginErrorDiv, "Please fill in all fields.");
                return;
            }

            if (!emailRegex.test(email)) {
                showMessage(loginErrorDiv, "Please enter a valid email address.");
                return;
            }

            // Simulate a successful login after a short delay
            showMessage(loginSuccessDiv, "Login simulated successfully! Redirecting...", 'success');
            setTimeout(() => {
                // In a real scenario, you'd redirect after successful API call
                window.location.href = 'my-courses.html';
            }, 1500);
        });
    }

    // --- Sign Up Form Logic ---
    const signupForm = document.getElementById('signupForm');
    const signupNameInput = document.getElementById('signupName');
    const signupEmailInput = document.getElementById('signupEmail');
    const signupPasswordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const signupErrorDiv = document.getElementById('signupError');
    const signupSuccessDiv = document.getElementById('signupSuccess');


    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            hideMessage(signupErrorDiv);
            hideMessage(signupSuccessDiv);

            const name = signupNameInput.value.trim();
            const email = signupEmailInput.value.trim();
            const password = signupPasswordInput.value.trim();
            const confirmPassword = confirmPasswordInput.value.trim();

            if (!name || !email || !password || !confirmPassword) {
                showMessage(signupErrorDiv, "Please fill in all fields.");
                return;
            }

            if (!emailRegex.test(email)) {
                showMessage(signupErrorDiv, "Please enter a valid email address.");
                return;
            }

            if (password.length < 6) {
                showMessage(signupErrorDiv, "Password must be at least 6 characters.");
                return;
            }

            if (password !== confirmPassword) {
                showMessage(signupErrorDiv, "Passwords do not match.");
                return;
            }

            // Simulate a successful signup after a short delay
            showMessage(signupSuccessDiv, "Signup simulated successfully! Redirecting...", 'success');
            setTimeout(() => {
                // In a real scenario, you'd redirect after successful API call
                window.location.href = 'my-courses.html';
            }, 1500);
        });
    }

    // --- Forgot Password Logic ---
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const resetEmailInput = document.getElementById('resetEmail');
    const resetErrorDiv = document.getElementById('resetError');
    const resetSuccessDiv = document.getElementById('resetSuccess');

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            hideMessage(resetErrorDiv);
            hideMessage(resetSuccessDiv);

            const email = resetEmailInput.value.trim();

            if (!email) {
                showMessage(resetErrorDiv, "Please enter your email address.");
                return;
            }

            if (!emailRegex.test(email)) {
                showMessage(resetErrorDiv, "Please enter a valid email address.");
                return;
            }

            // Simulate sending reset link
            showMessage(resetSuccessDiv, "Simulated: Password reset link sent to your email! (Check console for output)", 'success');
            console.log(`Simulating sending reset link to: ${email}`);
            // You might clear the form or disable the button here
        });
    }

    // --- Navbar Auth State for Frontend-Only (Always show Login/Signup) ---
    // For frontend-only, we always show login/signup and hide profile.
    // When you integrate backend, this logic will be replaced by actual user session checks.
    const loginLink = document.querySelector('.navbar .nav-links a[href="login.html"]');
    const signUpLink = document.querySelector('.navbar .nav-links a[href="signup.html"]');
    const profileIcon = document.querySelector('.navbar .nav-links a[href="profile.html"]');

    if (loginLink) loginLink.style.display = 'inline-block';
    if (signUpLink) signUpLink.style.display = 'inline-block';
    if (profileIcon) profileIcon.style.display = 'none';
});
