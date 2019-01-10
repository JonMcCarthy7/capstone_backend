const users = require("../controllers/users_controller");
const users_coffee = require("../controllers/users_coffee_controller");
const coffee = require("../controllers/coffee_controller");
const tastingNotes = require("../controllers/tasting_notes_controller");
const tastings = require("../controllers/tastings_controller");
const tastingTastingNotes = require("../controllers/tastings_tasting_notes_controller");

const verifyToken = require("./verifyToken");

module.exports = function(app) {
  app.post("/users", users.create);
  app.post("/sessions", users.login);

  app.use(verifyToken);
  app.get("/user", users.verify);

  // USERS
  app.get("/users", users.index);

  // USERS COFFEE
  app.post("/users/:users_id/coffee", users_coffee.create);
  app.get("/users/:users_id/coffee", users_coffee.index);
  app.get("/users/:users_id/coffee/:coffee_id", users_coffee.show);
  app.put("/users/:users_id/coffee/:coffee_id", users_coffee.update);
  app.delete("/users/:users_id/coffee/:coffee_id", users_coffee.delete);

  // ALL COFFEE
  app.get("/coffee", coffee.index);

  // TASTING NOTES
  app.get("/tasting_notes", tastingNotes.index);
  app.get("/tastings_tasting_notes/:tastings_id", tastingTastingNotes.show);
  app.post("/tastings_tasting_notes/:tastings_id", tastingTastingNotes.create);
  app.delete(
    "/tastings_tasting_notes/:tastings_id",
    tastingTastingNotes.delete
  );
  // TASTINGS
  app.get("/users/:users_id/coffee/:coffee_id/tastings", tastings.index);
  app.post("/users/:users_id/coffee/:coffee_id/tastings", tastings.create);
  app.get(
    "/users/:users_id/coffee/:coffee_id/tastings/:tastings_id",
    tastings.show
  );
  app.put(
    "/users/:users_id/coffee/:coffee_id/tastings/:tastings_id",
    tastings.update
  );
  app.delete(
    "/users/:users_id/coffee/:coffee_id/tastings/:tastings_id",
    tastings.delete
  );
};
