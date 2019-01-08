exports.up = function(knex, Promise) {
  return knex.schema.createTable("tastings_tasting_notes", table => {
    table.increments().primary();
    table
      .integer("tastings_id")
      .references("tastings.id")
      .onDelete("CASCADE");
    table.integer("tasting_notes_id").references("tasting_notes.id");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("tastings_tasting_notes");
};
