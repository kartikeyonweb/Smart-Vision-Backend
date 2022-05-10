const handleProfileGet = (db) => (req, res) => {
    const { id } = req.params;
    // TODO add input validation for id

    db.select('*').from('users').where({id})
        .then(user => { 
            user.length
            ? res.json(user[0])
            : res.status(400).json('Not found')
        })
        .catch(err => res.status(400).json('Error getting user'))
}

module.exports = { handleProfileGet }
