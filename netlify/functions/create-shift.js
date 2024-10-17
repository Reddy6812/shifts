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
    const { userId, name, shiftDate, startTime, endTime, crew, note } = JSON.parse(event.body);

    if (!userId || !name || !shiftDate || !startTime || !endTime || !crew || !note) {
        return {
            statusCode: 400,
            body: JSON.stringify({ success: false, error: 'Missing required fields' })
        };
    }

    try {
        const client = await connectToDatabase(process.env.MONGO_URI);
        const database = client.db('shiftmanager');  // Your database name
        const collection = database.collection('shifts');  // Your collection name

        const newShift = { userId, name, shiftDate, startTime, endTime, crew, note };
        await collection.insertOne(newShift);

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        console.error('Error creating shift:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: 'Error creating shift' })
        };
    }
};
