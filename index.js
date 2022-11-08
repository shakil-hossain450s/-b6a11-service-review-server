const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

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
        const serviceReviewCollection = client.db('serviceReviewDB').collection('blogQuestion')

        app.get('/blog', async (req, res) => {
            const query = {};
            const cursor = serviceReviewCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
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