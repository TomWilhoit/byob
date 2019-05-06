const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("port", process.env.PORT || 3000);
    // this sets the port to either the process environment(in this case heroku), or local host 3000
app.locals.title = "Erupt";
    // this sets the local title
app.use(
  bodyParser.urlencoded({
    // tells the server to use bodyParser
    extended: true
  })
);

app.get("/api/v1/volcanoes", (request, response) => {
    // this specifies the the path
  database("volcano")
    // this specifies the referenced database
    .select()
    // this selects that database
    .then(volcano => {
      response.status(200).json(volcano);
    // this returns the status of 200 and the json volcano data
    })
    .catch(error => {
    // this catches any errors
      response.status(500).json({ error });
    // this returns a status of 500 and the json error
    });
});

app.get("/api/v1/volcanoes/:id", (req, res) => {
    // this specifies the the path with ID being dynamic
  database("volcano")
    // this specifies the referenced database
    .where("id", req.params.id)
    // this specifies that the dynamic "id" is the req.params.id
    .select()
    // this selects the database
    .then(volcano => {
      res.status(200).json(volcano);
    // this returns the status of 200 and the individual json volcano data
      if (volcano.length) {
    // if specified volcano exists;
        res.status(200).json(volcano);
    // return a status of 200 and the individual json volcano data
      } else {
    // if specified volcano does not exist;
        res.status(404).json({
          error: `Could not find specified volcano.`
        });
    // return a status of 404 and a unique error message
      }
    })
    .catch(error => {
    // this catches any errors
      res.status(500).json({ error });
    // this returns a status of 500 and the json error
    });
});

app.get("/api/v1/eruptions", (request, response) => {
    // this specifies the the path
  database("eruption")
    // this specifies the referenced database
    .select()
    // this selects that database
    .then(eruption => {
      response.status(200).json(eruption);
    // this returns the status of 200 and the individual json eruptions data
    })
    .catch(error => {
    // this catches any errors
      response.status(500).json({ error });
    // this returns a status of 500 and the json error
    });
});

app.get("/api/v1/eruptions/:id", (req, res) => {
    // this specifies the the path with ID being dynamic
  database("eruption")
    // this specifies the referenced database
    .where("id", req.params.id)
    // this specifies that the dynamic "id" is the req.params.id
    .select()
    // this selects the database
    .then(eruption => {
      res.status(200).json(eruption);
    // this returns the status of 200 and the individual json eruption data
      if (eruption.length) {
    // if eruption exists:
        res.status(200).json(eruption);
    // this returns the status of 200 and the individual json eruption data
    } else {
    // if specified eruption does not exist;
        res.status(404).json({
          error: `Could not find specified eruption.`
        });
      }
    // return a status of 404 and a unique error message
    })
    .catch(error => {
    // this catches any errors
      res.status(500).json({ error });
    });
    // this returns a status of 500 and the json error
});

app.post("/api/v1/volcanoes", (req, res) => {
    // this specifies the the path
  const volcano = req.body;
    // this assigns a variable to the request body
  const errorMsg = "When adding, please ensure to include a name!";
    // this assigns a variable to a custom error message string
  if (!volcano.name) {
    // if request body does not have a key of name:
    return res.status(422).send(errorMsg);
    // return the status of 422 and send the custom error message
  }
  database("volcano")
    // this specifies the referenced database
    .insert(volcano, "id")
    // this inserts the volcano variable into the table
    .then(volcanoes => {
      res.status(201).json({ id: volcanoes[0] });
    // this gives us an "ok" status as well as the id of the new volcano entry
    })
    .catch(error => {
    // this catches any errors
      res.status(500).json({ error });
    });
    // this returns a status of 500 and the json error
});

app.post("/api/v1/eruptions", (req, res) => {
    // this specifies the the path
  const eruption = req.body;
    // this assigns a variable to the request body
  const errorMsg = "When adding, please ensure to include a death toll!";
    // this assigns a variable to a custom error message string
  if (!eruption.deathToll) {
    // if request body does not have a key of deathToll:
    return res.status(422).send(errorMsg);
    // return the status of 422 and send the custom error message
  }
  database("eruption")
    // this specifies the referenced database
    .insert(eruption, "id")
    // this inserts the eruption variable into the table
    .then(eruptions => {
      res.status(201).json({ id: eruptions[0] });
    // this gives us an "ok" status as well as the id of the new volcano entry
    })
    .catch(error => {
    // this catches any errors
      res.status(500).json({ error });
    // this returns a status of 500 and the json error
    });
});

app.delete("/api/v1/volcanoes/:id", (req, res) => {
    // this specifies the the path with ID being dynamic
  database("volcano")
    // this specifies the referenced database
    .where("id", req.params.id)
    // this specifies that the dynamic "id" is the req.params.id
    .del()
    // this deletes the entry matching the id
    .then(volcano => {
      if (volcano) {
    // if volcano exists;
        res.status(204).send("Volcano was deleted.");
    // this returns a status of 204 and sends the custom message
      } else {
    // if volcano does not exist;
        res.status(401).send("Volcano not found :( ");
    // this returns the status of 401 and sends the custom message
      }
    })

    .catch(error => {
    // this catches any errors
      res.status(500).json({ error: "Volcano not found" });
    // this returns a status of 500 and the json error
    });
});

app.listen(process.env.PORT || 3000, function() {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
