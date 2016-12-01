const songsWithArtistsRouter = require('express').Router();
const Artist = require('../models/artist-model');
const Song = require('../models/song-model');


const songsWithArtists = (req, res) => {
	Song.findAll({
		include: [Artist]
	})
	.then((data) => {
		res.send(data)
	})
}


//youre at /api/songs-with-artists
songsWithArtistsRouter.route('/')
	.get(songsWithArtists)

module.exports = songsWithArtistsRouter;