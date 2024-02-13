const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const handler = async (event) => {
    const clientPromise = await mongoClient.connect();

    try {
        const enhanceInfo = JSON.parse(event.body);
        console.log(enhanceInfo);
        const database = clientPromise.db(process.env.MONGODB_DATABASE);
        const collection = database.collection("enhanceLog");
        const result = await collection.insertOne({
            grade: enhanceInfo.grade,
            from: enhanceInfo.from,
            to: enhanceInfo.to,
            upItemName: enhanceInfo.upItem === null ? null : enhanceInfo.upItem.name,
            downItemName: enhanceInfo.downItem === null ? null : enhanceInfo.downItem.name,
            result: enhanceInfo.result,
        });

        console.log(result);

        return {
            statusCode: 200,
            body: JSON.stringify({ result: result.acknowledged }),
        }
    } catch (error) {
        console.log(error)
        return { statusCode: 500, body: error.toString() }
    } finally {
        clientPromise.close();
    }
}

module.exports = { handler }