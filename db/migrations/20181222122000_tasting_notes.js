exports.up = function(knex, Promise) {
  return knex.schema.createTable("tasting_notes", table => {
    table.increments().primary();
    table.string("tasting_note");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("tasting_notes");
};
