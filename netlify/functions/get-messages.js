const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;  // Use the environment variable for MongoDB URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

exports.handler = async function(event, context) {
    try {
        await client.connect();
        const database = client.db('vijayshift');  // Name of your MongoDB database
        const collection = database.collection('messages');  // Collection to retrieve messages

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
    } finally {
        await client.close();
    }
};
