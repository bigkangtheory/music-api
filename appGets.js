//app.gets in server.js
app.get('/api/songs', (req, res) => {
	Song.findAll()
	.then((data) => {
		//console.log(data);
		res.send(data)
	})
})

app.get('/api/songs/id/:id', (req, res) => {
	Song.findById(req.params.id)
	.then((data) => {
		res.send(data)
	})
})

app.get('/api/songs/name/:name', (req, res) => {
	Song.findOne({
	  where: {
	    title: req.params.name
	  }
	})
	.then((data) => {
		res.send(data)
	})
})

app.get('/api/songs/sort/by-date', (req, res) => {
	Song.findAll({
  order: [
		['updatedAt', 'DESC']
		]
	})
	.then((data) => {
		res.send(data)
	})
})

app.get('/api/songs/sort/a-z', (req, res) => {
	Song.findAll({
		order: [
		['title', 'ASC']
		]
	})
	.then((data) => {
		res.send(data)
	})
})

app.get('/api/songs/count', (req, res) => {
	Song.count({ 
		where: ['id > ?', 0] 
		})
		.then((data) => {
  	res.send(data)
	})
})
