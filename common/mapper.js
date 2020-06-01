const eventmapper = (eventdata) => {
	eventdata.actor = {};
	eventdata.repo = {};
	eventdata.actor.id = eventdata.actor_id;
	eventdata.actor.login = eventdata.login;
	eventdata.actor.avatar_url = eventdata.avatar_url;
	eventdata.repo.id = eventdata.repo_id;
	eventdata.repo.name = eventdata.name;
	eventdata.repo.url = eventdata.url;
	delete eventdata.actor_id;
	delete eventdata.login;
	delete eventdata.avatar_url;
	delete eventdata.repo_id;
	delete eventdata.name;
	delete eventdata.url;
	delete eventdata.repo_id;
	return eventdata;
}

module.exports = eventmapper