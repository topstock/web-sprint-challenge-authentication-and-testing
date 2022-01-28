const db = require('../../data/dbConfig')

function find () {
  return db('users')
    .select('user_id','username','password')
}
function findBy(filter) {
  return db('users').where(filter)
}
function findById(user_id) {
    return db('users')
    .select('user_id','username')
    .where('user_id', user_id)
  }

async function add(user) { 
  const newIds = await db('users')
    .insert(user)
  return findById(newIds[0])
}

module.exports {
    find,
    findBy,
    findById,
    add
}