const express = require('express')
const bodyParser = require('body-parser')
const connectDb = require('./config/dbConnection')
const cors = require('cors');
const path = require('path');

connectDb();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({ origin: true }));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
// app.use(express.static("public"));

const PORT = 5000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));






app.use("/api/landlord", require("./routes/landlordRoutes"));
app.use('/api/property', require("./routes/propertyRoutes"));
app.use('/api/request', require("./routes/requestRoutes"));
app.use('/api/tenant', require("./routes/tenantRoutes"));

app.use(express.static(path.join(__dirname,'build')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'build','index.html'));
});



app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})