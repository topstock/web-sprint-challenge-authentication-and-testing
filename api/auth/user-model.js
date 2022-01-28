const db = require('../../data/dbConfig')

function find () {
  return db('users')
    .select('id','username','password')
}
function findBy(filter) {
  return db('users').where(filter)
}
function findById(id) {
    return db('users')
    .where('id', id)
  }

async function add(user) { 
  const newIds = await db('users')
    .insert(user)
  return findById(newIds[0]).first()
}

module.exports = {
    find,
    findBy,
    findById,
    add
}