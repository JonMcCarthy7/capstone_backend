exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.increments().primary();
    table.string("email").unique();
    table.text("password");
    table.string("username");
    table.string("role");
    table.string("first_name");
    table.string("last_name");
    table.string("address");
    table.string("city");
    table.string("state");
    table.integer("zip");
    table.string("country");
    table.date("birthday");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
