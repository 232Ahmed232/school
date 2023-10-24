const express = require('express');
const ejs = require('ejs');
const app = express();

const mydb = require("./data")

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.static("public"))

// Define a route to render your EJS template
app.get('/', (req, res) => {
  // Render the EJS template with data
  res.render('home.ejs');
});



app.get('/req', (req, res) => {
  // Render the EJS template with data
  res.render('req.ejs', { name: "Ahmed", loc: "Havelian" });
});



app.get('/rid', (req, res) => {
  mydb.db.find().then((fit) => {
    var riders = fit.map((item) => item.toObject());
    res.render("riders.ejs", { rid: riders })

  })
});

app.get("/rid/:rider", (req, res) => {
  var che = req.params.rider;
  // var y = req.params.year;
  mydb.db.find({name:che}).then((fit) => {
      var riders = fit.map((item) => item.toObject());
      res.render("ridertemp.ejs", { rid:riders })

  })
})

app.listen(3000, () => {
  console.log("Server is Running");
})