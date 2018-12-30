const knex = require("../db/knex.js");

module.exports = {
  create: (req, res) => {
    knex("tastings")
      .insert({
        users_id: req.params.users_id,
        coffee_id: req.params.coffee_id,
        brew_method: req.body.brew_method,
        body: req.body.body,
        acidity: req.body.acidity,
        sweetness: req.body.sweetness,
        smoothness: req.body.smoothness,
        rating: req.body.rating,
        favorite: req.body.favorite,
        tasting_date: req.body.tasting_date,
        roasting_profile: req.body.roasting_profile,
        description: req.body.description
      })
      .returning("id")
      .then(results => {
        res.json({
          id: results
        });
      })
      .catch(err => {
        res.status(400).send({ message: err });
      });
  },
  index: (req, res) => {
    knex("tastings as t")
      .where("users_id", req.params.users_id)
      .andWhere("coffee_id", req.params.coffee_id)
      // .join("tastings_tasting_notes as ttn", {
      //   "ttn.tastings_id": "t.id"
      // })
      // .join("tasting_notes as tn", { "tn.id": "ttn.tasting_notes_id" })
      .then(results => {
        res.json(results);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send({ message: err });
      });
  },
  show: (req, res) => {
    knex("tastings as t")
      .where("id", req.params.tastings_id)
      .then(tastings => {
        // res.json(tastings);
        knex("tastings_tasting_notes as ttn")
          .join("tasting_notes", { "ttn.tasting_notes_id": "tasting_notes.id" })
          .where("ttn.tastings_id", tastings[0].id)
          .then(notes => {
            res.json({ tastings, notes });
          });
      })
      .catch(err => {
        console.log(err);
        res.status(400).send({ message: err });
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
