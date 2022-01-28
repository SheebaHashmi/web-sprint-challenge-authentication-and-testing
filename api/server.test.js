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
  test('returns a new user with status 201',async () => {
    const res = await request(server)
    .post('/api/auth/register')
    .send({username:'foo',password:'bar'})

    expect(res.status).toBe(201)
    expect(res.body).toMatchObject({username: "foo"})
  })
  test('returns error message on Invalid username', async()=> {
    const res = await request(server)
    .post('/api/auth/register')
    .send({username:'foo',password:'bar'})

    expect(res.status).toBe(400)
    expect(res.body.message).toBe("username taken")
  })
})

describe('POST /login',() => {
 
  test('Succeful login',async() => {
    const res = await request(server).post('/api/auth/login')
    .send({username:'foo',password:"bar"})

    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({message:"welcome, foo"})
  })

  test("returns error on Invalid credientials",async ()=> {
    const res = await request(server).post('/api/auth/login')
    .send({username:'fiz',password:"bar"})

    expect(res.status).toBe(401)
    expect(res.body.message).toBe("invalid credentials")
  })
})

describe('GET restricted /jokes', () => {
  test('Unauthorized access',async () => {
    const res = await request(server)
    .get('/api/jokes')
    
    expect(res.status).toBe(401)
  })
})