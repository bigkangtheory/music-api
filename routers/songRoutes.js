const songRouter = require('express').Router();
//dont name subrouter names router
const Song = require('../models/song-model');
const Artist = require('../models/artist-model');

const getSongs = (req, res) => {
		Song.findAll({include: [Artist]})
		.then((data) => {
		//console.log(data);
		res.send(data)
	})
}

const getSongById = (req, res) => {
	Song.findById(req.params.id, {include: [Artist]})
	.then((data) => {
		res.send(data)
	})
}

const getSongByName = (req, res) =>{
		Song.findOne({
			include: [Artist],
	  	where: {
	    	title: req.params.name
	  		}
		})
		.then((data) => {
		res.send(data)
	})
}

const sortByDate = (req, res) => {
	Song.findAll({
		include: [Artist],
		  order: [
				['updatedAt', 'DESC']
			]
		})
		.then((data) => {
		res.send(data)
	})
}

const sortByAz = (req, res)  => {
	Song.findAll({
		include: [Artist],
		order: [
			['title', 'ASC']
		]
	})
	.then((data) => {
		res.send(data)
	})
}

const countSongs = (req, res) => {
	Song.count()
	.then((data) => {
		console.log('DATA IS', data)
  	res.send(data.toString())
	})
}

const getFirstFive = (req, res) => {
	Song.findAll({
		include: [Artist],
			limit: 5,
		  order: [
				['createdAt', 'DESC']
			]
		})
		.then((data) => {
		res.send(data)
	})
}

const postSong = (req, res) => {
		Artist.findOrCreate({
		where: {name: req.body.name}
	})
	.then( (artist) =>{
		return Song.findOrCreate({
			where: {
				title: req.body.title,
				youtube_url: req.body.url,
				artistId: artist[0].dataValues.id}
		});
	})
	.then( (song) => {
		res.send(song);
	})
	.catch( (error) =>{
		console.log(error);
		res.sendStatus(error.status || 500) //you want to send this when getting an error
	})
}


 // We are at /api/songs
songRouter.route('/')
	.get(getSongs)
	.post(postSong)

songRouter.route('/id/:id')
	.get(getSongById)

songRouter.route('/name/:name')
	.get(getSongByName)

songRouter.route('/sort/by-date')
	.get(sortByDate)

songRouter.route('/sort/a-z')
	.get(sortByAz)

songRouter.route('/count')
	.get(countSongs)

songRouter.route('/first-five')
	.get(getFirstFive)

module.exports = songRouter;
//sub router name

//gabes solution
// app.post('/api/songs', (req, res) => {
//     Artist.findOrCreate({
//         where: {name: req.body.name}
//     })
//     .then( (artist) =>{
//         return Song.create({
//             title: req.body.title,
//             youtube_url: req.body.url,
//             artistId: artist[0].dataValues.id
//         });
//     })
//     .then( (song) => {
//         res.send(song);
//     })
//     .catch( (error) =>{
//         res.send(error);
//     })
// });
