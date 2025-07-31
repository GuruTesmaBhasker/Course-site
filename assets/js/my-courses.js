// js/my-courses.js

document.addEventListener('DOMContentLoaded', () => {
    const myCoursesGrid = document.getElementById('myCoursesGrid');
    const logoutBtn = document.getElementById('logoutBtn');

    // Simulate fetching user's purchased courses and their progress
    // In a real app, this would be an API call to your Python backend
    // which would query Firestore/Firebase Realtime Database for user-specific courses.
    const simulatedPurchasedCourses = [
        {
            id: 'web-dev',
            title: 'Mastering Web Development',
            progress: 75, // Percentage
            thumbnailUrl: 'https://placehold.co/400x180/6C5CE7/FFFFFF?text=Web+Dev'
        },
        {
            id: 'data-science',
            title: 'Data Science with Python',
            progress: 20,
            thumbnailUrl: 'https://placehold.co/400x180/6C5CE7/FFFFFF?text=Data+Science'
        },
        {
            id: 'graphic-design',
            title: 'Fundamentals of Graphic Design',
            progress: 100,
            thumbnailUrl: 'https://placehold.co/400x180/6C5CE7/FFFFFF?text=Graphic+Design'
        },
        {
            id: 'cloud-fundamentals',
            title: 'Cloud Computing Fundamentals',
            progress: 0,
            thumbnailUrl: 'https://placehold.co/400x180/6C5CE7/FFFFFF?text=Cloud+Basics'
        }
    ];

    function renderMyCourses() {
        myCoursesGrid.innerHTML = ''; // Clear static cards

        if (simulatedPurchasedCourses.length === 0) {
            myCoursesGrid.innerHTML = '<p style="text-align: center; width: 100%;">You have not purchased any courses yet. <a href="courses.html">Browse our courses!</a></p>';
            return;
        }

        simulatedPurchasedCourses.forEach(course => {
            const card = document.createElement('div');
            card.classList.add('my-course-card');

            const buttonText = course.progress === 100 ? 'Review Course' : (course.progress > 0 ? 'Resume Course' : 'Start Course');
            const lessonParam = course.progress === 100 ? 'last' : '1'; // Direct to first lesson or last completed

            card.innerHTML = `
                <div class="course-thumbnail" style="background-image: url('${course.thumbnailUrl}');"></div>
                <h3>${course.title}</h3>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${course.progress}%;"></div>
                </div>
                <p class="progress-text">${course.progress}% Complete</p>
                <a href="watch-course.html?id=${course.id}&lesson=${lessonParam}" class="btn btn-primary">${buttonText}</a>
            `;
            myCoursesGrid.appendChild(card);
        });
    }

    // Simulate logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            console.log("Simulating logout...");
            alert("You have been logged out (simulated).");
            // In a real app, this would be: firebase.auth().signOut().then(...)
            window.location.href = 'login.html'; // Redirect to login page
        });
    }

    // Initial render
    renderMyCourses();
    console.log("My Courses page loaded. Displaying simulated purchased courses.");

    // Frontend-only: Show logout button and hide login/signup on this page
    const loginLink = document.querySelector('.navbar .nav-links a[href="login.html"]');
    const signUpLink = document.querySelector('.navbar .nav-links a[href="signup.html"]');
    const profileIcon = document.querySelector('.navbar .nav-links a[href="profile.html"]');

    if (loginLink) loginLink.style.display = 'none';
    if (signUpLink) signUpLink.style.display = 'none';
    if (profileIcon) profileIcon.style.display = 'inline-flex'; // Show profile icon
    if (logoutBtn) logoutBtn.style.display = 'inline-block'; // Show logout button
});