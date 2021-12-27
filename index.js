const express = require('express')
const app = express()
var cors = require('cors')
const { MongoClient, ObjectId } = require('mongodb');
// import { MongoClient } from "mongodb";
const port = process.env.PORT || 3000 ;
app.use(cors())
app.use(express.json())
// tourServices
// Zg2pWkjHS6Nnnamu
const uri = "mongodb+srv://dashboard:YIveooZVYINA6Q4N@cluster0.t8s5g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("dashboard");
      const serviceCollection = database.collection("serives");
    //   Get Api
      app.get('/services',async (req,res) =>{
          const cursor = serviceCollection.find({});
          const services = await cursor.toArray();
          res.send(services);
      })
      //Single API
      app.get('/services/:id' , async(req,res) =>{
        const id = req.params.id
        const quary ={_id:ObjectId(id)};
        const user =await serviceCollection.findOne(quary);
        res.send(user);
      })


    //   Post API
     app.post('/services', async(req,res) =>{
         const netUser =req.body;
         const result =await serviceCollection.insertOne(netUser);
         console.log('getnew user', res.body)
         console.log('add user',result)
         res.json(result)
     })
   
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})