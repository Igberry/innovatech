// Contact Form Validation and Submission
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const responseMessage = document.createElement("div");
    contactForm.appendChild(responseMessage);

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        responseMessage.textContent = "Sending...";
        responseMessage.style.color = "blue";

        try {
            const res = await fetch("https://innovatech-9v5y.onrender.com/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await res.json();

            if (res.ok) {
                responseMessage.textContent = data.message || "Message sent successfully!";
                responseMessage.style.color = "green";
                contactForm.reset();
            } else {
                responseMessage.textContent = data.message || "Something went wrong.";
                responseMessage.style.color = "red";
            }
        } catch (err) {
            console.error("Fetch error:", err);
            responseMessage.textContent = "Failed to send. Please try again later.";
            responseMessage.style.color = "red";
        }
    });
});

const form = document.getElementById('bookingForm');
const messageDiv = document.getElementById('form-message');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // stop form from refreshing page

    // Show "Sending..." message immediately
    messageDiv.style.color = '#333';  // neutral color
    messageDiv.textContent = 'Sending...';

    // Gather form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        // Send POST request to backend API
        const response = await fetch('https://innovatech-9v5y.onrender.com/api/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            messageDiv.style.color = 'green';
            messageDiv.textContent = result.message || 'Booking submitted successfully!';
            form.reset();
        } else {
            messageDiv.style.color = 'red';
            messageDiv.textContent = result.error || 'Something went wrong, please try again.';
        }
    } catch (error) {
        messageDiv.style.color = 'red';
        messageDiv.textContent = 'Network error, please try again later.';
    }
});
