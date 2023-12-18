const express = require('express');
const app = express();
let ClientJson = require('./ClientJson.json');


// Important so that you can receive Json in the request body with express
app.use(express.json());

// All Users
app.get('/client', function (req, res) {

  res.json(ClientJson);
});

// Specific user
app.get('/client/:id', function (req, res) {

  const {id} = req.params; // OR const id = req.params.id  
  const clientResult = ClientJson.find((client)=> client.id == id);

  if(!clientResult){

    return res.json({
      success: false,
      error: "Client not found",
    });
  }

  res.json(clientResult);
});

// New User
// temporary data for testing
app.post('/client', function (req, res) {

    const {name} = req.body; // OR const name = rq.body.name
    let newclient = {
      id: ClientJson.length + 1,
      name: name
        
    };
    
    ClientJson.push(newclient);

    res.json(newclient);
});

app.listen(3001)
console.log("Running");