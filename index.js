const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fs = require('fs');

envConfig = dotenv.parse(fs.readFileSync(__dirname + "/.env"));

for (const k in envConfig) {
	process.env[k] = envConfig[k];
}

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.listen(process.env.PORT, function() {
	console.log("Server running");
});

app.use('/api', require('./routes/api'));
