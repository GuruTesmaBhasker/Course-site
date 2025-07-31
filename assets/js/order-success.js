// js/order-success.js

document.addEventListener('DOMContentLoaded', () => {
    const orderIdElem = document.getElementById('orderId');
    const totalAmountElem = document.getElementById('totalAmount');
    const coursesPurchasedElem = document.getElementById('coursesPurchased');

    // In a real application, you would fetch the actual order details
    // from your Python backend (e.g., via a URL parameter or session storage)
    // after the payment was processed.

    // For now, we'll use simulated data.
    const simulatedOrderId = '#ABC' + Math.floor(Math.random() * 100000);
    const simulatedTotalAmount = '$' + (Math.random() * 200 + 50).toFixed(2); // Random amount between $50 and $250
    const simulatedCoursesCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 courses

    orderIdElem.textContent = simulatedOrderId;
    totalAmountElem.textContent = simulatedTotalAmount;
    coursesPurchasedElem.textContent = simulatedCoursesCount;

    console.log("Order Success page loaded. Displaying simulated order details.");
});