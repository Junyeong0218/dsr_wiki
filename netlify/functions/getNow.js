const { MongoClient } = require("mongodb");
const moment = require("moment");
require('moment/locale/ko');

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ now: new Date().getTime() }),
    }

    // const clientPromise = await mongoClient.connect();

    // try {
        // const now = new Date(new Date().getTime() + 1000 * 60 * 60 * 9);
        // const database = clientPromise.db(process.env.MONGODB_DATABASE);
        // const collection = database.collection("coupons");
        // const results = await collection.aggregate([
        //     { "$addFields": {
        //         "start": { "$dateFromString": { "dateString": "$startDate"} },
        //         "exp": { "$dateFromString": { "dateString": "$expDate"} }
        //     }},
        //     { "$match": { 
        //         "start": { "$lte": now },
        //         "exp": { "$gte": now }
        //     }}
        // ]).toArray();

        // const list = [];
        // results.forEach(result => {
        //     list.push({
        //         name: result.name,
        //         code: result.code,
        //         startDate: moment(result.startDate).locale('ko').format("YYYY-MM-DD(ddd)"),
        //         expDate: moment(result.expDate).locale('ko').format("YYYY-MM-DD(ddd) HH:mm")
        //     });
        // });

        
    // } catch (error) {
    //     console.log(error)
    //     return { statusCode: 500, body: error.toString() }
    // } finally {
    //     clientPromise.close();
    // }
}

module.exports = { handler }