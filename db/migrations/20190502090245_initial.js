
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('volcano', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('stillActive');
      table.string('heightInFeet');
      table.string('location');
    }),

    knex.schema.createTable('eruption', function(table) {
      table.increments('id').primary();
      table.string('year');
      table.string('deathToll');
      table.integer('volcanoID').unsigned()
      table.foreign('volcanoID')
        .references('volcano.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('volcano'),
    knex.schema.dropTable('eruption')
  ]);
};
