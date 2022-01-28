
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

test('sanity', () => {
  expect(true).toBe(true)
})

// auth/register test1
// auth/register test2

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

describe('POST /auth/register', () => {
  test('returns a username on Success', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({'username':'Bloom','password':'Tech'})
    expect(res.body.username).toEqual('Bloom')
  })
  test('register double returns status 400', async () => {
    await request(server)
      .post('/api/auth/register')
      .send({'username':'Bloom','password':'Tech'})
    const res = await request(server)
      .post('/api/auth/register')
      .send({'username':'Bloom','password':'Lorem Ipsum'})
    expect(res.status).toBe(400)
  })
})



// auth/login test1
// auth/login test2
describe('POST /auth/login', () => {
  

  test('returns a status 200 OK', async () => {
    await request(server)
      .post('/api/auth/register')
      .send({'username':'Bloom','password':'Tech'})
    const res = await request(server)
      .post('/api/auth/login')
      .send({'username':'Bloom','password':'Tech'})
      expect(res.status).toBe(200)
  })

  test('wrong password returns status 401', async () => {
    await request(server)
      .post('/api/auth/register')
      .send({'username':'Bloom','password':'Tech'})
    const res = await request(server)
      .post('/api/auth/login')
      .send({'username':'Bloom','password':'Lorem Ipsum'})
    expect(res.status).toBe(401)
  })

})
//jokes.get test1
//jokes.get test2
describe('GET /jokes', () => {
  
  test('returns a status 401 Error without login step', async () => {
    const res = await request(server)
      .get('/api/jokes')
    expect(res.status).toBe(401)
  })

  test('returns a status 200 when authorized', async () => {
    await request(server)
      .post('/api/auth/register')
      .send({'username':'Bloom','password':'Tech'})
    const loginRes = await request(server)
      .post('/api/auth/login')
      .send({'username':'Bloom','password':'Tech'})
    const token = loginRes.body.token
    const res = await request(server)
      .get('/api/jokes')
      .set({ 'Authorization': token })
    expect(res.status).toBe(200)
  })
})