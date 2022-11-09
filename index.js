const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;
const app = express();
require('dotenv').config();

// middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bw7fh0s.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const blogQuestionCollection = client.db('serviceReviewDB').collection('blogQuestion');
        const foodCollection = client.db('serviceReviewDB').collection('foodHome');
        const reviewCollection = client.db('serviceReviewDB').collection('reviews');

        // blog question get operation
        app.get('/blog', async (req, res) => {
            const query = {};
            const cursor = blogQuestionCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get("/food-home", async (req, res) => {
            const query = {};
            const cursor = foodCollection.find(query);
            const result = await cursor.limit(3).toArray();
            res.send(result);
        });

        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = foodCollection.find(query);
            const result = await cursor.toArray();
            res.send(result); 
        })

        app.get("/services/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const getSingleProduct = await foodCollection.findOne(query);
            res.send(getSingleProduct);
        });

        app.post("/reviews", async (req, res) => { 
            const reviews = req.body;
            const result = await reviewCollection.insertOne(reviews);
            res.send(result)
        })
    }
    finally {
        
    }
}
run().catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('Service Review Server is running');
});

app.listen(port, () => {
    console.log(`service review server listening on port ${port}`);
})