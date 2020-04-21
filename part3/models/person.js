const mongoose = require ('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
console.log('connecting to...', url)

// handle deprecated mongoose methods
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {console.log('connected to MongoDB')})
    .catch(error => {console.log('error connecting to MongoDB', error.message)})

const pSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true, minlength: 3},
    number: {
        type: String, 
        required: true, 
        validate: /.*\d.*\d.*\d.*\d.*\d.*\d.*\d.*\d.*/
    }
})
pSchema.plugin(uniqueValidator)

pSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})

module.exports = mongoose.model('Person', pSchema)
