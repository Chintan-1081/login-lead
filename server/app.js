const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())

// bcrypt
const bcrypt = require('bcrypt');

// json data accept
const bodyParser = require('body-parser');
const port = 3000


// json data accept
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//session 
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
// const jwt = require('jsonwebtoken');
// const secret = 'my_secret_key';

// After successful authentication
// const user = { id: 1, username: 'chintan' };
// const token = jwt.sign(user, secret, { expiresIn: '1h' });


// app.use((req, res, next) => {
//   if( req.session.user && req.session.user_sid){

//   }
// })

// Database connection
// const pgp = require('pg-promise')(/* options */)
// const db = pgp('postgres://chintan:abc@localhost:5432/chintan')


//****************Using pool */
// create a PostgreSQL pool
const { Pool } = require('pg');
const pool = new Pool({
  user: 'chintan',
  host: 'localhost',
  database: 'chintan',
  password: 'abc',
  port: 5432,

});

let sessions;
app.use(session({
  // store: new pgSession({ // use pgSession to store session data in PostgreSQL
  //   pool: pool,
  //   tableName: 'session',
  // }),

  secret: 'my-secret-keydewdwcsdcsdcdcsdcsdcsdcdsedwedwe',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, expires: 6000 }
}));


// hasing the password
// const bcrypt = require('bcrypt');
// app.use(session({
//   // it store cookies into database
//   store: new pgSession({
//     pool: pool,
//     tableName: 'person',
//   }),
//   secret: 'key for session', // set some id in string form for session 
//   resave: false,  // if it is true then for every request to the server it will create new session & cookies
//   saveUninitialized: false, // until we modify data the session should not change  
//   // cookie: { secure: false },
//   cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
// }))



// Routes /////////////////////////////////////////////////////////////////////////////////////
app.listen(port, () => {
  // Is port is connect or not ?
  //   console.log(`Example app listening on port ${port}`)

})


app.post('/register', async (req, res) => {
  const data = req.body;
  const innerObject = JSON.parse(Object.keys(data)[0]);
  const username = innerObject.username;
  const password = innerObject.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query('SELECT * FROM login WHERE username = $1', [username]);
    const user = result.rows[0];
    // console.log(user.username);
    if (user) {
      res.status(409).json({ message: 'Username already exists' });
    }
    else {
      await pool.query('INSERT INTO login (username, password) VALUES ($1, $2)', [username, hashedPassword]);
      res.status(201).json({ message: 'User created successfully' });
    }
  }
  catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
  // res.send('Data received');

});



app.post('/login', async (req, res) => {
  const data = req.body;
  const username = data.username;
  const password = data.password;
  // console.log(data.username);
  try {
    const result = await pool.query('SELECT * FROM login WHERE username = $1 ', [username])
    const user = result.rows[0];
    // console.log(result.rows[0]);
    const hashedPassword = user.password
    // if (user) {
    //   res.status(409).json({ message: "User " })
    // }

    // Compare the password entered by the user with the hashed password in the database
    const match = await bcrypt.compare(password, hashedPassword);

    if (username === user.username && match) {
      // Set a cookie with the user's information
      // res.cookie('user', { username });
      // res.cookie('jwt', token, { httpOnly: true });
      // console.log(token);
      const user = { success: true, username: username, password: password , session : req.session.id }

      sessions = req.session;
      session.userid = user.username;
      console.log(req.session)
      console.log("........................................")


      // Set session cookie
      // req.session.user = user;
      // res.redirect('/Authenticated')
      res.json(user);


    } else {
      res.status(401).send({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.json({ message: 'Error in login' })

  }

})

app.post('/logout', async (req, res) => {
  console.log("..........................................")
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    } else {
      // res.json("session is destory")
      console.log(req.session)
      res.redirect('http://localhost:5173/dashboard');
    }
  })
})

app.post('/form', async (req, res) => {
  const data = req.body;
  if (req.session) {
    console.log(req.session)
    console.log('.....................................................')
    await pool.query('INSERT INTO formdata (username, email, message) VALUES ($1, $2, $3)', [data.username, data.email, data.message]);
    res.json("Your form is submitted successfully");
  } else {
    res.json("You are not a member")

  }
  // const data = req.body;
  // const username = data.username;
  // const password = data.password;
  // try {
  //   const result = await pool.query('SELECT * FROM login WHERE username = $1 ', [username])
  //   const user = result.rows[0];
  //   const hashedPassword = user.password
  //   const match = await bcrypt.compare(password, hashedPassword);
  //   if (username === user.username && match) {
  //     await pool.query('INSERT INTO formdata (username, email, message) VALUES ($1, $2, $3)', [username, data.email, data.message]);
  //     res.json("Your form is submitted successfully");
  //   } else {
  //     res.json("You are not a member")
  //   }

  // } catch (error) {
  //   res.json('You are not a member')
  // }
})




// app.post('/', async (req, res) => {
//   // its for session 
//   console.log(req.session); /// sdataession 
//   // console.log(req.session.id); // session id


//   res.send({ 1: "Dsddwdwdwswswsxsxxswc" })
// })


app.get('/api', async (req, res) => {
  const data = await pool.query('SELECT * FROM formdata');
  // console.log(hii);
  console.log(Object.keys(data.rows[0]))
  res.send(data)
});

app.post('/formdata', async (req, res) => {
  const data = await pool.query('SELECT * FROM formdata ORDER BY id ASC ');
  // console.log(hii);
  // console.log(Object.keys(data.rows[0]))
  res.send(data)
});

app.get('/api/delete/:username', async (req, res) => {
  // const item = parseInt(req.params.id) // as integer
  const username = req.params.username // as string 
  const data = await pool.query('DELETE FROM formdata WHERE username = $1',[username]);
  sessions = req.session;
  console.log( username ,".....................................")
  res.send(sessions.id)
});

app.post('/api/update', async (req, res) => {
  const data = req.body
  console.log(data)
  await pool.query('UPDATE formdata SET email = $1, message = $2 WHERE id = $3',[data.email,data.message,data.tableId]);
  res.json({ update : true})
});

app.get('/', (req, res) => {
  sessions = req.session;
  // sessionid = req.session.idl
  // console.log(session)
  // if (session.userid) {
  //   console.log(".....................................")
  //   res.send("Welcome User <a href=\'/logout'>click to logout</a>");
  // } else
  //   res.send('index.html', { root: __dirname })
  res.send(sessions.id)
});

