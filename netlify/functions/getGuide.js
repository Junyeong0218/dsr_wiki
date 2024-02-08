const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

const handler = async (event) => {
    try {
        const { id } = event.queryStringParameters;
        const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
        const collection = database.collection("guides");
        const result = await collection.findOne({
            id: Number(id)
        });

        // await (await clientPromise).close();

        return {
            statusCode: 200,
            body: JSON.stringify(result),
        }
    } catch (error) {
        console.log(error)
        return { statusCode: 500, body: error.toString() }
    } finally {
        (await clientPromise).close();
    }
}

module.exports = { handler }