// js/courses.js

document.addEventListener('DOMContentLoaded', () => {
    const allCoursesGrid = document.getElementById('allCoursesGrid');
    const searchCoursesInput = document.getElementById('searchCourses');
    const filterCategorySelect = document.getElementById('filterCategory');
    const sortBySelect = document.getElementById('sortBy');
    const applyFiltersButton = document.querySelector('.filter-sort-bar .btn-secondary');

    // In a real application, you would make an API call here to your Python backend
    // to fetch all courses based on filters/sorting, and then dynamically create the course cards.
    // For now, we're using static HTML cards for display.

    // Simulate filter/sort functionality (frontend-only, no actual filtering happening yet)
    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', () => {
            const searchTerm = searchCoursesInput.value.trim();
            const category = filterCategorySelect.value;
            const sortBy = sortBySelect.value;

            console.log("--- Applying Filters (Simulated) ---");
            console.log("Search Term:", searchTerm);
            console.log("Category:", category);
            console.log("Sort By:", sortBy);
            console.log("No actual filtering/sorting performed on frontend yet. This data would be sent to your Python backend.");

            // Here, you would typically make an API call like:
            // fetch(`/api/courses?search=${searchTerm}&category=${category}&sort=${sortBy}`)
            //   .then(response => response.json())
            //   .then(courses => {
            //     // Clear allCoursesGrid and re-render courses
            //   })
            //   .catch(error => console.error('Error fetching filtered courses:', error));
        });
    }

    console.log("Courses Listing page loaded. Filters and courses are currently static placeholders.");
});
