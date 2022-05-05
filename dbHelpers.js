const knex = require('knex');
const config = require('./knexfile');
const db = knex(config.development);

function getUsers() {
    return db('users')
}

function getUserByUsername(username) {
    return db('users').where({username:username}).first()
}

async function register(user) {
    await db('users').insert(user)
    return db('users').where({username:user.username})
}

function deleteAccount(id) {
    return db('users').where({id:id}).del()
}

module.exports = {
    getUsers,
    getUserByUsername,
    register,
    deleteAccount
}