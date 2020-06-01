var DB = require('./db')
const Promise = require('bluebird')

const ALL_EVENT_SQL=`SELECT events.*, actors.id AS actor_id, actors.login, actors.avatar_url, repos.id as repo_id, repos.url, repos.name
FROM events
INNER JOIN actors ON actors.id = events.actor_id
INNER JOIN repos ON repos.id = events.repo_id
ORDER BY id ASC`;

const GET_EVENTS_BY_ACTOR= `SELECT events.*, actors.id AS actor_id, actors.login, actors.avatar_url, repos.id as repo_id, repos.url, repos.name
FROM events
INNER JOIN actors ON actors.id = events.actor_id
INNER JOIN repos ON repos.actor_id = events.actor_id	
WHERE events.actor_id = ?
ORDER BY id ASC`;

const GET_ALL_ACTORS = `SELECT actors.id, actors.login, actors.avatar_url , events.created_at AS created_at , count(events.id) AS event_count FROM actors
INNER JOIN events ON events.actor_id = actors.id
GROUP BY login
ORDER BY event_count DESC, created_at DESC, login DESC;`;


const GET_ACTORS_BY_STREAK = `SELECT actors.id, actors.login, actors.avatar_url, events.created_at AS created_at, COUNT(events.actor_id) AS streak FROM actors
INNER JOIN events  ON  events.actor_id = actors.id 
WHERE login IS NOT NULL
GROUP BY login
ORDER BY streak DESC, created_at DESC, login DESC;`;


module.exports = {

    DB,
    ALL_EVENT_SQL,
    CHECK_IF_ACTOR_EXIST:(id) =>`SELECT count(*) AS count FROM events WHERE id=${id}`,
    INSERT_ACTOR_SQL:'REPLACE INTO actors (id, login, avatar_url) VALUES (?, ?, ?);',
		INSERT_REPO_SQL:'REPLACE INTO repos (id, name, url, actor_id) VALUES (?, ?, ?, ?);',
    INSERT_EVENT_SQL:'INSERT INTO events (id, type,created_at, actor_id, repo_id) VALUES (?, ?,?, ?, ?);',
    GET_EVENTS_BY_ACTOR,
    DROP_ALL_RECORDS:'DELETE FROM events; DELETE FROM actors; DELETE FROM repos',
    GET_ALL_ACTORS,
    UPDATE_ACTOR:'UPDATE actors SET avatar_url = ? WHERE id = ?',
    GET_ACTORS_BY_STREAK
    
}