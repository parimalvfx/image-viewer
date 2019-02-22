
const constants = require('./constants');
const express = require('express')
const request = require('request')
const path = require('path')
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
app.get('/owner-info', (req, res) => {
    return request(`${constants.URL_LIST.BASE_URL}${constants.URL_LIST.OWNER_INFO_URL}${constants.ACCESS_TOKEN}`, function(error, response, body) {
        console.log(body)
        return res.send(body)
    });
});
app.get('/owner-media', (req, res) => {
    return request(`${constants.URL_LIST.BASE_URL}${constants.URL_LIST.OWNER_RECENT_MEDIA_URL}${constants.ACCESS_TOKEN}`, function(error, response, body) {
        console.log(body)
        return res.send(body)
    });
});

app.listen(8080, () => console.log('image viewer app listening on port 3000 and server on 8080!'));
