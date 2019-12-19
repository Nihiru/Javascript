/* eslint-disable no-undef */
/**
 * Supertest
 * -) it is a library written to test HTTP calls in node.js
 */
console.log("Inside /src/test/api.test.js")
const request = require('supertest');

const app = require('../src/app');
// description of unit testing 
describe('GET /api/v1', () => {
  // use `it` to define several test cases
  it('responds with a json message', function(done) {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏' 
      }, done);
  });
});

describe('POST /api/v1/messages', () => {
  it('responds with a inserted message', function(done) {
    const requestObj = {
      name: 'NKill',
      message: 'This app is so cool',
      latitude: -90,
      longitude: 180
    };
    const responseObj = {
      ...requestObj,
      _id: '5dfa7c3c21696f192a7d2a66',
      date: '2019-12-18T19:21:32.130Z'
    };
    request(app)
      .post('/api/v1/messages')
      .send(requestObj)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(res => {
        res.body._id = '5dfa7c3c21696f192a7d2a66';
        res.body.date = '2019-12-18T19:21:32.130Z';
        // res.body.name =  'NKill';
        // res.body.message = 'This app is so cool';
        // res.body.latitude = -90;
        // res.body.longitude = 180;
      })
      .expect(200, responseObj, done);
  });
  // it('can signup with a name that has diacritics', ()=> {

  // });
});
