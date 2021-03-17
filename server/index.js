const bodyParser = require("body-parser");
const express = require("express");
const users = require("./routers/users");

const app = express();

const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};
app.use(bodyParser.json());
app.use(logging);
app.use("/users", users);


app
.route("/")
.get((request, response) => {
  response.status(200).send("HELLO WORLD");
})
.post((request, response) => {
  response.json(request.body);
});
app.route("/posts/:id").get((request, response) => {
  // express adds a "params" Object to requests
  const id = request.params.id;
  // handle GET request for post with an id of "id"

response.send(JSON.stringify({id}));
});

app.listen(4040, () => console.log("Listening on port 4040"));
