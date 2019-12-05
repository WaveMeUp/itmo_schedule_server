const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const routes = require('./routes');

app.use(express.json());
app.use(bodyParser.json());
app.use(routes);

app.use((err, req, res, next) => {
    if (err.status < 500) {
        return res
            .status(err.status)
            .json({message: err.message});
    }
    console.error(err);
    let message = 'Internal Server Error', status = 500;
    return res.status(status).send({message});
})
app.listen(8080, "0.0.0.0", (request, response) => {
    console.log("Webserver started.");
});
