const users = require("../controllers/users_controller");
const coffee = require("../controllers/coffee_controller");
const tastingNotes = require("../controllers/tasting_notes_controller");

const verifyToken = require("./verifyToken");

module.exports = function(app) {
  app.post("/users", users.create);
  app.post("/sessions", users.login);

  app.use(verifyToken);
  app.get("/user", users.verify);

  // COFFEE
  app.post("/coffee", coffee.create);
  app.get("/users/:users_id/coffee", coffee.index);
  app.get("/users/:users_id/coffee/:coffee_id", coffee.show);
  app.put("/users/:users_id/coffee/:coffee_id", coffee.update);
  app.delete("/users/:users_id/coffee/:coffee_id", coffee.delete);

  app.get("/tasting_notes", tastingNotes.index);
  app.post("/users/:users_id/coffee/:coffee_id/tasting_notes", tastingNotes.index);
};
