// js/common.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Auth State Listener (Frontend-only simulation for now) ---
    const loginLink = document.querySelector('.navbar .nav-links a[href="login.html"]');
    const signUpLink = document.querySelector('.navbar .nav-links a[href="signup.html"]');
    const profileIcon = document.querySelector('.navbar .nav-links a[href="profile.html"]');

    // Initially, for frontend-only, we assume user is logged out.
    // When Firebase is integrated, this will be updated by auth.onAuthStateChanged
    if (loginLink) loginLink.style.display = 'inline-block';
    if (signUpLink) signUpLink.style.display = 'inline-block';
    if (profileIcon) profileIcon.style.display = 'none';

    // --- Utility Functions (Examples) ---
    window.showMessage = function(element, message, type = 'error') {
        element.textContent = message;
        element.className = type === 'success' ? 'success-message' : 'error-message';
        element.style.display = 'block';
    };

    window.hideMessage = function(element) {
        element.textContent = '';
        element.style.display = 'none';
    };

    window.validateEmail = function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // --- FUTURE: Firebase Initialization & Auth Listener (when you're ready) ---
    // Make sure firebase-app-compat.js and firebase-auth-compat.js are loaded in HTML.
    /*
    if (typeof firebase !== 'undefined' && typeof firebase.auth !== 'undefined') {
        // This is where Firebase will be initialized if not in firebase-config.js
        // If firebase-config.js does firebase.initializeApp(), you just get the auth instance.
        // const auth = firebase.auth(); // Assuming it's exposed globally or via firebase-config.js

        // auth.onAuthStateChanged((user) => {
        //     if (user) {
        //         // User is signed in
        //         if (loginLink) loginLink.style.display = 'none';
        //         if (signUpLink) signUpLink.style.display = 'none';
        //         if (profileIcon) profileIcon.style.display = 'inline-flex';
        //         // Potentially update profile icon with user's photoURL or initials
        //     } else {
        //         // User is signed out
        //         if (loginLink) loginLink.style.display = 'inline-block';
        //         if (signUpLink) signUpLink.style.display = 'inline-block';
        //         if (profileIcon) profileIcon.style.display = 'none';
        //     }
        // });
    } else {
        console.warn("Firebase SDK not detected. Auth state will not be dynamic.");
    }
    */
});
