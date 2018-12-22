exports.up = function(knex, Promise) {
  return knex.schema.createTable("coffee", table => {
    table.increments().primary();
    table.integer("users_id").references("users.id");
    table.string("coffee_name");
    table.string("origin");
    table.string("shop");
    table.string("region");
    table.string("altitude");
    table.string("processing_method");
    table.string("varietal");
    table.text("notes");
    table.boolean("has_shop");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("coffee");
};
