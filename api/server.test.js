// Write your tests here
const request = require('supertest')
const server = require('./server')
const db = require('.././data/dbConfig')

test('sanity', () => {
  expect(true).not.toBe(false)
})
beforeAll(async() => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll(async()=>{
  await db.destroy()
})

describe('POST /register',() => {
  test('returns a new user with status 200',async () => {
    const res = await request(server)
    .post('/api/auth/register')
    .send({username:'foo',password:'bar'})

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty("username","foo")
    expect(res.body).toHaveProperty("password","bar")
  })
})

describe('POST /login',() => {
  test('Succeful login',async() => {
    const res = await request(server)
    .post('/api/auth/register')
    .send({username:'foo',password:'bar'})

    request(server).post('/api/auth/login')
    .send({username:'foo',password:'bar'})

    expect(res.body.message).toBe("welcome, foo")
  })
})

describe('GET restricted /jokes', () => {
  test('Unauthorized access',async () => {
    const res = await request(server)
    .get('/api/jokes')
    
    expect(res.status).toBe(403)
  })
})