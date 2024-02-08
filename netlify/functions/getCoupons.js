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
        const collection = database.collection("coupons");
        const results = collection.aggregate([
            { "$addFields": {
                "start": { "$dateFromString": { "dateString": "$startDate"} },
                "exp": { "$dateFromString": { "dateString": "$expDate"} }
            }},
            { "$match": { 
                "start": { "$lte": now },
                "exp": { "$gte": now }
            }}
        ]);

        const list = [];
        while(await results.hasNext()) {
            const next = await results.next();
            if(next) {
                list.push({
                    name: next.name,
                    code: next.code,
                    startDate: next.startDate,
                    expDate: next.expDate
                });
            }
        }

        await (await clientPromise).close();

        return {
            statusCode: 200,
            body: JSON.stringify(list),
        }
    } catch (error) {
        console.log(error)
        return { statusCode: 500, body: error.toString() }
    }
}

module.exports = { handler }