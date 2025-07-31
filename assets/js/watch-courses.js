// js/watch-course.js

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    let currentLessonIndex = parseInt(urlParams.get('lesson')) - 1 || 0; // 0-indexed

    const coursePlayerTitleElem = document.getElementById('coursePlayerTitle');
    const courseVideoPlayer = document.getElementById('courseVideoPlayer');
    const lessonTitleElem = document.getElementById('lessonTitle');
    const lessonDescriptionElem = document.getElementById('lessonDescription');
    const prevLessonBtn = document.getElementById('prevLessonBtn');
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    const lessonListElem = document.getElementById('lessonList');
    const logoutBtn = document.getElementById('logoutBtn');

    let courseData = null; // Will store the fetched course data

    // Simulated Course Data (In a real app, this would come from your Python backend)
    const dummyCourseContent = {
        'web-dev': {
            title: 'Mastering Web Development',
            lessons: [
                {
                    id: 1,
                    title: 'Introduction to Web Development',
                    description: 'Get started with the basics of how the web works.',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' // Public domain video for demo
                },
                {
                    id: 2,
                    title: 'HTML & CSS Fundamentals',
                    description: 'Learn the building blocks of web pages.',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4' // Another public domain video
                },
                {
                    id: 3,
                    title: 'JavaScript Basics',
                    description: 'Understand core programming concepts with JavaScript.',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
                },
                {
                    id: 4,
                    title: 'Responsive Design Principles',
                    description: 'Make your websites look great on any device.',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4'
                },
                {
                    id: 5,
                    title: 'Introduction to React',
                    description: 'Start building interactive UIs with React.',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
                }
            ]
        },
        'data-science': {
            title: 'Data Science with Python',
            lessons: [
                { id: 1, title: 'What is Data Science?', description: 'An overview of the field.', videoUrl: 'https://www.w3schools.com/html/movie.mp4' },
                { id: 2, title: 'Python for Data Analysis Setup', description: 'Setting up your environment.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
                { id: 3, title: 'Introduction to Pandas', description: 'Working with dataframes.', videoUrl: 'https://www.w3schools.com/html/movie.mp4' }
            ]
        }
    };

    // Function to load and display lesson content
    function loadLesson(index) {
        if (!courseData || index < 0 || index >= courseData.lessons.length) {
            console.error("Invalid lesson index or course data not loaded.");
            return;
        }

        currentLessonIndex = index;
        const lesson = courseData.lessons[currentLessonIndex];

        lessonTitleElem.textContent = lesson.title;
        lessonDescriptionElem.textContent = lesson.description;
        courseVideoPlayer.src = lesson.videoUrl;
        courseVideoPlayer.load(); // Load the new video source
        courseVideoPlayer.play(); // Auto-play the video

        // Update active class in lesson list
        document.querySelectorAll('.lesson-list li').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`.lesson-list li[data-lesson-id="${lesson.id}"]`).classList.add('active');

        // Update navigation buttons state
        prevLessonBtn.disabled = currentLessonIndex === 0;
        nextLessonBtn.disabled = currentLessonIndex === courseData.lessons.length - 1;
    }

    // Function to fetch course content (simulated)
    async function fetchCourseContent(id) {
        // In a real app, this would be an API call to your Python backend:
        // const response = await fetch(`/api/user/courses/${id}/content`);
        // const data = await response.json();
        // return data;

        // Simulate fetching based on dummy data
        return dummyCourseContent[id];
    }

    // Initialize the page
    async function initializeCoursePlayer() {
        if (!courseId) {
            coursePlayerTitleElem.textContent = "Course Not Found";
            lessonTitleElem.textContent = "Please select a course to watch.";
            console.error("No course ID found in URL for player.");
            return;
        }

        courseData = await fetchCourseContent(courseId);

        if (courseData) {
            coursePlayerTitleElem.textContent = courseData.title;

            // Populate lesson list
            lessonListElem.innerHTML = '';
            courseData.lessons.forEach(lesson => {
                const li = document.createElement('li');
                li.setAttribute('data-lesson-id', lesson.id);
                li.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>${lesson.title}`;
                li.addEventListener('click', () => loadLesson(courseData.lessons.indexOf(lesson)));
                lessonListElem.appendChild(li);
            });

            // Load the initial lesson
            loadLesson(currentLessonIndex);

        } else {
            coursePlayerTitleElem.textContent = "Course Content Unavailable";
            lessonTitleElem.textContent = "The content for this course could not be loaded.";
            console.error(`Course content for ID "${courseId}" not found.`);
        }
    }

    // Event listeners for navigation buttons
    prevLessonBtn.addEventListener('click', () => {
        if (currentLessonIndex > 0) {
            loadLesson(currentLessonIndex - 1);
        }
    });

    nextLessonBtn.addEventListener('click', () => {
        if (currentLessonIndex < courseData.lessons.length - 1) {
            loadLesson(currentLessonIndex + 1);
        } else {
            // End of course, maybe show completion message or redirect
            alert("Congratulations! You have completed all lessons in this course (simulated).");
            console.log("End of course reached.");
            // You might redirect to a completion page or back to My Courses
            // window.location.href = 'my-courses.html';
        }
    });

    // Simulate logout functionality (reused from my-courses.js)
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            console.log("Simulating logout...");
            alert("You have been logged out (simulated).");
            window.location.href = 'login.html'; // Redirect to login page
        });
    }

    // Initialize the course player
    initializeCoursePlayer();

    console.log("Course Player page loaded.");
});