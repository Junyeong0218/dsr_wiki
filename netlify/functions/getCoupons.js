const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

const handler = async (event) => {
    try {
        const now = new Date();
        const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
        const collection = database.collection("coupons");
        const results = await collection.aggregate([
            { "$addFields": {
                "start": { "$dateFromString": { "dateString": "$startDate"} },
                "exp": { "$dateFromString": { "dateString": "$expDate"} }
            }},
            { "$match": { 
                "start": { "$lte": now },
                "exp": { "$gte": now }
            }}
        ]).toArray();

        const list = [];
        results.forEach(result => {
            list.push({
                name: result.name,
                code: result.code,
                startDate: result.startDate,
                expDate: result.expDate
            });
        });

        return {
            statusCode: 200,
            body: JSON.stringify(list),
        }
    } catch (error) {
        console.log(error)
        return { statusCode: 500, body: error.toString() }
    } finally {
        (await clientPromise).close();
    }
}

module.exports = { handler }