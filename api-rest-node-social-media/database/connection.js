const { MongoClient } = require('mongodb');
const mongoose = require("mongoose")

//const url = 'mongodb://localhost:27017/local';
const uri = "mongodb://127.0.0.1:27017/social_media?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0"
//Create a new MongoClient
const client = new MongoClient(uri)

const connection = async () => {

  try {

    await mongoose.connect(uri)
    console.log("Connected successfully to server");

  }
  catch (error) {
    console.error(error)
    throw new Error("Don't connect database")

  }

}


async function connectToDataBaseMongoDb() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Establish and verify connection

    await client.db("videogames").command({ ping: 1 });
    console.log("Connected successfully to server");
    const db = client.db("videogames")
    const collection = db.collection("ps4")
    const documents = await collection.find().toArray()
    console.log(documents);

  }
  finally {
    //Ensures that the client will close when you finish/error
    await client.close();

  }
}

async function readDataBase() {

  try {
    //await client.db("videogames").command({ping:1});
    console.log("Read videogames");


  }
  catch (error) {
    //Ensures that the client will close when you finish/error
    console.error(error)
  }
}


async function connectToDataBase2() {
  try {
    console.log("hereee")
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });

    console.log(`Conectado al puerto correctamente`);
    //const db = client.db(dbName);
    console.log(`Conexión a la base de datos ${dbName} establecida correctamente`);
    return db;
  } catch (error) {
    console.error('Error al conectar con la base de datos', error);
    process.exit(1);
  }
}

module.exports = {
  connection
}

