import pool from "../db/pg.js";

export const checkUser = (req, res, next) => {
  const id = req.params.id;
  pool
    .query(`SELECT * FROM users WHERE id=$1`, [id])
    .then((data) => {
      if (data.rowCount === 0) {
        res.status(404).send("Middleware sagt: Kein User mit dieser id ⬆️ vorhanden!");
      } else {
        next()
      }
    })
    .catch((err) => console.log(err));
};