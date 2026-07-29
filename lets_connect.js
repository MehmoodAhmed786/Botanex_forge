const form = document.getElementById('contactForm');
const statusMessage = document.getElementById('formStatus');
const submitButton = form?.querySelector('button[type="submit"]');

if (form && statusMessage && submitButton) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        statusMessage.textContent = 'Sending your message...';
        statusMessage.className = 'form-status is-loading';
        submitButton.disabled = true;

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok && (result.success || result.message?.toLowerCase().includes('success'))) {
                form.reset();
                statusMessage.textContent = 'Thanks! Your message has been sent successfully.';
                statusMessage.className = 'form-status success';
            } else {
                throw new Error(result.message || 'Unable to send the message right now.');
            }
        } catch (err) {
            statusMessage.textContent = `Sorry, we could not send your message. ${err.message}`;
            statusMessage.className = 'form-status error';
        } finally {
            submitButton.disabled = false;
        }
    });
}
