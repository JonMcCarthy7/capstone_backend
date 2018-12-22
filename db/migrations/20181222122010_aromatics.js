exports.up = function(knex, Promise) {
  return knex.schema.createTable("aromatics", table => {
    table.increments().primary();
    table.string("aroma");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("aromatics");
};
