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
    try {
        const client = await connectToDatabase(process.env.MONGO_URI);
        const database = client.db('vijayshift');  // Your database name
        const collection = database.collection('messages');  // Your collection name

        const messages = await collection.find().toArray();

        return {
            statusCode: 200,
            body: JSON.stringify(messages)
        };
    } catch (error) {
        console.error('Error retrieving messages:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: 'Error retrieving messages' })
        };
    }
};
