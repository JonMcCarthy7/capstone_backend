exports.up = function(knex, Promise) {
  return knex.schema.createTable("tastings", table => {
    table.increments().primary();
    table
      .integer("users_id")
      .references("users.id")
      .onDelete("CASCADE");
    table
      .integer("coffee_id")
      .references("coffee.id")
      .onDelete("CASCADE");
    table.string("brew_method");
    table.decimal("body");
    table.decimal("acidity");
    table.decimal("sweetness");
    table.decimal("smoothness");
    table.decimal("rating");
    table.boolean("favorite");
    table.date("tasting_date");
    table.text("roasting_profile");
    table.text("description");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("tastings");
};
