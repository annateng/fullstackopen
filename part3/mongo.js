const mongoose = require('mongoose')

// use mongoose to store data to database
if (process.argv.length < 3) {
  console.log('password argument required: password [name] [number]')
  process.exit(1)
} else {
  const password = process.argv[2]
  // connect to mongo database
  const url = `mongodb+srv://fullstack:${password}@cluster0-iix28.mongodb.net/phonebook?retryWrites=true&w=majority`
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

  // schema for persons in phonebook
  const pSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  const Person = mongoose.model('Person', pSchema)

  // for no name/number provided, print whole database
  if (process.argv.length === 3) {
    Person.find({}).then((result) => {
      console.log('phonebook:')
      result.forEach((person) => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })
    // else, add new person entry
  } else {
    const name = process.argv[3]
    const number = process.argv[4]

    // create new person based on command line args
    const p = new Person({
      name: name,
      number: number,
    })

    p.save().then((response) => {
      console.log(`added ${name} ${number} to phonebook`)
      console.log(response)
      mongoose.connection.close()
    })
  }
}
