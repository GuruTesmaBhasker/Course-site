// js/course-detail.js

document.addEventListener('DOMContentLoaded', () => {
    // Get the course ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    const courseTitleElem = document.getElementById('courseTitle');
    const courseShortDescriptionElem = document.getElementById('courseShortDescription');
    const courseLongDescriptionElem = document.getElementById('courseLongDescription');
    const learningOutcomesList = document.getElementById('learningOutcomes');
    const courseModulesList = document.getElementById('courseModules');
    const instructorNameElem = document.getElementById('instructorName');
    const instructorBioElem = document.getElementById('instructorBio');
    const coursePriceElem = document.getElementById('coursePrice');
    const courseDurationElem = document.getElementById('courseDuration');
    const courseLessonsElem = document.getElementById('courseLessons');
    const courseLevelElem = document.getElementById('courseLevel');
    const courseLanguageElem = document.getElementById('courseLanguage');
    const addToCartBtn = document.getElementById('addToCartBtn');

    // Helper function to simulate fetching course data
    async function fetchCourseData(id) {
        // In a real application, you would make an API call to your Python backend:
        // const response = await fetch(`/api/courses/${id}`);
        // const courseData = await response.json();
        // return courseData;

        // For now, we'll use dummy data based on the ID
        const dummyCourses = {
            'web-dev': {
                title: 'Mastering Web Development',
                shortDescription: 'Build modern, responsive, and interactive websites from scratch.',
                longDescription: 'This comprehensive course covers HTML5, CSS3, JavaScript, React, Node.js, and database integration. You will learn to build full-stack web applications, deploy them, and understand best practices for performance and security.',
                learningOutcomes: [
                    'Develop responsive web pages with HTML & CSS',
                    'Implement dynamic user interfaces with JavaScript & React',
                    'Build robust backend APIs with Node.js',
                    'Manage databases and user authentication',
                    'Deploy full-stack applications to the cloud'
                ],
                modules: [
                    'Introduction to Web Development',
                    'HTML & CSS Fundamentals',
                    'JavaScript Basics to Advanced',
                    'Frontend Frameworks: React',
                    'Backend Development: Node.js & Express',
                    'Database Integration: MongoDB/SQL',
                    'Authentication & Authorization',
                    'Deployment & Best Practices'
                ],
                price: 99.99,
                duration: '40 hours',
                lessons: 120,
                level: 'Beginner to Advanced',
                language: 'English',
                instructor: {
                    name: 'Alice Johnson',
                    bio: 'Alice is a senior full-stack developer with 15 years of experience building scalable web applications. She loves teaching and simplifying complex concepts.'
                },
                thumbnailUrl: 'https://placehold.co/400x200/6C5CE7/FFFFFF?text=Web+Dev' // Placeholder image
            },
            'data-science': {
                title: 'Data Science with Python',
                shortDescription: 'Learn data analysis, machine learning, and visualization using Python.',
                longDescription: 'This course provides a strong foundation in data science, covering Python programming, data manipulation with Pandas, numerical computing with NumPy, data visualization with Matplotlib and Seaborn, and an introduction to machine learning algorithms. You will work on hands-on projects to apply your skills.',
                learningOutcomes: [
                    'Perform data cleaning and preprocessing',
                    'Conduct exploratory data analysis',
                    'Build and evaluate machine learning models',
                    'Visualize data effectively',
                    'Apply statistical methods to real-world problems'
                ],
                modules: [
                    'Python for Data Science',
                    'Data Manipulation with Pandas',
                    'Data Visualization',
                    'Statistical Analysis',
                    'Introduction to Machine Learning',
                    'Model Evaluation & Deployment'
                ],
                price: 120.00,
                duration: '35 hours',
                lessons: 100,
                level: 'Intermediate',
                language: 'English',
                instructor: {
                    name: 'Bob Williams',
                    bio: 'Bob is a lead data scientist at a tech company, specializing in predictive modeling and big data analytics. He holds a PhD in Statistics.'
                },
                thumbnailUrl: 'https://placehold.co/400x200/6C5CE7/FFFFFF?text=Data+Science'
            },
            'graphic-design': {
                title: 'Fundamentals of Graphic Design',
                shortDescription: 'Master the principles of design and popular graphic design software.',
                longDescription: 'This course introduces you to the world of graphic design, covering topics like typography, color theory, layout, and image manipulation. You will learn to use Adobe Photoshop, Illustrator, and InDesign to create stunning visual content for various purposes, from branding to digital art.',
                learningOutcomes: [
                    'Understand design principles (hierarchy, balance, contrast)',
                    'Create compelling visual layouts',
                    'Use Photoshop for image editing',
                    'Design vector graphics with Illustrator',
                    'Prepare designs for print and digital media'
                ],
                modules: [
                    'Introduction to Design',
                    'Color Theory & Typography',
                    'Layout & Composition',
                    'Adobe Photoshop Essentials',
                    'Adobe Illustrator Essentials',
                    'Portfolio Project'
                ],
                price: 75.50,
                duration: '25 hours',
                lessons: 75,
                level: 'Beginner',
                language: 'English',
                instructor: {
                    name: 'Carol White',
                    bio: 'Carol is a freelance graphic designer and art director with a passion for creating beautiful and impactful visuals. Her work has been featured in numerous design magazines.'
                },
                thumbnailUrl: 'https://placehold.co/400x200/6C5CE7/FFFFFF?text=Graphic+Design'
            },
            'marketing': {
                title: 'Digital Marketing Masterclass',
                shortDescription: 'Learn strategies for SEO, social media, content, and paid advertising.',
                longDescription: 'This masterclass provides a complete guide to digital marketing. You will learn how to optimize websites for search engines (SEO), build engaging social media campaigns, create valuable content, and run effective paid advertising campaigns on platforms like Google Ads and Facebook Ads. Ideal for marketers and business owners.',
                learningOutcomes: [
                    'Develop a comprehensive digital marketing strategy',
                    'Implement effective SEO techniques',
                    'Manage social media presence and engagement',
                    'Create high-converting content',
                    'Run profitable paid advertising campaigns'
                ],
                modules: [
                    'Introduction to Digital Marketing',
                    'Search Engine Optimization (SEO)',
                    'Social Media Marketing',
                    'Content Marketing',
                    'Email Marketing',
                    'Paid Advertising (PPC)',
                    'Analytics & Reporting'
                ],
                price: 110.00,
                duration: '30 hours',
                lessons: 90,
                level: 'Intermediate',
                language: 'English',
                instructor: {
                    name: 'David Green',
                    bio: 'David is a digital marketing consultant with a track record of helping businesses grow their online presence and revenue. He has worked with startups and Fortune 500 companies.'
                },
                thumbnailUrl: 'https://placehold.co/400x200/6C5CE7/FFFFFF?text=Marketing'
            }
        };
        return dummyCourses[id];
    }

    async function displayCourseDetails() {
        if (!courseId) {
            courseTitleElem.textContent = "Course Not Found";
            courseShortDescriptionElem.textContent = "Please return to the courses page to select a valid course.";
            console.error("No course ID found in URL.");
            return;
        }

        const course = await fetchCourseData(courseId);

        if (course) {
            courseTitleElem.textContent = course.title;
            courseShortDescriptionElem.textContent = course.shortDescription;
            courseLongDescriptionElem.textContent = course.longDescription;
            coursePriceElem.textContent = `$${course.price.toFixed(2)}`;
            courseDurationElem.textContent = course.duration;
            courseLessonsElem.textContent = course.lessons;
            courseLevelElem.textContent = course.level;
            courseLanguageElem.textContent = course.language;
            instructorNameElem.textContent = course.instructor.name;
            instructorBioElem.textContent = course.instructor.bio;

            const sidebarImage = document.querySelector('.course-sidebar .course-placeholder-image');
            if (sidebarImage && course.thumbnailUrl) {
                sidebarImage.style.backgroundImage = `url('${course.thumbnailUrl}')`;
                sidebarImage.style.backgroundSize = 'cover';
                sidebarImage.style.backgroundPosition = 'center';
            }

            learningOutcomesList.innerHTML = '';
            course.learningOutcomes.forEach(outcome => {
                const li = document.createElement('li');
                li.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>${outcome}`;
                learningOutcomesList.appendChild(li);
            });

            courseModulesList.innerHTML = '';
            course.modules.forEach(module => {
                const li = document.createElement('li');
                li.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>${module}`;
                courseModulesList.appendChild(li);
            });

            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', () => {
                    console.log(`Adding "${course.title}" to cart and redirecting to checkout.`);
                    // In a real app, you'd update a cart state or send to backend
                    // For now, we'll just redirect to checkout with the course info
                    alert(`"${course.title}" has been added to your cart!`);
                    // Redirect to checkout page
                    window.location.href = 'checkout.html';
                });
            }

        } else {
            courseTitleElem.textContent = "Course Not Found";
            courseShortDescriptionElem.textContent = "The requested course could not be found. Please check the URL or return to the courses page.";
            courseLongDescriptionElem.textContent = "";
            learningOutcomesList.innerHTML = '';
            courseModulesList.innerHTML = '';
            instructorNameElem.textContent = "";
            instructorBioElem.textContent = "";
            coursePriceElem.textContent = "";
            console.error(`Course with ID "${courseId}" not found in dummy data.`);
        }
    }

    displayCourseDetails();
});