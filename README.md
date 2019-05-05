# Build Your Own Backend (byob)
### Summary
Byob is an assignment from Turing School that challenges the student to create a back end server using Node.js, Express, and Knex. 

Original Project: http://frontend.turing.io/projects/build-your-own-backend.html


### Endpoints
**Get all volcanoes:** `GET /api/v1/volcanoes`
- Response Status: 200
- Response Example: 
```
 [
  {
    "id": 105,
    "name": "Mount Doom",
    "stillActive": "true",
    "heightInFeet": "2",
    "location": "Mordor"
  },
  {
    "id": 63,
    "name": "Mount Tambora",
    "stillActive": "true",
    "heightInFeet": "9350",
    "location": "Indonesia"
  },
  {
    "id": 64,
    "name": "Krakatoa",
    "stillActive": "true",
    "heightInFeet": "2667",
    "location": "Indonesia"
  }
 ]
```


**Get all eruptions:** `GET /api/v1/eruptions`
- Response Status: 200
- Response Example: 
```
[
  {
    "id": 39,
    "year": "1815",
    "deathToll": "71000",
    "volcanoID": 63
  },
  {
    "id": 40,
    "year": "1883",
    "deathToll": "36000",
    "volcanoID": 64
  },
  {
    "id": 41,
    "year": "2018",
    "deathToll": "437",
    "volcanoID": 64
  },
  {
    "id": 42,
    "year": "1257",
    "deathToll": "20000",
    "volcanoID": 65
  }
]
```

**Get specific volcano by id:** `GET /api/v1/volcanoes/:id`
- Response Status: 200
- Response Example: 
```
 [
  {
    "id": 64,
    "name": "Krakatoa",
    "stillActive": "true",
    "heightInFeet": "2667",
    "location": "Indonesia"
   }
 ]
```

**Get specific eruption by id:** `GET /api/v1/eruptions/:id`
- Response Status: 200
- Response Example: 
```
 [
  {
    "id": 42,
    "year": "1257",
    "deathToll": "20000",
    "volcanoID": 65
  }
 ]
```

**Post volcano:** `POST /api/v1/volcanoes/`
- Response Status: 201
- Response Example: 
```
  {
    "id": 39
  }
```
- Parameters:

| Name          | Type          |
| ------------- | ------------- |
| `name`        | `string`      |
| `heightInFeet`| `number`      |
| `location`    | `number`      |
| `stillActive` | `boolean`     |


**Post eruption:** `POST /api/v1/eruptions/`
- Response Status: 201
- Response Example: 
```
  {
    "id": 94
  }
```
- Parameters:

| Name          | Type          |
| ------------- | ------------- |
| `year`        | `number`      |
| `deathToll`   | `number`      |
| `volcanoID`   | `number`      |

**Delete volcano:** `DELETE /api/v1/volcanoes/:id`
- Response Status: 204
