document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('http://localhost:5000/submit-contact', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'  // Ensure this header is set
            },
            body: JSON.stringify({ name, email, message }),  // Send data as JSON
        });

        const result = await response.json();
        if (result.success) {
            alert('Message sent successfully!');
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (err) {
        alert(`Error: ${err.message}`);
    }
});
