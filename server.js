
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const app = express();


app.set('port', process.env.PORT || 3000);
app.locals.title = 'Erupt';

app.get('/api/v1/volcanoes', (request, response) => {
  database('volcano').select()
    .then((volcano) => {
      response.status(200).json(volcano);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/volcanoes/:id', (req, res) => {
  database('volcano').where('id', req.params.id).select()
    .then(volcano => {
      res.status(200).json(volcano)
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

app.get('/api/v1/eruptions', (request, response) => {
  database('eruption').select()
    .then((eruption) => {
      response.status(200).json(eruption);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/eruptions/:id', (req, res) => {
  database('eruption').where('id', req.params.id).select()
    .then(eruption => {
      res.status(200).json(eruption)
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


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
