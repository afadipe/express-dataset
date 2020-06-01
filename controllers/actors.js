const { DB, GET_ALL_ACTORS, UPDATE_ACTOR ,GET_ACTORS_BY_STREAK } = require('../database/queryhelper');
const { successMessage,errorMessage } = require('../common/status');


var getAllActors = (req, res) => {
	try {
		DB.all(GET_ALL_ACTORS, function (err, data) {
			if (err){
				errorMessage.message=err
				return res.status(400).send(errorMessage);
			}
			successMessage.message ='Actor retrieved successfully';
			successMessage.data = data.map(actor => {
				delete actor.event_count;
				delete actor.created_at
				return actor;
			});
			res.status(200).send(successMessage);
		});
		
	}  catch (e) {
		res.status(500).send(e);
	}
	
};

var updateActor = (req, res) => {
	try {

		DB.run(UPDATE_ACTOR, [req.body.avatar_url, req.body.id], function (err, data) {
			if (err){
				errorMessage.message=err
				return res.status(400).send(errorMessage);
			}
			if (!this.changes) return res.status(404).json({});
			successMessage.message ='Actor details updated successfully';
			successMessage.data = null;
			res.status(200).send(successMessage);
		});
		
	} catch (e) {
		res.status(500).send(e);
	}

};

var getStreak = (req, res) => {

	try {
		DB.all(GET_ACTORS_BY_STREAK, function (err, data) {
			if (err){
				errorMessage.message=err
				return res.status(400).send(errorMessage);
			}
			successMessage.message ='Actor retrieved successfully';
			successMessage.data = data.map(actor => {
				delete actor.streak;
				delete actor.created_at
				return actor;
			});
			res.status(200).send(successMessage);
		});
		
	}  catch (e) {
		res.status(500).send(e);
	}
};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















