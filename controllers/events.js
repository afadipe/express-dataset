const eventmapper = require('../common/mapper');
const { DB, ALL_EVENT_SQL, CHECK_IF_ACTOR_EXIST, INSERT_ACTOR_SQL ,INSERT_REPO_SQL , 
	INSERT_EVENT_SQL ,GET_EVENTS_BY_ACTOR ,DROP_ALL_RECORDS } = require('../database/queryhelper');
const { successMessage,errorMessage } = require('../common/status');

var getAllEvents = (req, res) => {
    try {
		DB.all(ALL_EVENT_SQL,function (err,data) {
			if (err){
				errorMessage.message=err
				return res.status(400).send(errorMessage);
			}
			successMessage.message ='Event retrieved successfully';
			successMessage.data = data.map(eventmapper)
			res.status(200).send(successMessage);
		});
		
	} catch (e) {
		res.status(500).send(e);
	}

};

var addEvent = (req, res) => {

	try {
        const { id, type, created_at, actor, repo } = req.body;
		const CHECK_IF_ACTOR_EXIST_SQL = CHECK_IF_ACTOR_EXIST(req.body.id);
		DB.get(CHECK_IF_ACTOR_EXIST_SQL, function (err, { count }) {
			if (err) throw new Error(err);
			if (count > 0){
				errorMessage.message='Event already exists'
				return res.status(400).send(errorMessage);
			} 
			DB.run(INSERT_ACTOR_SQL, [actor.id, actor.login, actor.avatar_url])
				.run(INSERT_REPO_SQL, [repo.id, repo.name, repo.url, actor.id])
				.run(INSERT_EVENT_SQL, [id, type, created_at, actor.id, repo.id], function(error) {
					if (error){
						errorMessage.message=error.message
						return res.status(500).send(errorMessage);
					}
					successMessage.message='Event added successfully'
					successMessage.data = null;
					return res.status(201).send(successMessage);
				});
		});

	} catch (e) {
		res.status(500).send(e);
	}

};


var getByActor = (req, res) => {

	try {
		DB.all(GET_EVENTS_BY_ACTOR, [req.params.actorID], function (err, data) {
			if (err) throw new Error(err);
			if (!data){
				errorMessage.message= 'The specified actor has no events!'
				return res.status(404).send(errorMessage);
			}
			successMessage.message='Event retrieved successfully';
			successMessage.data=data.map(eventmapper) 
			return res.status(200).send(successMessage);
		});
		
	} catch (e) {
		res.status(500).send(e);
	}

	
};


var eraseEvents = (req, res) => {

	try {
		DB.run(DROP_ALL_RECORDS, function (err) {
			if (err){
				errorMessage.message= err
				return res.status(404).send(errorMessage);
			}
			successMessage.message='All record deleted successfully';
			successMessage.data = null;
			res.status(200).send(successMessage);
		});
		
	}  catch (e) {
		res.status(500).send(e);
	}
	

};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















