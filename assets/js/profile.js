// js/profile.js

document.addEventListener('DOMContentLoaded', () => {
    const profileCard = document.getElementById('profileCard');
    const viewModeDiv = document.getElementById('viewMode');
    const profileEditForm = document.getElementById('profileEditForm');

    const displayNameElem = document.getElementById('displayName');
    const displayEmailElem = document.getElementById('displayEmail');
    const displayPhoneElem = document.getElementById('displayPhone');

    const editNameInput = document.getElementById('editName');
    const editEmailInput = document.getElementById('editEmail');
    const editPhoneInput = document.getElementById('editPhone');
    const editPasswordInput = document.getElementById('editPassword');
    const confirmNewPasswordInput = document.getElementById('confirmNewPassword');

    const editProfileBtn = document.getElementById('editProfileBtn');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    const profileErrorDiv = document.getElementById('profileError');
    const profileSuccessDiv = document.getElementById('profileSuccess');

    // Simulated User Data (In a real app, this would come from Firebase Auth and Firestore)
    let currentUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567' // Can be null/empty
    };

    function updateDisplayMode() {
        displayNameElem.textContent = currentUser.name;
        displayEmailElem.textContent = currentUser.email;
        displayPhoneElem.textContent = currentUser.phone || 'N/A'; // Show N/A if no phone
    }

    function setEditMode(isEdit) {
        if (isEdit) {
            profileCard.classList.remove('view-mode');
            profileCard.classList.add('edit-mode');
            // Populate edit form with current data
            editNameInput.value = currentUser.name;
            editEmailInput.value = currentUser.email;
            editPhoneInput.value = currentUser.phone || '';
            editPasswordInput.value = ''; // Always clear password fields
            confirmNewPasswordInput.value = '';
            hideMessage(profileErrorDiv);
            hideMessage(profileSuccessDiv);
        } else {
            profileCard.classList.remove('edit-mode');
            profileCard.classList.add('view-mode');
            updateDisplayMode(); // Refresh display with current data
            hideMessage(profileErrorDiv);
            hideMessage(profileSuccessDiv);
        }
    }

    // Initial setup
    updateDisplayMode();
    setEditMode(false); // Start in view mode

    editProfileBtn.addEventListener('click', () => {
        setEditMode(true);
    });

    cancelEditBtn.addEventListener('click', () => {
        setEditMode(false);
    });

    profileEditForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideMessage(profileErrorDiv);
        hideMessage(profileSuccessDiv);

        const newName = editNameInput.value.trim();
        const newEmail = editEmailInput.value.trim();
        const newPhone = editPhoneInput.value.trim();
        const newPassword = editPasswordInput.value;
        const confirmNewPassword = confirmNewPasswordInput.value;

        // Client-side validation
        if (!newName || !newEmail) {
            showMessage(profileErrorDiv, "Name and Email cannot be empty.");
            return;
        }
        if (!window.validateEmail(newEmail)) { // Using common.js utility
            showMessage(profileErrorDiv, "Please enter a valid email address.");
            return;
        }
        if (newPassword && newPassword.length < 6) {
            showMessage(profileErrorDiv, "New password must be at least 6 characters long.");
            return;
        }
        if (newPassword && newPassword !== confirmNewPassword) {
            showMessage(profileErrorDiv, "New passwords do not match.");
            return;
        }

        // Simulate API call to update profile
        showMessage(profileSuccessDiv, "Saving changes...", 'success');
        console.log("Simulating profile update with:", { newName, newEmail, newPhone, newPassword: newPassword ? '******' : 'unchanged' });

        // In a real application, you would send this data to your Python backend:
        // try {
        //     const response = await fetch('/api/user/profile', {
        //         method: 'PUT',
        //         headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + userToken },
        //         body: JSON.stringify({ name: newName, email: newEmail, phone: newPhone, password: newPassword })
        //     });
        //     const result = await response.json();
        //     if (response.ok) {
        //         currentUser.name = newName;
        //         currentUser.email = newEmail;
        //         currentUser.phone = newPhone;
        //         showMessage(profileSuccessDiv, "Profile updated successfully!", 'success');
        //         setTimeout(() => setEditMode(false), 1500); // Go back to view mode
        //     } else {
        //         showMessage(profileErrorDiv, result.message || "Failed to update profile.");
        //     }
        // } catch (error) {
        //     console.error("Profile update API Error:", error);
        //     showMessage(profileErrorDiv, "An error occurred during profile update.");
        // }

        // Frontend-only simulation:
        setTimeout(() => {
            currentUser.name = newName;
            currentUser.email = newEmail;
            currentUser.phone = newPhone; // Update phone even if empty
            showMessage(profileSuccessDiv, "Profile updated successfully (simulated)!", 'success');
            setTimeout(() => {
                setEditMode(false); // Switch back to view mode
            }, 1500);
        }, 1500); // Simulate 1.5 seconds delay
    });

    // Simulate logout functionality (reused from my-courses.js)
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            console.log("Simulating logout...");
            alert("You have been logged out (simulated).");
            window.location.href = 'login.html'; // Redirect to login page
        });
    }

    console.log("Profile page loaded.");

    // Frontend-only: Ensure profile icon is active and login/signup are hidden
    const loginLink = document.querySelector('.navbar .nav-links a[href="login.html"]');
    const signUpLink = document.querySelector('.navbar .nav-links a[href="signup.html"]');
    const profileIcon = document.querySelector('.navbar .nav-links a[href="profile.html"]');

    if (loginLink) loginLink.style.display = 'none';
    if (signUpLink) signUpLink.style.display = 'none';
    if (profileIcon) profileIcon.style.display = 'inline-flex';
    if (logoutBtn) logoutBtn.style.display = 'inline-block';
});