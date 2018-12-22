exports.up = function(knex, Promise) {
  return knex.schema.createTable("taste_ratings", table => {
    table.increments().primary();
    table.integer("tastings_id").references("tastings.id");
    table.decimal("body");
    table.decimal("acidity");
    table.decimal("sweetness");
    table.decimal("smoothness");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("taste_ratings");
};
