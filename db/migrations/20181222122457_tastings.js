exports.up = function(knex, Promise) {
  return knex.schema.createTable("tastings", table => {
    table.increments().primary();
    table.integer("users_id").references("users.id");
    table.integer("coffee_id").references("coffee.id");
    table.string("brew_method");
    table.decimal("rating");
    table.date("tasting_date");
    table.text("roasting_profile");
    table.text("description");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("tastings");
};
