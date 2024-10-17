const { MongoClient } = require('mongodb');

let cachedClient = null;  // Cache for MongoDB client

async function connectToDatabase(uri) {
    if (cachedClient) {
        return cachedClient;
    }

    const client = new MongoClient(uri);
    await client.connect();
    cachedClient = client;  // Cache the client for future reuse
    return client;
}

exports.handler = async function(event, context) {
    const { date, time, message } = JSON.parse(event.body);

    if (!date || !time || !message) {
        return {
            statusCode: 400,
            body: JSON.stringify({ success: false, error: 'Missing required fields' })
        };
    }

    try {
        const client = await connectToDatabase(process.env.MONGO_URI);
        const database = client.db('vijayshift');  // Your database name
        const collection = database.collection('messages');  // Your collection name

        const newMessage = { date, time, message };
        await collection.insertOne(newMessage);

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        console.error('Error inserting message:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: 'Error inserting message' })
        };
    }
};
