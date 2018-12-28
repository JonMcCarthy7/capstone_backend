const knex = require("../db/knex.js");

module.exports = {
  create: (req, res) => {
    knex("coffee")
      .insert({
        users_id: req.body.users_id,
        coffee_name: req.body.coffee_name,
        origin: req.body.origin,
        shop: req.body.shop,
        region: req.body.region,
        altitude: req.body.altitude,
        processing_method: req.body.processing_method,
        varietal: req.body.varietal,
        notes: req.body.notes
      })
      .returning("*")
      .then(results => {
        res.json({
          coffee: results
        });
      })
      .catch(err => {
        res.status(400).send({ message: err });
      });
  },
  index: (req, res) => {
    knex("coffee")
      .where("users_id", req.params.users_id)
      .then(coffee => {
        res.json(coffee);
      })
      .catch(err => {
        res.status(400).send({ message: err });
      });
  },
  login: (req, res) => {
    knex("users")
      .where("email", req.body.email)
      .first()
      .then(user => {
        if (user) {
          hasher.check(user, req.body).then(isMatch => {
            if (isMatch) {
              const token = jwt.sign(user, secret);
              delete user.password;
              res.json({ message: "Successfully Signed In", token, user });
            } else {
              res.status(400).send({ message: "Invalid Email / Password" });
            }
          });
        } else {
          res.status(400).send({ message: "Invalid Email / Password" });
        }
      })
      .catch(err => {
        res.status(400).send({ message: "Invalid Email / Password" });
      });
  },
  verify: (req, res) => {
    res.json(req.decoded);
  },
  show: (req, res) => {
    knex("users")
      .where("users.id", req.params.id)
      .then(user => {
        res.json(user);
      });
  },
  update: (req, res) => {
    knex("users")
      .where("users.id", req.params.id)
      .update({
        email: req.body.email,
        password: req.body.password
      })
      .returning("*")
      .then(result => {
        res.status(200).send(result);
      });
  },
  delete: (req, res) => {
    knex("users")
      .where("users.id", req.params.id)
      .del()
      .then(result => {
        res.status(200).send("User Successfully Deleted");
      });
  }
};
