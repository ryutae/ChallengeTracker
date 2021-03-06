const { expect } = require('chai')
const knex = require('knex')
const app = require('../app')
const request = require('supertest')
const helpers = require('./test-helpers')

describe('/challenge endpoint', function() {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db.raw('TRUNCATE challenges, users, groups RESTART IDENTITY CASCADE'))

  afterEach('cleanup',() => db.raw('TRUNCATE challenges, users, groups RESTART IDENTITY CASCADE'))

  context('Given there are challenges in the database', () => {
    const testUsers = [
      {
        id: 1,
        user_name: 'test-user-1',
        full_name: 'Test user 1',
        email: 'test1@test.com',
        password: 'P@ssw0rd',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
      {
        id: 2,
        user_name: 'test-user-2',
        full_name: 'Test user 2',
        email: 'test2@test.com',
        password: 'P@ssw0rd',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
    ]

    const testGroups = [
   {
     id: 1,
     name: 'Group 1',
     description: 'First',
     created_by: 1,
     date_created: '2029-01-22T16:28:32.615Z',
   },
   {
     id: 2,
     name: 'Group 1',
     description: 'Second',
     created_by: 2,
     date_created: '2029-01-22T16:28:32.615Z',
   },
  ];

    const testChallenges = [
   {
     id: 1,
     group_id: 1,
     name: 'Challenge 1',
     description: 'First',
     points: 10,
     date_created: '2029-01-22T16:28:32.615Z',
   },
   {
     id: 2,
     group_id: 1,
     name: 'Challenge 1',
     description: 'Second',
     points: 20,
     date_created: '2029-01-22T16:28:32.615Z',
   },
   {
     id: 3,
     group_id: 1,
     name: 'Challenge 1',
     description: 'Third',
     points: 30,
     date_created: '2029-01-22T16:28:32.615Z',
   },
   {
     id: 4,
     group_id: 1,
     name: 'Challenge 1',
     description: 'Fourth',
     points: 40,
     date_created: '2029-01-22T16:28:32.615Z',
   },
  ];

  beforeEach('insert users', () => {
    return db
     .into('users')
     .insert(testUsers)
     })
  beforeEach('insert groups', () => {
    return db
     .into('groups')
     .insert(testGroups)
     })
  beforeEach('insert challenges', () => {
    return db
     .into('challenges')
     .insert(testChallenges)
     })

  it('GET /api/challenges/all should return status 200', () => {
   return request(app)
     .get('/api/challenges/all')
     .expect(200)
  })
  it('GET /api/challenges/:id should return status 200', () => {
    return request(app)
      .get('/api/challenges/1')
      .expect(200)
  })
  it('DELETE /api/challenges/:id should return status 204', () => {
    return request(app)
      .delete('/api/challenges/1')
      .expect(204)
  })
  it('GET /api/challenges/group/:group_id should return status 200', () => {
    return request(app)
      .get('/api/challenges/group/1')
      .expect(200)
  })
  // it('POST /api/challenges/create should return status 201', () => {
  //   return request(app)
  //     .post('/api/challenges/create')
  //     .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
  //     .send({
  //       group_id: 1,
  //       name: 'new challenge',
  //       description: 'new',
  //       points: 1
  //     })
  //     .expect(201)
  // })


  })
})
