exports.up = function(knex) {
  return knex.schema.createTable('users',tbl=>{
    tbl.increments()
    tbl.text('username').notNullable().unique().index()
    tbl.text('password').notNullable()
    tbl.text('profile_picture')
    tbl.text('currency').notNullable()
    tbl.text('mode')
    tbl.timestamps(true,true)
  })
  .createTable('watchlist',tbl=>{
    tbl.increments()
    tbl.text('crypto').index()
    tbl.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
    tbl.timestamps(true,true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users').dropTableIfExists('watchlist')
};
