const factory = require('./handlerFactory')
const Client = require('../models/clientModel')
const Ordem = require('../models/ordemModel')

exports.addClient = factory.createOne(Client)
exports.getClients = factory.getAll(Client)
exports.getOrdes = async (req, res) => {
    const doc = await Ordem.find({ orderID: req.params.id }).sort({ createdAt: -1, data: -1 })
        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        })
}
exports.verifyClient = async (req, res) => {
    const doc = await Client.find({ clientID: req.params.id })
    if (doc.length == 0) {
        res.status(200).json({
            status: 'invalid'
        })
    }else{
        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        })
    }
}
