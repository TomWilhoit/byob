const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("port", process.env.PORT || 3000);
app.locals.title = "Erupt";

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/api/v1/volcanoes", (request, response) => {
  database("volcano")
    .select()
    .then(volcano => {
      response.status(200).json(volcano);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get("/api/v1/volcanoes/:id", (req, res) => {
  database("volcano")
    .where("id", req.params.id)
    .select()
    .then(volcano => {
      res.status(200).json(volcano);
      if (volcano.length) {
        res.status(200).json(volcano);
      } else {
        res.status(404).json({
          error: `Could not find specified volcano.`
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.get("/api/v1/eruptions", (request, response) => {
  database("eruption")
    .select()
    .then(eruption => {
      response.status(200).json(eruption);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get("/api/v1/eruptions/:id", (req, res) => {
  database("eruption")
    .where("id", req.params.id)
    .select()
    .then(eruption => {
      res.status(200).json(eruption);
      if (eruption.length) {
        res.status(200).json(eruption);
      } else {
        res.status(404).json({
          error: `Could not find specified eruption.`
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.post("/api/v1/volcanoes", (req, res) => {
  const volcano = req.body;
  const errorMsg = "When adding, please ensure to include a name!";
  if (!volcano.name) {
    return res.status(422).send(errorMsg);
  }
  database("volcano")
    .insert(volcano, "id")
    .then(volcanoes => {
      res.status(201).json({ id: volcanoes[0] });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.post("/api/v1/eruptions", (req, res) => {
  const eruption = req.body;
  const errorMsg = "When adding, please ensure to include a death toll!";
  if (!eruption.deathToll) {
    return res.status(422).send(errorMsg);
  }
  database("eruption")
    .insert(eruption, "id")
    .then(eruptions => {
      res.status(201).json({ id: eruptions[0] });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.delete("/api/v1/volcanoes/:id", (req, res) => {
  database("volcano")
    .where("id", req.params.id)
    .del()
    .then(volcano => {
      console.log(volcano);
      if (volcano) {
        res.status(200).send("Volcano was deleted.");
      } else {
        res.status(401).send("Volcano not found :( ");
      }
    })

    .catch(error => {
      res.status(500).json({ error: "Volcano not found" });
    });
});

app.listen(process.env.PORT || 3000, function() {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
