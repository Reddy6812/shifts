// Handle form submission
document.getElementById('messageForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        message: document.getElementById('message').value
    };

    // Send message data to Netlify Function
    await fetch('/.netlify/functions/submit-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });

    // Reload messages after submission
    loadMessages();
});

// Load messages from the Netlify Function
async function loadMessages() {
    const response = await fetch('/.netlify/functions/get-messages');
    const messages = await response.json();

    const messageList = document.getElementById('messageList');
    messageList.innerHTML = '';

    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `${msg.date} ${msg.time} - ${msg.message}`;
        messageList.appendChild(messageDiv);
    });
}

// Initially load messages
loadMessages();
