const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const pizzas = require("./routers/pizzas");
const users = require("./routers/users");
const orders = require ("./routers/orders");

const app = express();

// Middleware
const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};
// CORS Middleware
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

app.use(bodyParser.json());
app.use(logging);
app.use(cors);
app.use('/pizzas', pizzas);
app.use('/users', users);
app.use('/orders', orders);

// Database stuff
mongoose.connect("mongodb://localhost/pizza");
const db = mongoose.connection;

let db_status = "MongoDB connection not successful.";

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => (db_status = "Successfully opened connection to Mongo!"));




//Burritos
const burritoSchema = new mongoose.Schema({
  size: String,
  meat: String,
  beans: Boolean,
  heat: String
});
const Burrito = mongoose.model('Burrito', burritoSchema);

app.post('/burritos', (request, response) => {
  const newBurrito = new Burrito(request.body)
  newBurrito.save((err, burrito) => {
    return err ? response.sendStatus(500).json(err) : response.json(burrito);
  });
});
//Burritos^^^
app.route("/").get((request, response) => {
  response.send("HELLO WORLD");
});

app.get("/status", (request, response) => {
  response.send(JSON.stringify({ message: "Service running ok" }));
});

app
  .route("/posts")
  .get((request, response) => {
    // express adds a "params" Object to requests
    const id = request.params.id;
    let data = "The ID equals " + id;
    // handle GET request for post with an id of "id"
    if (request.query) {
      if (request.query.type) {
        if (request.query.type === "json") {
          data = { id: request.params.id, q: request.query };
        }
      }
    }
    response.status(418).json(data);
  })
  .post((request, response) => {
    response.json(request);
  });

const PORT = process.env.PORT || 4040;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
