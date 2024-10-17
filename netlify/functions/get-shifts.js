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
    const userId = event.queryStringParameters.userId;  // Get userId from query parameters

    if (!userId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ success: false, error: 'Missing user ID' })
        };
    }

    try {
        const client = await connectToDatabase(process.env.MONGO_URI);
        const database = client.db('shiftmanager');  // Your database name
        const collection = database.collection('shifts');  // Your collection name

        // Find shifts that belong to this specific user
        const shifts = await collection.find({ userId }).toArray();

        return {
            statusCode: 200,
            body: JSON.stringify(shifts)
        };
    } catch (error) {
        console.error('Error retrieving shifts:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: 'Error retrieving shifts' })
        };
    }
};
