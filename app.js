const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'kitty',
    password: 'meow',
    database: 'nyamkaAPP'
});

app.get('/', (req, res) => {
    res.render('top.ejs')
});

app.get('/index', (req, res) => {
    connection.query(
        'SELECT * FROM items',
        (error, results) => {
            console.log("Result: ", results);
            res.render('index.ejs', { items: results });
        }
    );
});

app.get('/new', (req, res) => {
    res.render('new.ejs');
});

app.post('/create', (req, res) => {
    connection.query(
      'INSERT INTO items (items) VALUES (?)',
      [req.body.itemName],
      (error, results) => {
        res.redirect('/index'); 
      }
    );
  });

  app.post('/delete/:id', (req, res) => {
    connection.query(
      'DELETE FROM items WHERE id = ?',
      [req.params.id],
      (error, results) => {
        res.redirect('/index');
      }
    );
  });

// app.post('/create_price', (req, res) => {
//     connection.query(
//         'INSERT INTO items (price) VALUES (?)',
//         [req.body.itemPrice],
//         (error, results) => {
//             connection.query(
//                 'SELECT * FROM items',
//                 (error, results) => {
//                     res.redirect('/index'); 
//                 }
//             );
//         }
//     );
// });

app.listen(3000);