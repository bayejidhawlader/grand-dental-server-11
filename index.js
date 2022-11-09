// 01 basic setup
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// 02 Middleware
app.use(cors());
app.use(express.json());

// 06
// DB_USER=lawyerDbUser
// DB_PSAAWORD=IbYPQj3AHB3fJMXs

// 05 Database Connect > Connect your Application
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSAAWORD}@cluster0.athiem3.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// 07 Async Function
async function run() {
  try {
    const serviceCollection = client.db("lawyerWebsite").collection("services");

    //07 Data load from Mongodb service to Client Side
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
  } finally {
  }
}
run().catch((error) => console.error(error));

// 03 http://localhost:5000/  // server side access
app.get("/", (req, res) => {
  res.send("Lawyer server is running");
});

// 04 ema john running on : 5000 port on commend line
app.listen(port, () => {
  console.log(`Lawyer running on : ${port}`);
});
