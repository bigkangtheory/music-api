const artistRouter = require('express').Router();
const Artist = require('../models/artist-model');
const Song = require('../models/song-model');

const getArtists = (req, res) => {
		Artist.findAll()
		.then((data) => {
		//console.log(data);
		res.send(data)
	})
}

const sortByAz = (req, res)  => {
	Artist.findAll({
		order: [
			['name', 'ASC']
		]
	})
	.then((data) => {
		res.send(data)
	})
}

const getArtistById = (req, res) => {
	Artist.findById(req.params.id)
	.then((data) => {
		res.send(data)
	})
}

const getArtistByName = (req, res) =>{
		Artist.findOne({
	  	where: {
	    	name: req.params.name
	  		}
		})
		.then((data) => {
		res.send(data)
	})
}


const noJungle = (req, res) => {
	Artist.findAll({
		where: {

		  name: {  						
		    $not: 'Jungle'  	
		  },
		  //name or id filter
		  id: {
		  	$not: 3
		  }
		}
	})
	.then((data) => {
		res.send(data)
	})
}

const frankOrChromeo = (req, res) => {
	Song.findAll({ 
	  where: {
	      $or: [
	      	{artistId: [1, 4]}
	      ] 
		}
	})
	.then((data) => {
		res.send(data)
	})
}



// const makePost = (req, res) => {
// 	Post.create(req.body , (err, data) =>
// 		err ? res.send(err) : res.send(data))
// }


const createArtist = (req, res) => {
	Artist.create(req.body)
	.then((data) => {
		res.send(data)
	})
}

const deleteArtist = (req, res) => {
	Artist.destroy({
		where: {
			id: req.params.id
		}
	})
	.then((data) => {
		res.send("deleted artist with id: " + req.params.id)
	})
}

const updateArtist = (req, res) => {
	Artist.findOne({
		where: {
			id: req.params.id
		}
	})
		.then((data) => {
			return data.update({
			name: req.body.name
			})
		})
			.then((data) => {
				res.send(data)
			})
}

// We are at /api/artists
artistRouter.route('/')
	.get(getArtists)
	.post(createArtist)

artistRouter.route('/sort/a-z')
	.get(sortByAz)

artistRouter.route('/id/:id')
	.get(getArtistById)

artistRouter.route('/name/:name')
	.get(getArtistByName)

artistRouter.route('/no-jungle')
	.get(noJungle)

artistRouter.route('/frank-or-chromeo')
	.get(frankOrChromeo)

artistRouter.route('/:id')
	.delete(deleteArtist)
	.put(updateArtist)

module.exports = artistRouter;
