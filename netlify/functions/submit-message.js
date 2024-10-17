const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;  // Use the environment variable for MongoDB URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

exports.handler = async function(event, context) {
    const { date, time, message } = JSON.parse(event.body);

    try {
        await client.connect();
        const database = client.db('vijayshift');  // Name of your MongoDB database
        const collection = database.collection('messages');  // Collection to store messages

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
    } finally {
        await client.close();
    }
};
