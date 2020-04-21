const mongoose = require ('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to...', url)

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {console.log('connected to MongoDB')})
    .catch(error => {console.log('error connecting to MongoDB', error.message)})

const pSchema = new mongoose.Schema({
    name: String,
    number: String
})

pSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})

module.exports = mongoose.model('Person', pSchema)
