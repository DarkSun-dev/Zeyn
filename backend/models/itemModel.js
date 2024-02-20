const mongoose = require('mongoose')
const itemSchema = new mongoose.Schema({
    service: {
        type: String, //order-user Telefone
        required: true
    },
    unit_price: {
        type: String, 
        required: true
    }
})

const Item = mongoose.model('Item', itemSchema)
module.exports = Item