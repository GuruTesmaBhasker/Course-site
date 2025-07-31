// js/checkout.js

document.addEventListener('DOMContentLoaded', () => {
    const orderItemsList = document.getElementById('orderItemsList');
    const subtotalAmountElem = document.getElementById('subtotalAmount');
    const taxAmountElem = document.getElementById('taxAmount');
    const grandTotalAmountElem = document.getElementById('grandTotalAmount');
    const paymentForm = document.getElementById('paymentForm');
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    const cvcInput = document.getElementById('cvc');
    const cardNameInput = document.getElementById('cardName');
    const paymentErrorDiv = document.getElementById('paymentError');
    const paymentSuccessDiv = document.getElementById('paymentSuccess');

    // Simulated Cart Data (In a real app, this would come from a global cart state or backend)
    const simulatedCart = [
        { id: 'web-dev', name: 'Mastering Web Development', price: 99.99 },
        { id: 'digital-marketing', name: 'Digital Marketing Masterclass', price: 110.00 },
        { id: 'graphic-design', name: 'Fundamentals of Graphic Design', price: 75.50 }
    ];

    function renderOrderSummary() {
        orderItemsList.innerHTML = ''; // Clear existing items
        let subtotal = 0;

        simulatedCart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('order-item');
            listItem.innerHTML = `
                <span class="order-item-name">${item.name}</span>
                <span class="order-item-price">$${item.price.toFixed(2)}</span>
            `;
            orderItemsList.appendChild(listItem);
            subtotal += item.price;
        });

        const taxRate = 0.00; // Assuming 0% tax for now
        const tax = subtotal * taxRate;
        const grandTotal = subtotal + tax;

        subtotalAmountElem.textContent = `$${subtotal.toFixed(2)}`;
        taxAmountElem.textContent = `$${tax.toFixed(2)}`;
        grandTotalAmountElem.textContent = `$${grandTotal.toFixed(2)}`;
    }

    function validatePaymentForm() {
        hideMessage(paymentErrorDiv);
        hideMessage(paymentSuccessDiv);

        const cardNumber = cardNumberInput.value.trim().replace(/\s/g, ''); // Remove spaces
        const expiryDate = expiryDateInput.value.trim();
        const cvc = cvcInput.value.trim();
        const cardName = cardNameInput.value.trim();

        if (!cardNumber || !expiryDate || !cvc || !cardName) {
            showMessage(paymentErrorDiv, "Please fill in all payment details.");
            return false;
        }

        // Basic card number validation (13-16 digits)
        if (!/^[0-9]{13,16}$/.test(cardNumber)) {
            showMessage(paymentErrorDiv, "Please enter a valid card number (13-16 digits).");
            return false;
        }

        // Basic expiry date validation (MM/YY format, future date)
        if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiryDate)) {
            showMessage(paymentErrorDiv, "Invalid expiry date format (MM/YY).");
            return false;
        }
        const [month, year] = expiryDate.split('/').map(Number);
        const currentYear = new Date().getFullYear() % 100; // Last two digits
        const currentMonth = new Date().getMonth() + 1; // 1-12

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            showMessage(paymentErrorDiv, "Card expiry date cannot be in the past.");
            return false;
        }

        // Basic CVC validation (3 or 4 digits)
        if (!/^[0-9]{3,4}$/.test(cvc)) {
            showMessage(paymentErrorDiv, "Invalid CVC (3 or 4 digits).");
            return false;
        }

        return true;
    }

    paymentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validatePaymentForm()) {
            return; // Stop if validation fails
        }

        // Simulate payment processing
        showMessage(paymentSuccessDiv, "Processing your payment...", 'success');
        console.log("Simulating payment for:", simulatedCart);

        // In a real application, you would send payment details to your Python backend here
        // The backend would then interact with a payment gateway (e.g., Stripe, PayPal)
        // try {
        //     const response = await fetch('/api/process-payment', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({
        //             cart: simulatedCart,
        //             paymentDetails: {
        //                 cardNumber: cardNumberInput.value,
        //                 expiry: expiryDateInput.value,
        //                 cvc: cvcInput.value,
        //                 name: cardNameInput.value
        //             }
        //         })
        //     });
        //     const result = await response.json();
        //     if (response.ok) {
        //         showMessage(paymentSuccessDiv, "Payment successful! Redirecting to confirmation page.", 'success');
        //         setTimeout(() => {
        //             window.location.href = 'order-success.html'; // Redirect to success page
        //         }, 1500);
        //     } else {
        //         showMessage(paymentErrorDiv, result.message || "Payment failed. Please try again.");
        //     }
        // } catch (error) {
        //     console.error("Payment API Error:", error);
        //     showMessage(paymentErrorDiv, "An error occurred during payment. Please try again.");
        // }

        // Frontend-only simulation:
        setTimeout(() => {
            showMessage(paymentSuccessDiv, "Payment simulated successfully! Redirecting to confirmation page.", 'success');
            // Clear the simulated cart (if using localStorage, etc.)
            // localStorage.removeItem('cart');
            setTimeout(() => {
                window.location.href = 'order-success.html'; // Redirect to the next page
            }, 1500);
        }, 2000); // Simulate 2-second processing time
    });

    // Initial render of the order summary when the page loads
    renderOrderSummary();
    console.log("Checkout page loaded. Order summary and payment form are active.");
});