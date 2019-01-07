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
    knex
      .raw(
        `SELECT T.id, T.users_id, T.coffee_id, T.brew_method, T.body, T.acidity, T.sweetness, T.smoothness, T.rating, T.favorite, T.tasting_date, T.roasting_profile, T.description, T.created_at, T.updated_at, array_agg(TN.tasting_note) FROM TASTINGS AS T LEFT JOIN (SELECT TTN.id, TTN.tastings_id, TASTING_NOTES.tasting_note FROM TASTING_NOTES, TASTINGS_TASTING_NOTES AS TTN WHERE TASTING_NOTES.id = TTN.tasting_notes_id) AS TN ON T.id = TN.tastings_id WHERE T.users_id = ? AND T.coffee_id = ? GROUP BY T.id ORDER BY T.created_at DESC;`,
        [req.params.users_id, req.params.coffee_id]
      )
      // knex("tastings as t")
      //   .where("users_id", req.params.users_id)
      //   .andWhere("coffee_id", req.params.coffee_id)
      //   .join("tastings_tasting_notes as ttn", {
      //     "ttn.tastings_id": "t.id"
      //   })
      //   .join("tasting_notes as tn", { "tn.id": "ttn.tasting_notes_id" })
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
      .then(tasting => {
        // res.json(tastings);
        knex("tastings_tasting_notes as ttn")
          .join("tasting_notes", { "ttn.tasting_notes_id": "tasting_notes.id" })
          .where("ttn.tastings_id", tasting[0].id)
          .then(notes => {
            // let newNotes = notes.map(el => el.id);
            // console.log(newNotes);

            res.json({ tasting, notes });
          });
      })
      .catch(err => {
        console.log(err);
        res.status(400).send({ message: err });
      });
  },
  update: (req, res) => {
    knex("tastings")
      .where("id", req.params.tastings_id)
      .update({
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
      .returning("*")
      .then(results => {
        res.status(200).send(results);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send({ message: err });
      });
  },
  delete: (req, res) => {
    knex("tastings")
      .where("id", req.params.tastings_id)
      .del()
      .then(results => {
        res.status(200).send("Tasting Successfully Deleted");
      });
  }
};
