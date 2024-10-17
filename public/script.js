// Handle form submission
document.getElementById('messageForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        message: document.getElementById('message').value
    };

    // Send message data to the Netlify Function (submit-message)
    const response = await fetch('/.netlify/functions/submit-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });

    const result = await response.json();
    console.log('Submit response:', result);

    if (result.success) {
        loadMessages();  // Reload messages if submission was successful
    } else {
        alert('Failed to submit the message');
    }
});

// Load messages from the Netlify Function (get-messages)
async function loadMessages() {
    const response = await fetch('/.netlify/functions/get-messages');
    const messages = await response.json();
    console.log('Fetched messages:', messages);

    const messageList = document.getElementById('messageList');
    messageList.innerHTML = '';

    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `${msg.date} ${msg.time} - ${msg.message}`;
        messageList.appendChild(messageDiv);
    });
}

// Load messages when the page loads
loadMessages();
