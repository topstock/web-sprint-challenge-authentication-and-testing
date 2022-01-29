
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

test('sanity', () => {
  expect(true).toBe(true)
})


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
      .send({'username':'Bloom1','password':'Tech1'})
    expect(res.body.username).toEqual('Bloom1')
  })
  test('register double returns status 400', async () => {
    await request(server)
      .post('/api/auth/register')
      .send({'username':'Bloom2','password':'Tech2'})
    const res = await request(server)
      .post('/api/auth/register')
      .send({'username':'Bloom2','password':'Tech2'})
    expect(res.status).toBe(400)
  })
})


describe('POST /auth/login', () => {
  

  test('returns a status 200 OK', async () => {
    const res1 = await request(server)
      .post('/api/auth/register')
      .send({'username':'Bloom3','password':'Lorem3'})
    const res2 = await request(server)
      .post('/api/auth/login')
      .send({'username':'Bloom3','password':'Lorem3'})
    expect(res2.status).toBe(200)
  })

  test('wrong password returns status 401', async () => {
    await request(server)
      .post('/api/auth/register')
      .send({'username':'Bloom4','password':'Tech4'})
    const res = await request(server)
      .post('/api/auth/login')
      .send({'username':'Bloom4','password':'loremIpsum'})
    expect(res.status).toBe(401)
  })

})