var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = 'db.sqlite';

const DB_SCHEMA = `CREATE TABLE IF NOT EXISTS actors (
  id integer NOT NULL PRIMARY KEY,
  login text  NOT NULL,
  avatar_url text  NOT NULL
);

CREATE TABLE IF NOT EXISTS repos (
  id integer NOT NULL PRIMARY KEY,
  name  VARCHAR(75)  NOT NULL,
  url  VARCHAR(125)  NOT NULL,
  actor_id integer
);

CREATE TABLE IF NOT EXISTS events (
  id integer  NOT NULL PRIMARY KEY,
  type VARCHAR(75)  NOT NULL,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actor_id integer,
  repo_id integer
)`;

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error('Error when creating the database', err.message)
    throw err
  }else{
    console.log('Connected to ' + DBSOURCE + ' database.')
    db.exec(DB_SCHEMA, (err) => {
      if (err) { throw new Error(err) }
    });
  }
})

module.exports = db