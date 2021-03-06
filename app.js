const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { urlencoded } = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
// app.use(config.apiKey);

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/html/signup.html");
});

app.post("/", function(req, res) {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    var data = {
        members: [
            {
              email_address: email,
              status: "subscribed",
              merge_fields: {
                FNAME: firstName,
                LNAME: lastName
              }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://usX.api.mailchimp.com/3.0/lists/*insert your list ID here";
    
    const options = {
      method: "POST",
      auth: "Name1:*insert your API key here*"
    }
    
    const request = https.request(url, options, function(response) {
      response.on("data", function(data) {
        console.log(JSON.parse(data));
    });
    
    });
    
    request.write(jsonData);
    request.end();
})

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});