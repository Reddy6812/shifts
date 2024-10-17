let messages = []; // In-memory storage

exports.handler = async function(event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify(messages)
    };
};
