const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var hsts = require('hsts');
const path = require('path');
var xssFilter = require('x-xss-protection');
var nosniff = require('dont-sniff-mimetype');
const request = require('request');

const app = express();

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(xssFilter());
app.use(nosniff());
app.set('etag', false);
app.use(
  helmet({
    noCache: true
  })
);
app.use(
  hsts({
    maxAge: 15552000 // 180 days in seconds
  })
);

app.use(
  express.static(path.join(__dirname, 'dist/softrams-racing'), {
    etag: false
  })
);



/**
 * @api {get} /api/members Request for members information
 * @returns {array} members
 */
app.get('/api/members', (req, res) => {
  return requestHandler(res, 'GET', 'http://localhost:3000/members/');
});



/**
 * @api {get} /api/members Request for members information
 *
 * @urlparam {number} id id of member.
 * 
 * @returns {object} member
 */
app.get('/api/members', (req, res) => {
  return requestHandler(res, 'GET', 'http://localhost:3000/members/');
});



/**
 * @api {post} /api/members Request for add member in db.json
 * 
 * @param {string} firstName firstname of member.
 * @param {string} lastName lastname of member.
 * @param {string} jobTitle jobtitle of member.
 * @param {string} team team of member.
 * @param {string} status status of member.
 * 
 * @returns {object} member
 */
app.post('/api/members', (req, res) => {
  return requestHandler(res, 'POST', 'http://localhost:3000/members/', req.body);
});



/**
 * @api {put} /api/members/:id Request for edit member in db.json
 * 
 * @urlparam {number} id id of member.
 * 
 * @param {string} firstName firstname of member.
 * @param {string} lastName lastname of member.
 * @param {string} jobTitle jobtitle of member.
 * @param {string} team team of member.
 * @param {string} status status of member.
 * 
 * @returns {object} member
 */
app.put('/api/members/:id', (req, res) => {
  return requestHandler(res, 'PUT', 'http://localhost:3000/members/' + req.params.id, req.body);
});



/**
 * @api {delete} /api/members/:id Request for delete member in db.json
 * 
 * @urlparam {number} id id of member.
 * 
 * @returns {boolean} success
 */
app.delete('/api/members/:id', (req, res) => {
  return requestHandler(res, 'DELETE', 'http://localhost:3000/members/' + req.params.id);
});



// TODO: Dropdown!
/**
 * @api {get} /api/teams Request for teams information
 * @returns {array} teams
 */
app.get('/api/teams', (req, res) => {
  return requestHandler(res, 'GET', 'http://localhost:3000/teams/');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/softrams-racing/index.html'));
});

app.listen('8000', () => {
  console.log('Vrrrum Vrrrum! Server starting!');
});



/**
 * @function reusable function for request handle
 * 
 * @param {func} res response handler
 * @param {string=['GET', 'POST', 'PUT', "DELETE"]} method method
 * @param {string} url url to make request.
 * @param {object} data body data for post and put.
 * 
 * @returns {object} member
 */
function requestHandler(res, method, url, data = undefined) {
  try {
    request({
      method: method,
      uri: url,
      body: data,
      json: true
    }, function (error, response, body) {
      if (error) {
        res.status(500).send({ message: error.message });
        return;
      }
      res.send(body);
      return;
    })
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}