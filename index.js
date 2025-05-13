const express = require("express");
const res = require("express/lib/response");
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://projectuser:<db_password>3@cluster0.pioxtf6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}
run().catch(console.dir);

const add = (n1, n2) => {
  return n1 + n2;
};

const subtract = (n1, n2) => {
  return n1 - n2;
};

const multiply = (n1, n2) => {
  return n1 * n2;
};

const divide = (n1, n2) => {
  return n1 / n2;
};

const exponentiate = (n1, n2) => {
  return n1 ** n2;
};

const square = (n1, n2) => {
  return Math.sqrt(n1 * n2 + n1 * n2);
};

const modulo = (n1, n2) => {
  return n1 % n2;
};

const insertCalculation = async (operation, n1, n2, result) => {
  const collection = client.db("calculator").collection("calculations");
  const calculation = {
    operation: operation,
    n1: n1,
    n2: n2,
    result: result,
    timestamp: new Date(),
  };
  await collection.insertOne(calculation);
};

app.get("/add", async (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) {
      throw new Error("Invalid input");
    }
    const result = add(n1, n2);
    await insertCalculation("add", n1, n2, result);
    res.status(200).json({ statuscode: 200, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

app.get("/subtract", async (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) {
      throw new Error("Invalid input");
    }
    const result = subtract(n1, n2);
    await insertCalculation("subtract", n1, n2, result);
    res.status(200).json({ statuscode: 200, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

app.get("/multiply", async (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) {
      throw new Error("Invalid input");
    }
    const result = multiply(n1, n2);
    await insertCalculation("multiply", n1, n2, result);
    res.status(200).json({ statuscode: 200, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

app.get("/divide", async (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) {
      throw new Error("Invalid input");
    }
    if (n2 === 0) {
      throw new Error("Cannot divide by zero");
    }
    const result = divide(n1, n2);
    await insertCalculation("divide", n1, n2, result);
    res.status(200).json({ statuscode: 200, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

app.get("/exponentiate", async (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) {
      throw new Error("Invalid input");
    }
    const result = exponentiate(n1, n2);
    await insertCalculation("exponentiate", n1, n2, result);
    res.status(200).json({ statuscode: 200, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

app.get("/square", async (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) {
      throw new Error("Invalid input");
    }
    const result = square(n1, n2);
    await insertCalculation("square", n1, n2, result);
    res.status(200).json({ statuscode: 200, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

app.get("/modulo", async (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) {
      throw new Error("Invalid input");
    }
    if (n2 === 0) {
      throw new Error("Cannot perform modulo by zero");
    }
    const result = modulo(n1, n2);
    await insertCalculation("modulo", n1, n2, result);
    res.status(200).json({ statuscode: 200, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

app.get("/deleteResult", async (req, res) => {
    try {
      const n1 = parseFloat(req.query.n1);
      const n2 = parseFloat(req.query.n2);
      const operation = req.query.operation;
  
      if (isNaN(n1) || isNaN(n2) || !operation) {
        throw new Error("Missing or invalid query parameters");
      }
  
      const collection = client.db("calculator").collection("calculations");
  
      const result = await collection.deleteOne({ n1, n2, operation });
  
      if (result.deletedCount === 0) {
        res.status(404).json({ message: "No matching document found to delete" });
      } else {
        res.status(200).json({ message: "Document deleted successfully" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.toString() });
    }
});

app.get("/updateResult", async (req, res) => {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    const operation = req.query.operation;
    const newResult = parseFloat(req.query.newResult);
  
    if (isNaN(n1) || isNaN(n2) || isNaN(newResult) || !operation) {
      return res.status(400).json({ statuscode: 400, msg: "Invalid query parameters" });
    }
  
    try {
      const collection = client.db("calculator").collection("calculations");
  
      const filter = { n1: n1, n2: n2, operation: operation };
      const update = { $set: { result: newResult } };
  
      const result = await collection.updateOne(filter, update);
  
      if (result.matchedCount === 0) {
        res.status(404).json({ statuscode: 404, msg: "No matching document found to update" });
      } else {
        res.status(200).json({ statuscode: 200, msg: "Result updated successfully" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
  });
  


const port = 3040;
app.listen(port, () => {
  console.log(`Server is running at localhost:${port}`);
});
