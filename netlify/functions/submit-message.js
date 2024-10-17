let messages = []; // In-memory storage

exports.handler = async function(event, context) {
    const { date, time, message } = JSON.parse(event.body);

    messages.push({ date, time, message });

    return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
    };
};
