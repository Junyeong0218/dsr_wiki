const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const handler = async (event) => {
    const clientPromise = await mongoClient.connect();
    
    try {
        const database = clientPromise.db(process.env.MONGODB_DATABASE);
        const collection = database.collection("tamerEquipmentLogs");
        const result = await collection.find().toArray();

        return {
            statusCode: 200,
            body: JSON.stringify(result),
        }
    } catch (error) {
        console.log(error)
        return { statusCode: 500, body: error.toString() }
    } finally {
        clientPromise.close();
    }
}

module.exports = { handler }