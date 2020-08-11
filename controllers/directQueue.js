const DirectQueue = require('../models/directQueue')

module.exports = app => {

    app.post('/producer', (req, res) => {
       const msg = req.body

       DirectQueue.producer(msg, res)
    })

    app.post('/consumer', (req, res) => {
        const msg = req.body
 
        DirectQueue.consumerToSlack(msg, res)
     })
}