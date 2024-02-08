const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

const handler = async (event) => {
    try {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const date = String(now.getDate()).padStart(2, "0");
        const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
        const collection = database.collection("ladders");
        const result = await collection.findOne({
            date: `${year}-${month}-${date}`
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