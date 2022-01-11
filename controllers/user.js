import pool from "../db/client.js";

export const getAllUsers = (req, res) => {
  pool
    .query("SELECT * FROM users")
    .then((data) => res.json({ users: data.rows }))
    .catch((err) => console.log(err));
};

export const getSingleUser = (req, res) => {
  const id = req.params.id;
  pool
    .query(`SELECT * FROM users WHERE id=$1`, [id])
    .then((data) => {
      res.status(200).json(data.rows[0]);
    })
    .catch((err) => console.log(err));
};

//Erstellen
export const createUser = (req, res) => {
  const { firstname, lastname } = req.body;
  pool
    .query(
      "INSERT INTO users (firstname, lastname) VALUES ($1, $2)",
      [firstname, lastname]
    )
    .then((data) => {
      res.status(201).json(data.rows[0]);
    })
    .catch((err) => console.log(err));
};

// Loeschen
export const deleteUser = (req, res) => {
  const id = req.params.id;
  pool
    .query("DELETE FROM users WHERE id=$1", [id])
    .then(res.status(200).send("erfolgreich geloescht"))
    .catch((err) => res.status(500).json(err));
};



export const updateUser = (req, res) => {
  const id = req.params.id;
  const { firstname, lastname } = req.body;
  pool
    .query(
      "UPDATE users SET firstname=$1, lastname=$2 WHERE id=$3 RETURNING *;",
      [firstname, lastname, id]
    )
    .then((data) => { 
      res.status(200).json(data.rows[0]) 
    })
    .catch((err) => res.status(500).json(err));
};