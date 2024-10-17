const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'messages.json');

exports.handler = async function(event, context) {
    let messages = [];
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        messages = JSON.parse(data);
    } catch (error) {
        console.error('Error reading messages file:', error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(messages)
    };
};
