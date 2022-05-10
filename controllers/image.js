const Clarifai = require('clarifai');

const { CLARIFAI_API_KEY } = require('../config');

const app = new Clarifai.App({
    apiKey: CLARIFAI_API_KEY
});

const handleApiCall = (req, res) => {
    const { imageUrl } = req.body;
    // TODO add input validation for imageUrl
    
    app.models.predict(Clarifai.FACE_DETECT_MODEL, imageUrl)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('unable to access Clarifai API'));
}

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    // TODO add input validation for id
    
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = { handleImage, handleApiCall }
