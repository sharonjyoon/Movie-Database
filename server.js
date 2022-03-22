const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'KirbysDreamLand0318!',
    database: 'movie_db'
  },
  console.log(`Connected to the movies_db database.`)
);

app.post('/api/new-movie', ({ body }, res) => {
  const sql = `INSERT INTO movies (movie_name)
    VALUES (?)`;
  const params = [body.movie_name];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

app.get('/api/mpvies', (res, req) => {
  const sql = `SELECT id, movie_name AS title FROM movies`;

  db.query(sql, (err, rows) => {
    if(err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

app.delete('/api/movie/:id', (req, res) => {
  const aql = `DELETE FROM movies WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if(err) {
      res.statusMessage(400).json({ error: res.message });
    }else if (!result.affectedRows){
      res.json({
        message: 'Movie not found'
      });
    }else{
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

app.get('/api/movie-reviews', (req, res) => {
  const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
  db.query(sql, (err, rows) => {
    if(err){
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

app.put('/api/review/:id', (req, res) => {
  const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
  const aparams = [req.body.review, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({error: err.message });
    }else if(!result.affectedRows) {
      res.json({
        message: 'Movie not found'
      });
    }else{
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});







