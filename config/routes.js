const users = require("../controllers/users_controller");

const verifyToken = require("./verifyToken");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret";

module.exports = function(app) {
  app.post("/users", users.create);
  app.post("/sessions", users.login);

  app.use(verifyToken);
  app.get("/user", users.verify);
  app.get("/test", (req, res) => {
    res.send("hello world");
  });
  //Users

  app.get("/users", users.index);
  app.get("/users/:id", users.show);
  app.put("/users/:id", users.update);
  app.delete("/users/:id", users.delete);
};
