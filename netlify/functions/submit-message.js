const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'messages.json');

exports.handler = async function(event, context) {
    const { date, time, message } = JSON.parse(event.body);

    // Read the existing messages from the file
    let messages = [];
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        messages = JSON.parse(data);
    } catch (error) {
        console.error('Error reading messages file:', error);
    }

    // Add the new message to the array
    messages.push({ date, time, message });

    // Write the updated messages array back to the file
    try {
        fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
    } catch (error) {
        console.error('Error writing messages file:', error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
    };
};
