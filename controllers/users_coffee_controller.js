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
      .orderBy("created_at", "desc")
      .then(results => {
        res.json(results);
      })
      .catch(err => {
        res.status(400).send({ message: err });
      });
  },
  show: (req, res) => {
    knex("coffee")
      .where("coffee.id", req.params.coffee_id)
      .then(results => {
        res.json(results);
      });
  },
  update: (req, res) => {
    knex("coffee")
      .where("coffee.id", req.params.coffee_id)
      .update({
        users_id: req.body.users_id,
        coffee_name: req.body.coffee_name,
        origin: req.body.origin,
        shop: req.body.shop,
        region: req.body.region,
        altitude: req.body.altitude,
        favorite: req.body.favorite,
        processing_method: req.body.processing_method,
        varietal: req.body.varietal,
        notes: req.body.notes
      })
      .returning("*")
      .then(results => {
        res.status(200).send(results);
      });
  },
  delete: (req, res) => {
    knex("coffee")
      .where("id", req.params.coffee_id)
      .del()
      .then(results => {
        res.status(200).send("Coffee Successfully Deleted");
      });
  }
};
