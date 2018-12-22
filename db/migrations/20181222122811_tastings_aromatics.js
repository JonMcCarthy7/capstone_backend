exports.up = function(knex, Promise) {
  return knex.schema.createTable("tastings_aromatics", table => {
    table.increments().primary();
    table.integer("tastings_id").references("tastings.id");
    table.integer("aromatics_id").references("aromatics.id");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("tastings_aromatics");
};
