const knex = require("../db/knex.js");
// tastings_id: req.body.tastings_id,
//   tasting_notes_id: req.body.tasting_notes_id
module.exports = {
  create: (req, res) => {
    console.log(req.body);
    knex("tastings_tasting_notes")
      .insert([req.body])
      .returning("*")
      .then(results => {
        res.json({
          results
        });
      })
      .catch(err => {
        res.status(400).send({ message: err });
      });
  },
  index: (req, res) => {
    knex("tasting_notes")
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
      .where("coffee.id", req.params.coffee_id)
      .del()
      .then(results => {
        res.status(200).send("Coffee Successfully Deleted");
      });
  }
};
