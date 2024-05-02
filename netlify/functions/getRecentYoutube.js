const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const handler = async (event) => {
    const clientPromise = await mongoClient.connect();
    
    try {
        const database = clientPromise.db(process.env.MONGODB_DATABASE);
        const collection = database.collection("youtubeIds");
        const result = await collection.aggregate([
        {
            $project: {
                date: {
                    $dateFromString: {
                        dateString: '$date'
                    }
                },
                youtubeId: '$youtubeId'
            }
        }, { $sort: { date : -1 } }]).limit(1).tryNext();

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